
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CreditCard, Loader2 } from 'lucide-react';

export function PaymentGateway({ order, onSuccess, loading }: { order: any, onSuccess: () => void, loading: boolean }) {

    return (
        <div className="space-y-6">
            <div className="p-6 border border-dashed border-slate-700 rounded-lg bg-slate-900/50 text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-white">Zoho Payments</h3>
                    <p className="text-sm text-slate-400">Secure checkout</p>
                </div>

                <div className="pt-4 space-y-2">
                    {/* Mock Buttons for Dev */}
                    <Button
                        onClick={onSuccess}
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : "Pay ₹" + order.amount}
                    </Button>
                    <p className="text-xs text-slate-500 mt-2">
                        (Mock Payment: This button verifies the transaction instantly)
                    </p>
                </div>
            </div>

            <div className="text-center text-xs text-slate-600">
                <p>Secured by 256-bit encryption. Your card details are never stored.</p>
            </div>
        </div>
    );
}
