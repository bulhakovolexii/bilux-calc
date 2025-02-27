import EmailTemplate from "@/components/forms/EmailTemplate";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { PdfReport } from "@/components/PdfReport";

export async function generatePdf(email, inputData, img, results) {
  const pdfBuffer = await renderToBuffer(
    <PdfReport
      email={email}
      inputData={inputData}
      img={img}
      results={results}
    />
  );
  return pdfBuffer;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
  const { email, inputData, img, results } = await req.json();

  try {
    const pdfBuffer = await generatePdf(email, inputData, img, results);
    const { data, error } = await resend.emails.send({
      from: "Bilux-CALC <results@bulhakov.dev>",
      to: [email],
      subject: "Ваш розрахунок готовий!",
      react: EmailTemplate({ email }),
      attachments: [
        {
          filename: "report.pdf",
          content: pdfBuffer.toString("base64"),
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
