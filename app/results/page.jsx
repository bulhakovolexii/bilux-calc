"use client";

import Link from "next/link";
import { useInputData } from "../context/InputDataContext";
import Building from "../model/Building";
import monthlyDurationIntervals from "../model/reference-data/monthlyDurationIntervals";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessfulResult = ({ inputData }) => {
  const biluxSystem = {
    heatGenerator:
      "Електричні прилади прямого нагріву: конвектори, поверхневе опалення, променеве опалення, нагрівальний підлоговий кабель",
    heatingDevices: { type: "Стельові променеві обігрівачі" },
    controlType: "Двопозиційне регулювання",
  };
  const [building, setBuilding] = useState(new Building(inputData));
  const [buildingWithBilux, setBuildingWithBilux] = useState(
    new Building({
      ...inputData,
      system: biluxSystem,
    })
  );
  const [indoorTemp, setIndoorTemp] = useState(building.indoorTemperature);
  useEffect(() => {
    building.setIndoorTemperature(indoorTemp);
    buildingWithBilux.setIndoorTemperature(indoorTemp);
  }, [indoorTemp]);
  const buildingEnergyDemand = monthlyDurationIntervals.map((month) =>
    building.energyDemand(month)
  );
  const buildingEnergyConsumption = monthlyDurationIntervals.map((month) =>
    building.energyConsumption(month)
  );
  const buildingWithBiluxEnergyConsumption = monthlyDurationIntervals.map(
    (month) => buildingWithBilux.energyConsumption(month)
  );

  function calculatePercentageDifference(array1, array2) {
    if (array1.length !== array2.length) {
      throw new Error("Массивы должны быть одинаковой длины");
    }

    let percentageDifferences = [];

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] === 0) {
        // Устанавливаем значение, если деление на ноль
        percentageDifferences.push(array2[i] === 0 ? 0 : Infinity);
      } else {
        let difference = array2[i] - array1[i];
        let percentageDifference = (difference / array1[i]) * 100;
        percentageDifferences.push(percentageDifference);
      }
    }

    return percentageDifferences;
  }
  const economy = calculatePercentageDifference(
    buildingWithBiluxEnergyConsumption,
    buildingEnergyConsumption
  );
  return (
    <>
      <h1>Результати</h1>
      <Link href="/">На головну</Link>
      <div>
        <label id="temp">Кімнатна температура </label>
        <input
          type="number"
          name="temp"
          id="temp"
          value={indoorTemp}
          onChange={(e) => setIndoorTemp(e.target.value)}
        />
        <span>
          &nbsp;Встановлена потужність теплогенератора:{" "}
          {building.estimatedHeatGeneratorPower(-23).toFixed()}, кВт
        </span>
      </div>
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
          <p>Енергоспоживання, кВт·год (Користувацька система)</p>
          {buildingEnergyConsumption.map((month, index) => (
            <p key={index}>
              <span>{monthlyDurationIntervals[index].month}</span>
              &nbsp;&nbsp;&nbsp;
              {month.toFixed(2)} {}
            </p>
          ))}
        </div>
        <div>
          <p>Енергоспоживання, кВт·год (BILUX)</p>
          {buildingWithBiluxEnergyConsumption.map((month, index) => (
            <p key={index}>
              <span>{monthlyDurationIntervals[index].month}</span>
              &nbsp;&nbsp;&nbsp;
              {month.toFixed(2)} {}
            </p>
          ))}
        </div>
        <div>
          <p>Економія, %</p>
          {economy.map((month, index) => (
            <p key={index}>
              <span>{monthlyDurationIntervals[index].month}</span>
              &nbsp;&nbsp;&nbsp;
              {month.toFixed(0)} {}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default function Results() {
  const router = useRouter();
  const { inputData } = useInputData();
  return !inputData.city ? (
    router.push("/")
  ) : (
    <SuccessfulResult inputData={inputData} />
  );
}
