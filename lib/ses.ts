import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

type SendVerificationEmailParams = {
  toEmail: string;
  toName: string;
  actionLink: string;
};

type SendRequestAccessConfirmationEmailParams = {
  toEmail: string;
  toName: string;
  company?: string;
};

type RequestAccessLeadPayload = {
  full_name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  agree_to_terms: boolean;
  marketing_opt_in: boolean;
  ip: string;
  user_agent: string;
  source: string;
  created_at: string;
};

type SendRequestAccessInternalNotificationParams = {
  leadPayload: RequestAccessLeadPayload;
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

export async function sendRequestAccessConfirmationEmail({
  toEmail,
  toName,
  company,
}: SendRequestAccessConfirmationEmailParams) {
  const fromEmail = process.env.AWS_SES_FROM_EMAIL;
  const fromName = process.env.AWS_SES_FROM_NAME;
  const configurationSet = process.env.AWS_SES_CONFIGURATION_SET;

  if (!fromEmail || !fromName) {
    throw new Error("SES from address is not configured. Please set AWS_SES_FROM_EMAIL and AWS_SES_FROM_NAME.");
  }

  const sourceAddress = `${fromName} <${fromEmail}>`;
  const client = getSesClient();
  const companyLine = company ? `Company: ${company}` : "Company: (not provided)";

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 12px;">We received your ListHit request</h2>
      <p>Hi ${toName || "there"},</p>
      <p>Thanks for reaching out. We’ve received your request for access to ListHit and will follow up shortly.</p>
      <p style="margin: 18px 0; padding: 12px 16px; background-color: #f8fafc; border-radius: 8px;">
        ${companyLine}
      </p>
      <p>If you have additional context to share, reply to this email.</p>
      <p>— The ListHit team</p>
    </div>
  `;

  const textBody = `Hi ${toName || "there"},

Thanks for reaching out. We’ve received your request for access to ListHit and will follow up shortly.

${companyLine}

If you have additional context to share, reply to this email.

— The ListHit team`;

  const command = new SendEmailCommand({
    Source: sourceAddress,
    Destination: { ToAddresses: [toEmail] },
    Message: {
      Subject: { Data: "We received your ListHit request", Charset: "UTF-8" },
      Body: {
        Html: { Data: htmlBody, Charset: "UTF-8" },
        Text: { Data: textBody, Charset: "UTF-8" },
      },
    },
    ...(configurationSet ? { ConfigurationSetName: configurationSet } : {}),
  });

  await client.send(command);
}

export async function sendRequestAccessInternalNotification({
  leadPayload,
}: SendRequestAccessInternalNotificationParams) {
  const fromEmail = process.env.AWS_SES_FROM_EMAIL;
  const fromName = process.env.AWS_SES_FROM_NAME;
  const configurationSet = process.env.AWS_SES_CONFIGURATION_SET;
  const supportEmail = "support@listhit.io";

  if (!fromEmail || !fromName) {
    throw new Error("SES from address is not configured. Please set AWS_SES_FROM_EMAIL and AWS_SES_FROM_NAME.");
  }

  const sourceAddress = `${fromName} <${fromEmail}>`;
  const client = getSesClient();

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 12px;">New request access submission</h2>
      <ul style="padding-left: 18px;">
        <li><strong>Name:</strong> ${leadPayload.full_name}</li>
        <li><strong>Email:</strong> ${leadPayload.email}</li>
        <li><strong>Company:</strong> ${leadPayload.company}</li>
        <li><strong>Role:</strong> ${leadPayload.role}</li>
        <li><strong>Marketing opt-in:</strong> ${leadPayload.marketing_opt_in ? "Yes" : "No"}</li>
        <li><strong>Agreed to terms:</strong> ${leadPayload.agree_to_terms ? "Yes" : "No"}</li>
        <li><strong>IP:</strong> ${leadPayload.ip}</li>
        <li><strong>User agent:</strong> ${leadPayload.user_agent}</li>
        <li><strong>Source:</strong> ${leadPayload.source}</li>
        <li><strong>Submitted at:</strong> ${leadPayload.created_at}</li>
      </ul>
      <p style="margin-top: 12px;"><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${leadPayload.message || "—"}</p>
    </div>
  `;

  const textBody = `New request access submission

Name: ${leadPayload.full_name}
Email: ${leadPayload.email}
Company: ${leadPayload.company}
Role: ${leadPayload.role}
Marketing opt-in: ${leadPayload.marketing_opt_in ? "Yes" : "No"}
Agreed to terms: ${leadPayload.agree_to_terms ? "Yes" : "No"}
IP: ${leadPayload.ip}
User agent: ${leadPayload.user_agent}
Source: ${leadPayload.source}
Submitted at: ${leadPayload.created_at}

Message:
${leadPayload.message || "—"}`;

  const command = new SendEmailCommand({
    Source: sourceAddress,
    Destination: { ToAddresses: [supportEmail] },
    Message: {
      Subject: { Data: "New request access submission", Charset: "UTF-8" },
      Body: {
        Html: { Data: htmlBody, Charset: "UTF-8" },
        Text: { Data: textBody, Charset: "UTF-8" },
      },
    },
    ...(configurationSet ? { ConfigurationSetName: configurationSet } : {}),
  });

  await client.send(command);
}
