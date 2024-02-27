import Building from "../model/Building";
import months from "../model/months";
import styles from "../page.module.css";

export default function Test() {
  const inputData = {
    city: "Kharkiv",
    purpose: "Багатоквартирні будинки",
    class: "Середній",
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
