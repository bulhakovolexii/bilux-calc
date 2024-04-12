"use client";

import Link from "next/link";
import { useModel } from "../contexts/ModelContext";

export default function Results() {
  const [modelData] = useModel();
  return (
    <>
      <h1>Результати</h1>
      <Link href="/">На головну</Link>
      <p>{JSON.stringify(modelData)}</p>
    </>
  );
}
