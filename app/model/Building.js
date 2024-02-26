import Floor from "./Floor";
import cities from "./cities";
import internalHeatCapacities from "./internalHeatСapacities";
import purposes from "./pursoses";

export default class Building {
  constructor(inputData) {
    this.city = inputData.city; // Місто
    this.purpose = inputData.purpose; // Функційне призначення
    this.class = inputData.class; // Клас теплоємності
    this.floors = inputData.floors.map((floor) => new Floor(floor));
  }

  //  Кондиціонована площа
  A_f() {
    let allFloorArea = 0;
    this.floors.forEach((floor) => {
      allFloorArea += floor.totalArea();
    });
    return allFloorArea;
  }

  // Температура середовища
  phi_e(month) {
    return cities.find((city) => city.name === this.city).weather.phi_e[
      month.index
    ];
  }

  // Внутрішня температура
  phi_int_set() {
    return purposes[this.purpose].phi_int_set;
  }

  // Енергопотреба
  Q_nd(month) {
    return this.Q_ht(month) - this.eta_gn(month) * this.Q_gn(month);
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

  H_tr_adj() {
    return 2851.80144357191; // ПРИБИТО ГВОЗДЯМИ
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
    return data[month.index];
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
      internalHeatCapacities.find((capacite) => capacite.class === this.class)
        .C * this.A_f()
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
