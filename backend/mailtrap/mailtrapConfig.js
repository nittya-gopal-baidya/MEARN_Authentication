import {MailtrapClient} from "mailtrap";
import dotenv from "dotenv";
dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;
export const mailtrapClient = new MailtrapClient({
  endpoint: ENDPOINT,
  token: TOKEN,
});
export const sender = {
  email: "hello@demomailtrap.com",
  name: "NGB Private Limited",
};
// const client = new MailtrapClient({
//   endpoint: ENDPOINT,
//   token: TOKEN,
// });
// const sender = {
//   email: "hello@demomailtrap.com",
//   name: "NGB-Production",
// };
// const recipients = [
 
//   {
//     email: "nittya.jnu@gmail.com",
//   },
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
