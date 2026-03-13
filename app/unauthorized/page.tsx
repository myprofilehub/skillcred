import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="max-w-md w-full border-red-500/20 bg-red-500/5">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-2">
                        <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400">Access Restricted</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <p className="text-muted-foreground">
                        The Student Dashboard is reserved for authorized institutional users only.
                        Please sign in with your organization email address (e.g., <code>@codequestzone.com</code>).
                    </p>
                    <div className="flex flex-col gap-2">
                        <Button asChild variant="default" className="w-full">
                            <Link href="/auth/signin">Sign in with different account</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
