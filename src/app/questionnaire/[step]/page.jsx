import ClientStepPage from "./ClientStepPage";

export function generateStaticParams() {
  return [
    { step: "step-1" },
    { step: "step-2" },
    { step: "step-3" },
    { step: "step-4" },
    { step: "step-5" },
    { step: "step-6" },
    { step: "step-7" },
  ];
}

export default function Page({ params = {} }) {
  return <ClientStepPage params={params} />;
}
