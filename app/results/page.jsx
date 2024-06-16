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
  return (
    <>
      <h1>Результати</h1>
      <Link href="/">На головну</Link>
      {buildingEnergyDemand.map((month, index) => (
        <p key={index}>
          <span>{monthlyDurationIntervals[index].month}</span>&nbsp;&nbsp;&nbsp;
          {month.toFixed(2)}
        </p>
      ))}
    </>
  );
}
