import months from "./reference-data/months";
import cities from "./reference-data/cities";
import purposes from "./reference-data/purposes";
import constructionClasses from "./reference-data/constructionClasses";
import Floor from "./constructions/Floor";
import Ceil from "./constructions/Ceil";
import Wall from "./constructions/Wall";
import System from "./System";

export default class Building {
  constructor(inputData) {
    this.city = inputData.city; // Місто
    this.purpose = inputData.purpose; // Функційне призначення
    this.constructionClass = inputData.constructionClass; // Клас теплоємності
    this.typeAndCondition = inputData.typeAndCondition;
    this.typeOfArea = inputData.typeOfArea;
    this.airtightness = inputData.airtightness;
    this.width = inputData.width; // Ширина будівлі
    this.length = inputData.length; // Довжина будівлі
    this.numberOfFloors = inputData.numberOfFloors; // Кількість поверхів
    this.heightOfFLoor = inputData.heightOfFLoor; // Висота поверху
    this.floor = new Floor({
      ...inputData.floor,
      width: this.width,
      height: this.length,
    });
    this.ceil = new Ceil({
      ...inputData.ceil,
      width: this.width,
      height: this.length,
    });
    this.facades = inputData.facades.map((facade) => {
      if (facade.direction === "Пн" || facade.direction === "Пд") {
        return new Wall({
          ...facade,
          city: this.city,
          width: this.width,
          height: this.totalHeight(),
          buildingHeight: this.totalHeight(),
          phi_int_set: this.phi_int_set(),
          buildingPurpose: this.purpose,
          typeOfArea: this.typeOfArea,
          airtightness: this.airtightness,
        });
      } else {
        return new Wall({
          ...facade,
          city: this.city,
          width: this.length,
          height: this.totalHeight(),
          buildingHeight: this.totalHeight(),
          phi_int_set: this.phi_int_set(),
          buildingPurpose: this.purpose,
          typeOfArea: this.typeOfArea,
          airtightness: this.airtightness,
        });
      }
    });
    this.userSystem = new System({
      ...inputData.system,
      Q_nd: months.map((month) => this.Q_nd(month)),
    });
  }

  // Загальна висота
  totalHeight() {
    return this.heightOfFLoor * this.numberOfFloors;
  }

  //  Кондиціонована площа
  A_f() {
    return this.width * this.length * this.numberOfFloors;
  }

  // Кондиціонований обʼєм будівлі
  V_ve() {
    return this.width * this.length * this.totalHeight();
  }

  // Температура середовища
  phi_e(month) {
    return cities.find((city) => city.name === this.city).weather.phi_e[
      months.indexOf(month)
    ];
  }

  // Внутрішня температура
  phi_int_set() {
    return purposes[this.purpose].phi_int_set;
  }

  // Тривалість опалювального періоду
  hours(month) {
    let period;

    if (
      this.purpose === "Будівлі навчальних закладів" ||
      this.purpose === "Будівлі дитячих навчальних закладів" ||
      this.purpose === "Будівлі закладів охорони здоровʼя"
    ) {
      period = cities.find((city) => city.name === this.city).weather
        .heatedPeriod_10;
    } else {
      period = cities.find((city) => city.name === this.city).weather
        .heatedPeriod_8;
    }

    let hours;

    if (
      months.indexOf(month) < period.end[1] - 1 ||
      months.indexOf(month) > period.start[1] - 1
    ) {
      hours = month.hours;
    } else if (months.indexOf(month) === period.end[1] - 1) {
      hours = period.end[0] * 24;
    } else if (months.indexOf(month) === period.start[1] - 1) {
      hours = month.hours - period.start[0] * 24;
    } else {
      hours = 0;
    }
    return hours;
  }

  // Енергопотреба
  Q_nd(month) {
    const Q_nd = this.Q_ht(month) - this.eta_gn(month) * this.Q_gn(month);
    if (Q_nd < 0) {
      return 0;
    }

    return (Q_nd * (this.hours(month) / month.hours)) / 1000;
  }

  // Тепловтрати
  Q_ht(month) {
    return this.Q_tr(month) + this.Q_ve(month);
  }

  // Тепловтрати трансміссією
  Q_tr(month) {
    return (
      this.H_tr_adj() * (this.phi_int_set() - this.phi_e(month)) * month.hours
    );
  }

  // Узагальнений коефіцієнт теплопередачі трансмісією
  H_tr_adj() {
    return (
      this.ceil.H_X() +
      this.floor.H_X() +
      this.facades.reduce((sum, obj) => sum + obj.H_X(), 0)
    );
  }

  // Тепловтрати вентиляцією
  Q_ve(month) {
    return (
      this.H_ve_adj() * (this.phi_int_set() - this.phi_e(month)) * month.hours
    );
  }

  // Узагальнений коефіцієнт теплопередачі вентиляцією
  H_ve_adj() {
    return 0.336 * this.q_inf_mn();
  }

  // Витрата повітря за рахунок інфільтрації
  q_inf_mn() {
    return this.n_inf() * this.V_ve() * 0.85;
  }

  // Кратність повітрообміну за рахунок інфільтрації
  n_inf() {
    return (
      this.facades.reduce(
        (sum, obj) => sum + obj.q_inf_m(this.typeAndCondition),
        0
      ) /
      (this.V_ve() * 0.85)
    );
  }

  // Теплонадходження
  Q_gn(month) {
    return this.Q_int(month) + this.Q_sol(month);
  }

  // Внутрішні теплонадходження
  Q_int(month) {
    return (
      (this.N() / 168) *
      (this.Phi_int_Oc() + this.Phi_int_L() + this.Phi_int_A()) *
      this.A_f() *
      month.hours
    );
  }

  // Графік використання
  N() {
    return purposes[this.purpose].N;
  }

  // Тепловий потік від людей
  Phi_int_Oc() {
    return purposes[this.purpose].Phi_int_Oc;
  }

  // Тепловий потік від освітлення
  Phi_int_L() {
    return purposes[this.purpose].Phi_int_L;
  }

  // Тепловий потік від обладнання
  Phi_int_A() {
    return purposes[this.purpose].Phi_int_A;
  }

  // Сонячні теплонадходження
  Q_sol(month) {
    return (
      month.hours *
      this.facades.reduce(
        (sum, facade) =>
          sum +
          facade.windows.reduce(
            (sum, window) => sum + window.Phi_sol_k(this.city, month),
            0
          ),
        0
      )
    );
  }

  // Коефіцієнт використання надходжень
  eta_gn(month) {
    if (this.lambda(month) > 0 && this.lambda(month) !== 1) {
      return (
        (1 - this.lambda(month) ** this.alpha()) /
        (1 - this.lambda(month) ** (this.alpha() + 1))
      );
    } else if (this.lambda(month) === 1) {
      return this.alpha() / (this.alpha() + 1);
    } else if (this.lambda(month) < 0 && this.Q_gn(month) > 0) {
      return 1 / this.lambda(month);
    } else if (this.lambda(month) <= 0 && this.Q_gn(month) <= 0) {
      return 1;
    } else {
      return 0;
    }
  }

  // Внутрішня теплоємність
  C_m() {
    return (
      constructionClasses.find(
        (constructionClass) =>
          constructionClass.class === this.constructionClass
      ).C * this.A_f()
    );
  }

  // Безрозмірне співвідношення надходжень і втрат теплоти
  lambda(month) {
    return this.Q_gn(month) / this.Q_ht(month);
  }

  // Часова константа
  tau() {
    return this.C_m() / (this.H_tr_adj() + this.H_ve_adj());
  }

  // Безрозмірний числовий параметр, що залежить від часової константи
  alpha() {
    return 1 + this.tau() / 15;
  }
}
