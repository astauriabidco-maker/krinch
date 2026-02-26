'use server';

import { requireAdmin } from '@/lib/security';

// Use Vercel Blob in production, filesystem in development
const USE_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;

interface MediaFile {
    name: string;
    url: string;
    size: number;
    createdAt: number;
    type: 'pdf' | 'video' | 'image';
}

function getFileType(filename: string): MediaFile['type'] {
    if (filename.toLowerCase().endsWith('.pdf')) return 'pdf';
    if (/\.(mp4|webm)$/i.test(filename)) return 'video';
    return 'image';
}

export async function uploadMediaAction(formData: FormData) {
    try {
        await requireAdmin();
        const file = formData.get('file') as File;

        if (!file) {
            return { success: false, error: 'Aucun fichier sélectionné' };
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return { success: false, error: 'Fichier trop volumineux (max 10 Mo)' };
        }

        if (USE_BLOB) {
            // Production: Vercel Blob
            const { put } = await import('@vercel/blob');
            const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '').toLowerCase();
            const filename = `${Date.now()}-${safeName}`;

            const blob = await put(filename, file, {
                access: 'public',
            });

            return { success: true, url: blob.url };
        } else {
            // Development: local filesystem
            const { writeFile } = await import('fs/promises');
            const { join } = await import('path');
            const { mkdirSync, existsSync } = await import('fs');

            const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
            if (!existsSync(UPLOAD_DIR)) {
                mkdirSync(UPLOAD_DIR, { recursive: true });
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '').toLowerCase();
            const filename = `${Date.now()}-${safeName}`;
            const filepath = join(UPLOAD_DIR, filename);

            await writeFile(filepath, buffer);
            return { success: true, url: `/uploads/${filename}` };
        }
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function deleteMediaAction(filename: string) {
    try {
        await requireAdmin();

        if (USE_BLOB) {
            const { del } = await import('@vercel/blob');
            await del(filename);
        } else {
            const { unlink } = await import('fs/promises');
            const { join } = await import('path');
            const filepath = join(process.cwd(), 'public', 'uploads', filename);
            await unlink(filepath);
        }

        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function getMediaLibraryAction() {
    try {
        await requireAdmin();

        if (USE_BLOB) {
            const { list } = await import('@vercel/blob');
            const { blobs } = await list();

            const mediaFiles: MediaFile[] = blobs.map(blob => ({
                name: blob.pathname,
                url: blob.url,
                size: blob.size,
                createdAt: new Date(blob.uploadedAt).getTime(),
                type: getFileType(blob.pathname),
            }));

            return { success: true, files: mediaFiles.sort((a, b) => b.createdAt - a.createdAt) };
        } else {
            const { readdir, stat } = await import('fs/promises');
            const { join } = await import('path');
            const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

            try {
                const files = await readdir(UPLOAD_DIR);
                const mediaFiles: MediaFile[] = await Promise.all(
                    files.filter(f => !f.startsWith('.')).map(async (f) => {
                        const s = await stat(join(UPLOAD_DIR, f));
                        return {
                            name: f,
                            url: `/uploads/${f}`,
                            size: s.size,
                            createdAt: s.birthtimeMs || s.mtimeMs,
                            type: getFileType(f),
                        };
                    })
                );
                return { success: true, files: mediaFiles.sort((a, b) => b.createdAt - a.createdAt) };
            } catch {
                return { success: true, files: [] };
            }
        }
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}
