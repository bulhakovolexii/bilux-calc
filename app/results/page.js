"use client";

import Link from "next/link";
import { useInputData } from "../context/InputDataContext";

export default function Results() {
  const { inputData } = useInputData();
  return (
    <>
      <h1>Результати</h1>
      <Link href="/">На головну</Link>
      <p>{JSON.stringify(inputData)}</p>
    </>
  );
}
