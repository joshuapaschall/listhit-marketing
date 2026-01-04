import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

type SendVerificationEmailParams = {
  toEmail: string;
  toName: string;
  actionLink: string;
};

function getSesClient() {
  const region = process.env.AWS_SES_REGION;
  const accessKeyId = process.env.AWS_SES_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SES_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error("SES is not configured. Please set AWS_SES_REGION, AWS_SES_ACCESS_KEY_ID, and AWS_SES_SECRET_ACCESS_KEY.");
  }

  return new SESClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function sendVerificationEmail({ toEmail, toName, actionLink }: SendVerificationEmailParams) {
  const fromEmail = process.env.AWS_SES_FROM_EMAIL;
  const fromName = process.env.AWS_SES_FROM_NAME;
  const configurationSet = process.env.AWS_SES_CONFIGURATION_SET;

  if (!fromEmail || !fromName) {
    throw new Error("SES from address is not configured. Please set AWS_SES_FROM_EMAIL and AWS_SES_FROM_NAME.");
  }

  const sourceAddress = `${fromName} <${fromEmail}>`;
  const client = getSesClient();

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 12px;">Verify your ListHit email</h2>
      <p>Hi ${toName || "there"},</p>
      <p>Thanks for creating a ListHit account. Confirm your email to finish setting up your workspace.</p>
      <p style="margin: 18px 0;">
        <a href="${actionLink}" style="background-color: #0ea5e9; color: #ffffff; padding: 10px 16px; text-decoration: none; border-radius: 6px; display: inline-block;">Verify email</a>
      </p>
      <p>If the button doesn’t work, copy and paste this link into your browser:<br /><a href="${actionLink}">${actionLink}</a></p>
      <p style="margin-top: 18px;">If you didn’t request this, you can ignore this email.</p>
      <p>— The ListHit team</p>
    </div>
  `;

  const textBody = `Hi ${toName || "there"},

Thanks for creating a ListHit account. Confirm your email to finish setting up your workspace.

Verify email: ${actionLink}

If you didn’t request this, you can ignore this email.

— The ListHit team`;

  const command = new SendEmailCommand({
    Source: sourceAddress,
    Destination: { ToAddresses: [toEmail] },
    Message: {
      Subject: { Data: "Verify your ListHit email", Charset: "UTF-8" },
      Body: {
        Html: { Data: htmlBody, Charset: "UTF-8" },
        Text: { Data: textBody, Charset: "UTF-8" },
      },
    },
    ...(configurationSet ? { ConfigurationSetName: configurationSet } : {}),
  });

  await client.send(command);
}
