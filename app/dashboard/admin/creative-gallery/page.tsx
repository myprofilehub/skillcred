import CreativeGallery from "@/components/dashboard/creative-gallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Gallery | SkillCred Admin",
  description: "View and manage AI-generated creative assets.",
};

export default function CreativeGalleryPage() {
  return (
    <div className="flex-1 min-h-screen bg-slate-950">
      <div className="max-w-[1600px] mx-auto">
        <CreativeGallery />
      </div>
    </div>
  );
}
