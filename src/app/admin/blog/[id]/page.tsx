import { getPostById } from '@/services/posts';
import BlogPostEditor from '@/components/admin/BlogPostEditor';
import { notFound } from 'next/navigation';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    return <BlogPostEditor initialData={post} />;
}
