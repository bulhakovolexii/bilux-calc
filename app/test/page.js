import Building from "../model/Building";
import mockData from "../model/mockData";
import months from "../model/reference-data/months";
import styles from "../page.module.css";

export default function Test() {
  const building = new Building(mockData);
  console.log(building);
  return (
    <main className={styles.main}>
      {months.map((month) => (
        <p key={month.name}>
          <span>{month.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {building.Q_tr(month).toFixed(2)}
        </p>
      ))}
    </main>
  );
}
