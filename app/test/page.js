"use client";

import Building from "../model/Building";
import months from "../model/months";
import styles from "../page.module.css";

export default function Test() {
  const inputData = {
    city: "Kharkiv",
    purpose: "Багатоквартирні будинки",
    class: "Середній",
    floors: [
      {
        area: 648.77,
        quantity: 1,
        height: 3,
        facades: [],
      },
      {
        area: 635.4,
        quantity: 1,
        height: 3,
        facades: [],
      },
      {
        area: 651.19,
        quantity: 3,
        height: 9,
        facades: [],
      },
      {
        area: 655.38,
        quantity: 4,
        height: 11.7,
        facades: [],
      },
    ],
  };
  const building = new Building(inputData);
  console.log(building);
  return (
    <main className={styles.main}>
      {months.map((month) => (
        <p key={month.name}>
          <span>{month.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {building.Q_nd(month).toFixed(2)}
        </p>
      ))}
    </main>
  );
}
