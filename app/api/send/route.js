import EmailTemplate from "@/app/components/EmailTemplate";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { PdfReport } from "../../components/PdfReport";

export async function generatePdf(inputData, barData) {
  const pdfBuffer = await renderToBuffer(
    <PdfReport inputData={inputData} barData={barData} />
  );
  return pdfBuffer;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
  const { email, inputData, barData } = await req.json();

  try {
    const pdfBuffer = await generatePdf(inputData, barData);
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
