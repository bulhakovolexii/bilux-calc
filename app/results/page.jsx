"use client";

import Link from "next/link";
import { useInputData } from "../context/InputDataContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Building from "../model/Building";
import monthlyDurationIntervals from "../model/reference-data/monthlyDurationIntervals";
import SavingsBarChart from "../components/SavingsBarChart";
import { Container } from "@mui/material";

const biluxSystem = {
  heatGenerator:
    "Електричні прилади прямого нагріву: конвектори, поверхневе опалення, променеве опалення, нагрівальний підлоговий кабель",
  heatingDevices: { type: "Стельові променеві обігрівачі" },
  controlType: "Двопозиційне регулювання",
};

const results = (building, biluxBuilding) => {
  return monthlyDurationIntervals.map(
    (month) =>
      new Object({
        month: month.month,
        systemA: Math.round(building.energyConsumption(month)),
        systemB: Math.round(biluxBuilding.energyConsumption(month)),
      })
  );
};

const SuccessfulResult = ({ inputData }) => {
  const building = new Building(inputData);
  const biluxBuilding = new Building({ ...inputData, system: biluxSystem });
  const [indoorTemp, setIndoorTemp] = useState(building.indoorTemperature);
  const [barData, setBarData] = useState(results(building, biluxBuilding));
  useEffect(() => {
    building.setIndoorTemperature(indoorTemp);
    building.setIndoorTemperature(indoorTemp);
    setBarData(results(building, biluxBuilding));
  }, [indoorTemp]);

  return (
    <>
      <Link href="/">На головну</Link>
      <input
        type="number"
        value={indoorTemp}
        onChange={(e) => setIndoorTemp(+e.target.value)}
      />
      <SavingsBarChart data={barData} />
    </>
  );
};

export default function Results() {
  const router = useRouter();
  const { inputData } = useInputData();
  return !inputData.city ? (
    router.push("/")
  ) : (
    <Container maxWidth="lg">
      <SuccessfulResult inputData={inputData} />
    </Container>
  );
}
