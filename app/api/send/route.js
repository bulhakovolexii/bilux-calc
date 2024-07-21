import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
  const { email, inputData, barData } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Bilux-CALC <results@bulhakov.dev>",
      to: [email],
      subject: "Ваш розрахунок готовий!",
      text: JSON.stringify({ inputData, barData }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
