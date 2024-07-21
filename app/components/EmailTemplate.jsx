export default function EmailTemplate({ email }) {
  return (
    <>
      <h1 variant="h1">Вітаємо, {email}!</h1>
      <p>
        Ваш розрахунок готовий. Ви можете знайти його у вкладеннях цього листа.
      </p>
    </>
  );
}
