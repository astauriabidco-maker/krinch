'use client';

import { useState } from 'react';
import { Database, Loader2 } from 'lucide-react';
import { createBackupAction } from './actions';
import { toast } from 'sonner';

export default function BackupButton() {
    const [loading, setLoading] = useState(false);

    const handleBackup = async () => {
        setLoading(true);
        const result = await createBackupAction();
        if (result.success) {
            toast.success("Sauvegarde créée avec succès dans le dossier prisma/backups !");
        } else {
            toast.error(result.error || "Échec de la sauvegarde");
        }
        setLoading(false);
    };

    return (
        <button
            onClick={handleBackup}
            disabled={loading}
            className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition flex items-center gap-2 disabled:opacity-50"
        >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Database size={16} />}
            Sauvegarde Manuelle (Backup)
        </button>
    );
}
