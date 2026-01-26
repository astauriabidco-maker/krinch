import { Lead } from '@prisma/client';

/**
 * Service de Notification (Mock)
 * @param lead Le nouveau lead créé
 */
export async function notifyAdmin(lead: Lead) {
    // Dans un vrai projet, utiliser Resend ou Nodemailer ici.
    console.log(`[EMAIL NOTIFICATION] Nouveau Lead Reçu !
  -----------------------------------------------
  Nom: ${lead.name}
  Email: ${lead.email}
  Société: ${lead.company}
  Intérêt: ${lead.serviceInterest}
  -----------------------------------------------
  `);

    // TODO: Implementer l'envoi réel d'email
    // await resend.emails.send({ ... })
}
