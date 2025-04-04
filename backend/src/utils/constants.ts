import { EmailTemplateType } from "./types";


export const emailTemplates: EmailTemplateType[] = [
  {
    name: "Email Verification Template",
    subject: "Verify your email address",
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
        <h2 style="color: #333;">Hey {{name}},</h2>
        <p>Thank you for signing up! Please verify your email by using the OTP below:</p>
        <div style="font-size: 24px; font-weight: bold; background: #f0f0f0; padding: 10px; display: inline-block; border-radius: 4px;">
          {{otp}}
        </div>
        <p>This code will expire in {{otp-expiry}} minutes.</p>
        <p>If you didn’t request this, please ignore this email.</p>
        <br />
        <p style="color: #888;">– The Team</p>
      </div>
    `,
    mergeTags: [
      { tag: "name", placeholder: "{{name}}", description: "Recipient's full name" },
      { tag: "otp", placeholder: "{{otp}}", description: "One-time password" },
      { tag: "otp-expiry", placeholder: "{{otp-expiry}}", description: "time on which otp expire" },
    ]
  },

]
