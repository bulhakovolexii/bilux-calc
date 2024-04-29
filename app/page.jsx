import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Головна</h1>
      <Link href="/questionnaire/step-1">Опитувальний лист</Link>
    </>
  );
}
