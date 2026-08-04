import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />
            <section className="py-32 container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold font-heading mb-8">Refund & Cancellation Policy</h1>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p>Last updated: August 2026</p>
                    <p>This is a placeholder page for Refund & Cancellation Policy. Please replace with your actual legal content.</p>
                    <h2>1. General Information</h2>
                    <p>Details regarding refund & cancellation policy go here.</p>
                </div>
            </section>
            <Footer />
        </main>
    );
}
