export interface MailAdapterData {
  subject: string;
  body: string;
  screenshot?: string;
}

export interface MailAdapter {
  sendMail: (data: MailAdapterData) => Promise<void>;
}