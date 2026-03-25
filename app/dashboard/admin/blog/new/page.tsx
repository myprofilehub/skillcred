import { BlogAdminForm } from "@/components/blog/blog-admin-form";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Blog Article</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Write and publish a new technical article
        </p>
      </div>

      <BlogAdminForm mode="create" />
    </div>
  );
}
