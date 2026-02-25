import { Lead } from '@prisma/client';

/**
 * Admin Notification Service
 * 
 * Currently logs to console. Before production, integrate a real
 * email service (Resend, Nodemailer, SendGrid, etc.)
 */
export async function notifyAdmin(lead: Lead): Promise<void> {
  // TODO [PROD]: Replace with real email sending
  // Example with Resend:
  // await resend.emails.send({
  //     from: 'notifications@krinch-partners.com',
  //     to: 'admin@krinch-partners.com',
  //     subject: `Nouveau Lead: ${lead.name}`,
  //     html: `<p>Nouveau lead de ${lead.name} (${lead.email})</p>`
  // });

  if (process.env.NODE_ENV === 'development') {
    console.info(`[DEV] Notification: Nouveau lead — ${lead.name} (${lead.email}) — ${lead.serviceInterest}`);
  }
}
