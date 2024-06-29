"use client";

import Link from "next/link";
import { useInputData } from "../context/InputDataContext";
import Building from "../model/Building";
import monthlyDurationIntervals from "../model/reference-data/monthlyDurationIntervals";

export default function Results() {
  const { inputData } = useInputData();
  const building = new Building(inputData);
  const buildingEnergyDemand = monthlyDurationIntervals.map((month) =>
    building.energyDemand(month)
  );
  const buildingEnergyConsumption = monthlyDurationIntervals.map((month) =>
    building.energyConsumption(month)
  );
  return (
    <>
      <h1>Результати</h1>
      <Link href="/">На головну</Link>
      <div style={{ display: "flex", gap: 16 }}>
        <div>
          <p>Енергопотреба, кВт·год</p>
          {buildingEnergyDemand.map((month, index) => (
            <p key={index}>
              <span>{monthlyDurationIntervals[index].month}</span>
              &nbsp;&nbsp;&nbsp;
              {month.toFixed(2)} {}
            </p>
          ))}
        </div>
        <div>
          <p>Енергоспоживання, кВт·год</p>
          {buildingEnergyConsumption.map((month, index) => (
            <p key={index}>
              <span>{monthlyDurationIntervals[index].month}</span>
              &nbsp;&nbsp;&nbsp;
              {month.toFixed(2)} {}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
