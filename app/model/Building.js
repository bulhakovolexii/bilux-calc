import months from "./reference-data/months";
import cities from "./reference-data/cities";
import purposes from "./reference-data/purposes";
import constructionClasses from "./reference-data/constructionClasses";
import Floor from "./constructions/Floor";
import Ceil from "./constructions/Ceil";
import Wall from "./constructions/Wall";

export default class Building {
  constructor(inputData) {
    this.city = inputData.city; // Місто
    this.purpose = inputData.purpose; // Функційне призначення
    this.constructionClass = inputData.constructionClass; // Клас теплоємності
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
          width: this.width,
          height: this.totalHeight(),
        });
      } else {
        return new Wall({
          ...facade,
          width: this.length,
          height: this.totalHeight(),
        });
      }
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

  // Енергопотреба
  Q_nd(month) {
    const Q_nd = this.Q_ht(month) - this.eta_gn(month) * this.Q_gn(month);
    if (Q_nd < 0) {
      return 0;
    }
    return Q_nd;
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
    return this.ceil.H_X() + this.floor.H_X(); // ПРИБИТО ГВОЗДЯМИ
  }

  // Тепловтрати вентиляцією
  Q_ve(month) {
    return (
      this.H_ve_adj() * (this.phi_int_set() - this.phi_e(month)) * month.hours
    );
  }

  H_ve_adj() {
    return 2208.19636375854; // ПРИБИТО ГВОЗДЯМИ
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
    const data = [
      5513398.57, 9207368.88, 14154325.33, 15299064.73, 19556223.74,
      19737772.63, 20173383.52, 18522636.55, 14991362.05, 10586494.33,
      5236609.01, 4377815.51,
    ]; // ПРИБИТО ГВОЗДЯМИ
    return data[months.indexOf(month)];
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
