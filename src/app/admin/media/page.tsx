import MediaLibrary from '@/components/admin/MediaLibrary';

export const dynamic = 'force-dynamic';

export default function AdminMediaPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <MediaLibrary />
        </div>
    );
}
