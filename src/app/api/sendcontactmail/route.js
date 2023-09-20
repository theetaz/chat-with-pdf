import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export async function POST(request) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let data = await request.json();
  console.log(data);

  const msg = {
    to: "kusal@perfectustec.com", // Change to your recipient
    from: "arivaran@perfectustec.com", // Change to your verified sender
    subject: "Smart AI Doc Contact Form",
    text: `Name: ${data.name} \nEmail: ${data.email} \nMessage: ${data.message}`,
  };
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log("Email sent");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  try {
    await sgMail.send(msg);
    console.log("Email sent");
    return NextResponse.json({
      message: "Email sent success",
      status: "success",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Email sent failed",
      error: error,
      status: "failed",
    });
  }
}
