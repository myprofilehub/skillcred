'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function PaymentGateway({ order, onSuccess, loading }: { order: any, onSuccess: () => void, loading: boolean }) {
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setIsPaymentLoading(true);
        try {
            const res = await initializeRazorpay();

            if (!res) {
                toast.error('Razorpay SDK failed to load. Are you online?');
                setIsPaymentLoading(false);
                return;
            }

            // Create the order on the backend to get a Razorpay Order ID
            const orderResponse = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: order.amount }), // The server converts this to paise
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok || !orderData.id) {
                console.error("Order creation failed:", orderData);
                toast.error('Could not initialize payment. Please try again.');
                setIsPaymentLoading(false);
                return;
            }

            // Define the options for the Razorpay Checkout modal
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
                amount: orderData.amount, // amount in paise
                currency: orderData.currency,
                name: 'SkillCred',
                description: order.projectName || 'Enrollment Fee',
                order_id: orderData.id, 
                handler: function (response: any) {
                    // Payment was successful (we could verify the signature here, but skipping for now)
                    console.log("Payment Success:", response);
                    onSuccess(); 
                },
                prefill: {
                    name: "SkillCred User",
                    email: "student@skillcred.com",
                    contact: "+919999999999"
                },
                theme: {
                    color: '#3399cc'
                }
            };

            // @ts-ignore
            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response: any) {
                console.error("Payment Failed", response.error);
                toast.error("Payment Failed. Please try again.");
                setIsPaymentLoading(false);
            });
            paymentObject.open();

        } catch (error) {
            console.error("Error triggering payment:", error);
            toast.error("An error occurred during payment processing.");
            setIsPaymentLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-900">Razorpay Checkout</h3>
                    <p className="text-sm text-slate-500">Cards, UPI, Netbanking & Wallets</p>
                </div>

                <div className="pt-4 space-y-2">
                    <Button
                        onClick={handlePayment}
                        disabled={loading || isPaymentLoading}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black h-14 rounded-xl transition-all shadow-lg shadow-orange-500/25"
                    >
                        {loading || isPaymentLoading ? <Loader2 className="animate-spin mr-2" /> : "Pay ₹" + order.amount}
                    </Button>
                </div>
            </div>

            <div className="text-center text-xs text-slate-500">
                <p>Secured by Razorpay. Your payment details are encrypted.</p>
            </div>
        </div>
    );
}
