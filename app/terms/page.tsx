import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />
            <section className="py-32 container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold font-heading mb-4">Terms of Service</h1>
                <p className="text-muted-foreground mb-8">Last updated: 4 August 2026</p>
                <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">1. About These Terms</h2>
                        <p>
                            These Terms of Service (“Terms”) govern your access to and use of the SkillCred website at skillcred.in and any programs, cohorts, assessments, credentials or related services offered through it (together, the “Services”). SkillCred is operated by <strong>SkillCred Private Limited</strong>, a private limited company incorporated in India, registered at 24/9, Gandhi Street, Vanuvampet, Chennai 600091, Tamil Nadu, India (“SkillCred”, “we”, “us”, “our”).
                        </p>
                        <p className="mt-2">
                            By enrolling in a cohort, paying a deposit or programme fee, submitting an enquiry form, or otherwise using the Services, you confirm that you have read, understood and agree to be bound by these Terms. If you do not agree, do not use the Services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">2. Eligibility</h2>
                        <p>
                            You must be at least 18 years of age to enrol independently. If you are between 16 and 18, you may enrol only with the written consent of a parent or legal guardian, who accepts these Terms on your behalf and remains responsible for all fees. We do not knowingly enrol any person under 16 years of age.
                        </p>
                        <p className="mt-2">
                            You are responsible for providing accurate enrolment information and for keeping your account credentials confidential. You may not share access to live sessions, learning materials or assessment environments with any other person.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">3. Nature of the Programme</h2>
                        <p>
                            SkillCred provides mentor-supported, project-based technical training and a project-based assessment leading to a SkillCred credential. It is important that you understand what this is and what it is not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>Not an academic degree:</strong> The SkillCred credential is not a degree, diploma or academic qualification, and is not accredited by the UGC, AICTE or any statutory education authority.</li>
                            <li><strong>No placement guarantee:</strong> SkillCred is not a placement agency and does not guarantee employment, an interview, an internship or any particular salary outcome.</li>
                            <li><strong>Career support scope:</strong> Career support, where offered, consists of portfolio review, interview preparation and visibility to employers who choose to use the platform. It does not constitute a commitment that any employer will contact or hire you.</li>
                            <li><strong>Effort dependent:</strong> Programme outcomes depend substantially on your own effort, attendance and project submissions.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">4. Enrolment, Fees and Payment</h2>
                        <p>
                            Programme fees are displayed on the relevant track page at the time of enrolment and are payable in Indian Rupees. Fees are inclusive or exclusive of applicable taxes as stated at checkout. Where a booking deposit is taken to reserve a seat, it is credited in full against the programme fee on enrolment.
                        </p>
                        <p className="mt-2">
                            Payments are processed by third-party payment gateways. We do not store your card or banking details. Your use of a payment gateway is additionally governed by that provider&apos;s own terms.
                        </p>
                        <p className="mt-2">
                            Pilot cohort pricing is offered at our discretion and may be withdrawn or changed for future cohorts. A price change does not affect a place you have already paid for.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">5. Cohort Delivery and Changes</h2>
                        <p>
                            Cohorts are delivered online over the duration stated on the relevant track page. We aim to run every cohort as scheduled, but we may need to change the start date, session timings, mentor allocation or delivery sequence. Where a change is material, we will notify you in advance and, if the revised arrangement does not suit you, offer a deferral or a refund in accordance with our Refund and Cancellation Policy.
                        </p>
                        <p className="mt-2">
                            We may cancel a cohort that does not reach minimum enrolment. In that event you will receive a full refund or the option to defer, at your choice.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">6. Assessment and Credentialling</h2>
                        <p>
                            Projects are reviewed and verified by mentors. You cannot self-certify. Eligibility to sit the project-based assessment depends on completing the required project spine to the standard set out in the programme materials.
                        </p>
                        <p className="mt-2">
                            Assessment outcomes and credential decisions are made by SkillCred mentors and assessors acting in good faith and are final, save that you may request a review within 14 days by writing to support@skillcred.in. Payment of fees does not entitle you to a credential; the credential is awarded on merit.
                        </p>
                        <p className="mt-2">
                            We may withhold or revoke a credential where we find plagiarism, misrepresentation of authorship, use of another person to complete assessed work, or any other conduct that undermines the integrity of the assessment.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">7. Intellectual Property</h2>
                        <p>
                            <strong>Our materials:</strong> All curriculum, project briefs, assessment rubrics, recorded sessions, documentation and platform software remain the intellectual property of SkillCred. You receive a limited, personal, non-transferable licence to use them for your own learning during and after the programme. You may not record, redistribute, resell, publish or use them to deliver training to others.
                        </p>
                        <p className="mt-2">
                            <strong>Your work:</strong> You retain ownership of the code and materials you create in your projects. By submitting work for verification, you grant SkillCred a non-exclusive, royalty-free licence to host it on your candidate profile, display it to recruiters, and reference it in anonymised form for quality assurance and marketing. You may withdraw this licence for public display at any time by writing to support@skillcred.in; your credential record will remain.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">8. Acceptable Use and Code of Conduct</h2>
                        <p>You agree not to:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Share account access, session links or paid materials with non-enrolled persons.</li>
                            <li>Submit work that is not substantially your own, or misrepresent your contribution to pair or group work.</li>
                            <li>Record or redistribute live sessions without written permission.</li>
                            <li>Harass, abuse or discriminate against mentors, staff or fellow students.</li>
                            <li>Attempt to breach, probe or disrupt SkillCred systems, or use assessment environments for any purpose other than the assigned project.</li>
                            <li>Use the Services for any unlawful purpose.</li>
                        </ul>
                        <p className="mt-2">
                            We may suspend or remove you from a cohort for a material breach of this clause. Where removal is for cause, refunds are governed by the Refund and Cancellation Policy and may not be available.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">9. Third-Party Tools and Services</h2>
                        <p>
                            Programmes require the use of third-party tools, cloud platforms, API providers and software, some of which have their own terms, free-tier limits or costs. Where a programme requires hardware or paid services, this is stated on the track page. You are responsible for complying with those providers&apos; terms and for any charges you incur with them.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">10. Privacy</h2>
                        <p>
                            Our handling of your personal data is described in our Privacy Policy at skillcred.in/privacy-policy, which forms part of these Terms. By submitting an enquiry form and ticking the contact consent box, you consent to being contacted by telephone, WhatsApp and email about your enquiry, including where your number is registered on the National Do Not Call register. You may withdraw that consent at any time by writing to support@skillcred.in.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">11. Disclaimers</h2>
                        <p>
                            The Services are provided on an “as is” and “as available” basis. While we take reasonable care in preparing curriculum and assessments, we do not warrant that the Services will be uninterrupted, error-free, or that they will produce any particular career or learning outcome. Nothing in these Terms excludes any liability that cannot lawfully be excluded, including under the Consumer Protection Act 2019.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">12. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, SkillCred&apos;s total aggregate liability arising out of or in connection with the Services is limited to the total fees you have paid to SkillCred in the twelve months preceding the event giving rise to the claim. We are not liable for indirect or consequential loss, loss of employment opportunity, loss of earnings, or loss of data.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">13. Indemnity</h2>
                        <p>
                            You agree to indemnify SkillCred against claims, losses and reasonable costs arising from your breach of these Terms, your infringement of a third party&apos;s rights, or your unlawful use of the Services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">14. Suspension and Termination</h2>
                        <p>
                            You may stop using the Services at any time; fees already paid are dealt with under the Refund and Cancellation Policy. We may suspend or terminate your access for material breach of these Terms, non-payment, or conduct that endangers other students or staff. Clauses relating to intellectual property, disclaimers, liability and governing law survive termination.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">15. Changes to These Terms</h2>
                        <p>
                            We may update these Terms from time to time. The current version is always published at skillcred.in/terms with the last-updated date shown at the top. Where a change materially affects your rights and you are enrolled in a running cohort, we will notify you by email. Continued use of the Services after a change takes effect constitutes acceptance.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">16. Governing Law and Jurisdiction</h2>
                        <p>
                            These Terms are governed by the laws of India. The courts at Chennai, Tamil Nadu shall have exclusive jurisdiction over any dispute arising out of or in connection with these Terms, subject to any statutory right you have as a consumer to bring proceedings elsewhere.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">17. Grievance Redressal and Contact</h2>
                        <p className="mb-4">
                            In accordance with applicable Indian law, our grievance officer may be contacted using the details below. We aim to acknowledge complaints within 48 hours and resolve them within 30 days.
                        </p>
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
