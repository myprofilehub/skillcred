import { getAllBlogPostsAdmin, togglePublish, deleteBlogPost } from "@/app/actions/blog-actions";
import Link from "next/link";
import { Plus } from "lucide-react";
import { BlogAdminTable } from "@/components/blog/blog-admin-table";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPostsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, edit, and publish blog articles
          </p>
        </div>
        <Link
          href="/dashboard/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      <BlogAdminTable posts={posts} />
    </div>
  );
}
