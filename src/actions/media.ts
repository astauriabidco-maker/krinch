'use server';

import { writeFile, unlink, readdir, stat } from 'fs/promises';
import { join } from 'path';
import { requireAdmin } from '@/lib/security';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

interface MediaFile {
    name: string;
    url: string;
    size: number;
    createdAt: number;
    type: 'pdf' | 'video' | 'image';
}

export async function uploadMediaAction(formData: FormData) {
    try {
        await requireAdmin();
        const file = formData.get('file') as File;

        if (!file) {
            return { success: false, error: 'Aucun fichier sélectionné' };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Clean filename: remove spaces, lowercase, add timestamp to avoid duplicates
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '').toLowerCase();
        const filename = `${Date.now()}-${safeName}`;
        const filepath = join(UPLOAD_DIR, filename);

        await writeFile(filepath, buffer);

        return { success: true, url: `/uploads/${filename}` };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function deleteMediaAction(filename: string) {
    try {
        await requireAdmin();
        const filepath = join(UPLOAD_DIR, filename);
        await unlink(filepath);
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function getMediaLibraryAction() {
    try {
        await requireAdmin();
        const files = await readdir(UPLOAD_DIR);

        const mediaFiles: MediaFile[] = await Promise.all(
            files.filter(f => !f.startsWith('.')).map(async (f) => {
                const s = await stat(join(UPLOAD_DIR, f));
                const type: MediaFile['type'] = f.toLowerCase().endsWith('.pdf')
                    ? 'pdf'
                    : (f.match(/\.(mp4|webm)$/i) ? 'video' : 'image');
                return {
                    name: f,
                    url: `/uploads/${f}`,
                    size: s.size,
                    createdAt: s.birthtimeMs || s.mtimeMs,
                    type,
                };
            })
        );

        // Sort newest first
        return { success: true, files: mediaFiles.sort((a, b) => b.createdAt - a.createdAt) };
    } catch (e: unknown) {
        if (e instanceof Error && 'code' in e && (e as NodeJS.ErrnoException).code === 'ENOENT') {
            return { success: true, files: [] };
        }
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}
