import { Lead } from '@prisma/client';

/**
 * Admin Notification Service
 * 
 * Uses Resend in production (when RESEND_API_KEY is set).
 * Falls back to console.log in development.
 */

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@krinch-partners.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'notifications@krinch-partners.com';

export async function notifyAdmin(lead: Lead): Promise<void> {
  const hasResend = !!process.env.RESEND_API_KEY;

  if (hasResend) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🎯 Nouveau Lead: ${lead.name} — ${lead.serviceInterest || 'Non précisé'}`,
        html: `
                    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
                        <div style="background: #0F2A44; color: white; padding: 24px 32px; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; font-size: 20px; color: #D4AF37;">Krinch & Partners</h1>
                            <p style="margin: 4px 0 0; opacity: 0.7; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Nouveau Lead</p>
                        </div>
                        <div style="background: #f8f9fa; padding: 32px; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 13px;">Nom</td>
                                    <td style="padding: 8px 0; font-weight: bold;">${lead.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td>
                                    <td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #D4AF37;">${lead.email}</a></td>
                                </tr>
                                ${lead.phone ? `<tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 13px;">Téléphone</td>
                                    <td style="padding: 8px 0;">${lead.phone}</td>
                                </tr>` : ''}
                                ${lead.company ? `<tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 13px;">Entreprise</td>
                                    <td style="padding: 8px 0;">${lead.company} ${lead.companySize ? `(${lead.companySize})` : ''}</td>
                                </tr>` : ''}
                                ${lead.serviceInterest ? `<tr>
                                    <td style="padding: 8px 0; color: #666; font-size: 13px;">Intérêt</td>
                                    <td style="padding: 8px 0;"><span style="background: #D4AF37; color: #0F2A44; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: bold;">${lead.serviceInterest}</span></td>
                                </tr>` : ''}
                            </table>
                            <div style="margin-top: 24px; text-align: center;">
                                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.krinchpartners.com'}/admin/leads" 
                                   style="display: inline-block; background: #0F2A44; color: #D4AF37; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
                                    Voir dans le CRM →
                                </a>
                            </div>
                        </div>
                    </div>
                `,
      });
    } catch (error) {
      console.error('[NOTIFICATION] Failed to send email via Resend:', error);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.info(`[DEV] 📧 Notification: Nouveau lead — ${lead.name} (${lead.email}) — ${lead.serviceInterest}`);
  }
}

/**
 * Notify admin about a new contact form submission
 */
export async function notifyContactMessage(data: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}): Promise<void> {
  const hasResend = !!process.env.RESEND_API_KEY;

  if (hasResend) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `📬 Nouveau message: ${data.subject || 'Contact'} — ${data.name}`,
        html: `
                    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
                        <div style="background: #0F2A44; color: white; padding: 24px 32px; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; font-size: 20px; color: #D4AF37;">Krinch & Partners</h1>
                            <p style="margin: 4px 0 0; opacity: 0.7; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Nouveau Message</p>
                        </div>
                        <div style="background: #f8f9fa; padding: 32px; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px;">
                            <p><strong>${data.name}</strong> (${data.email})</p>
                            ${data.subject ? `<p style="color: #666; font-size: 13px;">Sujet : ${data.subject}</p>` : ''}
                            <blockquote style="border-left: 3px solid #D4AF37; padding-left: 16px; margin: 16px 0; color: #333;">
                                ${data.message.replace(/\n/g, '<br>')}
                            </blockquote>
                            <div style="margin-top: 24px; text-align: center;">
                                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.krinchpartners.com'}/admin/messages"
                                   style="display: inline-block; background: #0F2A44; color: #D4AF37; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px;">
                                    Voir les messages →
                                </a>
                            </div>
                        </div>
                    </div>
                `,
      });
    } catch (error) {
      console.error('[NOTIFICATION] Failed to send contact email:', error);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.info(`[DEV] 📬 Contact: ${data.name} (${data.email}) — ${data.subject || 'Pas de sujet'}`);
  }
}
