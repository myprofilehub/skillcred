import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { auth } from '@/auth';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { amount, currency = "INR" } = body;

        // Razorpay expects amount in paise (multiply by 100)
        const options = {
            amount: Math.round(amount * 100), 
            currency,
            receipt: `rcpt_${Date.now()}_${(session.user.id || 'guest').substring(0, 5)}`,
        };

        const order = await razorpay.orders.create(options);
        
        return NextResponse.json(order);
    } catch (error) {
        console.error('Razorpay Error:', error);
        return NextResponse.json(
            { error: 'Failed to create Razorpay order' },
            { status: 500 }
        );
    }
}
