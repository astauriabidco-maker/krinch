import { db } from '@/lib/db';
import MessagesManager from '@/components/admin/MessagesManager';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
    const messages = await db.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
                    <p className="text-slate-500">Messages reçus via le formulaire de contact.</p>
                </div>
                {unreadCount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
                    </span>
                )}
            </div>

            <MessagesManager messages={JSON.parse(JSON.stringify(messages))} />
        </div>
    );
}
