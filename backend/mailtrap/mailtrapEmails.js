import { response } from "express";
import { mailtrapClient, sender } from "./mailtrapConfig.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./mailtrapEmailTemplate.js";
export const sendVerificationEmail = async (email, verficationToken) => {
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Please verify yourself",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verficationToken
      ),
      category: "Email Verification",
    });
    console.log("Email has been sent successfully ");
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error while sending verification email: ${error}`);
  }
};
export const sendWelcomeEmail = async (email, username) => {
  const recipients = [{ email }];
  try {
    const responese=await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "32c3fdf2-289e-410a-81dd-3e9e1c04ded0",
      template_variables: {
        company_info_name: "NGB Private Limited",
        name: username,
      },
    });
    console.log("Welcome email sent successfully ", response);
  } catch (error) {
    console.error("Error ocured while sending welcome email", error);
    throw new Error(`${error}`);
  }
};
export const sendResetPasswordEmail =async (email,resetURL)=>{
const recipient =[{email}]
try {
  const responese=await mailtrapClient.send({
    from:sender,
    to:recipient,
    subject:"Reset your password",
    html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
    category:"reset password"
  })
} catch (error) {
  console.error("Error ocured while sending reset email", error);
    throw new Error(`${error}`);
}
}
export const sendResetSuccessEmail=async (email)=>{
  const recipient=[{email}]
  try {
    const responese=await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject:"Reset password successfuly",
      html:PASSWORD_RESET_SUCCESS_TEMPLATE,
      category:"reset successful password"
    })
  } catch (error) {
    console.error("Error ocured while reset password", error);
    throw new Error(`${error}`);

  }
}