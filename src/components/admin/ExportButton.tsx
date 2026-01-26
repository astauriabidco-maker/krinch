'use client';

import { Download } from 'lucide-react';
import { downloadAsCSV } from '@/lib/export';

interface ExportButtonProps {
    data: any[];
    filename: string;
}

export function ExportButton({ data, filename }: ExportButtonProps) {
    return (
        <button
            onClick={() => downloadAsCSV(data, filename)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
        >
            <Download size={18} />
            <span>Exporter CSV</span>
        </button>
    );
}
