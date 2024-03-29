"use client";

import { useInputData } from "../contexts/InputDataContext";
import Building from "../model/Building";
import cities from "../model/reference-data/cities";
import months from "../model/reference-data/months";
import styles from "../page.module.css";

export default function Test() {
  const [inputData, setInputData] = useInputData();
  const building = new Building(inputData);
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
