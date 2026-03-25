import { notFound } from "next/navigation";
import { getBlogPostById } from "@/app/actions/blog-actions";
import { BlogAdminForm } from "@/components/blog/blog-admin-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Article</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Editing: {post.title}
        </p>
      </div>

      <BlogAdminForm
        mode="edit"
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          subtitle: post.subtitle,
          excerpt: post.excerpt,
          content: post.content,
          tags: post.tags,
          stream: post.stream,
          readTime: post.readTime,
          coverColor: post.coverColor,
          published: post.published,
        }}
      />
    </div>
  );
}
