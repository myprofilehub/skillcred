import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />
            <section className="py-32 container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold font-heading mb-4">Refund & Cancellation Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: 4 August 2026</p>
                <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">1. Scope</h2>
                        <p>
                            This policy applies to all payments made to SkillCred for cohort places, PAT bundles and booking deposits, whether paid through the website or by any other means. It forms part of our Terms of Service. Words defined in the Terms have the same meaning here.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">2. What You Are Buying</h2>
                        <p>
                            A SkillCred programme is a place in a specific, time-bound cohort with live mentor sessions, project verification and, where purchased, a project-based assessment. It is not an open-ended subscription or lifetime content library. Because a place occupies finite mentor capacity, the refund position tightens once a cohort has begun.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">3. Refund Schedule</h2>
                        <p className="mb-4">
                            Refund entitlement is determined by when we receive your written cancellation request relative to the cohort start date published at the time of enrolment.
                        </p>
                        <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden my-4">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                        <th className="py-3 px-4 font-semibold w-1/2">When we receive your request</th>
                                        <th className="py-3 px-4 font-semibold w-1/2">Refund</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <td className="py-3 px-4">Any time before the cohort start date</td>
                                        <td className="py-3 px-4 font-medium">100% of all amounts paid, including any booking deposit.</td>
                                    </tr>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <td className="py-3 px-4">Within 7 days of the cohort start date, and you have attended no more than two live sessions</td>
                                        <td className="py-3 px-4 font-medium">100% of the programme fee, less any documented third-party costs already incurred on your behalf.</td>
                                    </tr>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <td className="py-3 px-4">After 7 days and before the end of week 2</td>
                                        <td className="py-3 px-4 font-medium">50% of the programme fee.</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">After the end of week 2</td>
                                        <td className="py-3 px-4 font-medium">No refund. A deferral may be available under clause 6.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Booking deposits are fully refundable up to the cohort start date and are credited in full against the programme fee on enrolment.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">4. Cancellation by SkillCred</h2>
                        <p>
                            If we cancel a cohort before it starts, including where minimum enrolment is not reached, you will receive a <strong>full refund of all amounts paid</strong>, or you may choose to transfer to the next available cohort. If we discontinue a cohort after it has started for reasons within our control, you will receive a pro-rata refund for the undelivered portion.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">5. How to Request a Refund</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Email <a href="mailto:support@skillcred.in" className="text-primary hover:underline">support@skillcred.in</a> from the address used at enrolment, with the subject line “Refund request”.</li>
                            <li>Include your full name, registered phone number, the track and cohort you enrolled in, the payment reference, and the date of payment.</li>
                            <li>We will acknowledge your request within <strong>2 working days</strong> and confirm the outcome within <strong>7 working days</strong>.</li>
                            <li>Approved refunds are initiated through our payment gateway, Razorpay, and returned to the original payment method. Razorpay processes normal refunds within <strong>5–7 working days</strong>. Your bank or card issuer may take additional time to credit the amount.</li>
                        </ul>
                        <p className="mt-3">
                            We do not process refunds to a different account or instrument from the one used to pay, except where the original instrument has been closed and you provide documentary evidence.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">6. Deferral Instead of Refund</h2>
                        <p>
                            If your circumstances change, you may request a one-time deferral to the next available cohort in the same track instead of a refund, at any point up to the end of week 3. Deferral is free of charge and your fee is carried across in full. A deferred place must be taken up within 12 months. Where the fee for the later cohort is higher, we will honour the price you originally paid.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">7. Transfers Between Tracks</h2>
                        <p>
                            You may request a transfer to a different track before the end of week 1. Where the new track costs more, the difference is payable; where it costs less, the difference is refunded. Transfers after week 1 are at our discretion and depend on mentor capacity.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">8. Non-Refundable Items</h2>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Hardware kits, once dispatched or purchased by you directly, unless faulty. Hardware kits are not supplied by SkillCred and are purchased in your own name.</li>
                            <li>Third-party services, cloud credits, API usage or developer account fees paid by you to external providers.</li>
                            <li>Certificate or credential re-issue fees, where applicable.</li>
                            <li>Fees where a place has been terminated for a material breach of the Code of Conduct in our Terms of Service.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">9. Credentials After a Refund</h2>
                        <p>
                            If your fee is refunded in whole or in part, any SkillCred credential, verified portfolio entry or recommendation letter issued in connection with that cohort is withdrawn, and your candidate profile is removed from recruiter visibility. You retain ownership of the code and materials you created.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">10. Chargebacks</h2>
                        <p>
                            If you believe a payment is incorrect, please contact us before raising a chargeback with your bank. We will always attempt to resolve a genuine billing issue directly and quickly. Raising a chargeback without first contacting us may delay resolution and, where the chargeback is not upheld, may result in suspension of access pending settlement.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">11. Consumer Rights</h2>
                        <p>
                            Nothing in this policy limits your statutory rights under the Consumer Protection Act 2019 or the Consumer Protection (E-Commerce) Rules 2020. If you are dissatisfied with how a refund request has been handled, you may escalate to our grievance officer using the contact details below, and thereafter to the appropriate consumer forum.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">12. Contact</h2>
                        <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <th className="py-3 px-4 bg-slate-50 dark:bg-slate-900 w-1/3 font-semibold">Entity</th>
                                        <td className="py-3 px-4">SkillCred Private Limited, a private limited company incorporated in India</td>
                                    </tr>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <th className="py-3 px-4 bg-slate-50 dark:bg-slate-900 font-semibold">Grievance Officer</th>
                                        <td className="py-3 px-4">Ganesan M, Chief Technology Officer</td>
                                    </tr>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <th className="py-3 px-4 bg-slate-50 dark:bg-slate-900 font-semibold">Registered Address</th>
                                        <td className="py-3 px-4">24/9, Gandhi Street, Vanuvampet, Chennai 600091, Tamil Nadu, India</td>
                                    </tr>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <th className="py-3 px-4 bg-slate-50 dark:bg-slate-900 font-semibold">Email</th>
                                        <td className="py-3 px-4"><a href="mailto:support@skillcred.in" className="text-primary hover:underline">support@skillcred.in</a></td>
                                    </tr>
                                    <tr className="border-b border-slate-200 dark:border-slate-800">
                                        <th className="py-3 px-4 bg-slate-50 dark:bg-slate-900 font-semibold">Telephone</th>
                                        <td className="py-3 px-4">+91 88703 14954</td>
                                    </tr>
                                    <tr>
                                        <th className="py-3 px-4 bg-slate-50 dark:bg-slate-900 font-semibold">Website</th>
                                        <td className="py-3 px-4">skillcred.in</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
