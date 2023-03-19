import "dotenv/config";
import { createTransport } from "nodemailer";

interface iEmailRequest {
    to: string;
    subject: string;
    text: string;
}

export async function sendEmail({ to, subject, text }: iEmailRequest): Promise<void> {
    const transporter = createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        html: `<!DOCTYPE html>
        <html>
          <head>
            <title>Welcome to My Newsletter</title>
          </head>
          <body>
            <h1>Welcome to My Newsletter</h1>
            <p>Dear Subscriber,</p>
            <p>Thank you for subscribing to my newsletter. Here's what's new:</p>
            <ul>
              <li>Article: "10 Tips for Better Productivity"</li>
              <li>Podcast: Interview with a Successful Entrepreneur</li>
              <li>Upcoming Event: Networking Mixer on March 30th</li>
            </ul>
            <p>Don't forget to follow me on social media for more updates:</p>
            <ul>
              <li>Facebook: <a href="https://www.facebook.com/mynewsletter">My Newsletter</a></li>
              <li>Twitter: <a href="https://twitter.com/mynewsletter">My Newsletter</a></li>
              <li>Instagram: <a href="https://www.instagram.com/mynewsletter">My Newsletter</a></li>
            </ul>
            <p>Thank you for your continued support!</p>
            <p>Sincerely,<br>John Doe</p>
            ${text}
          </body>
        </html>`
    }).then(() => {
        console.log("Email send with success");
    }).catch((err) => {
        console.log(err);
        throw new Error("Error sending email, try again later");
    })


}