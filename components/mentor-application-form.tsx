"use client";

import { useState } from "react";
import Link from "next/link";
import "./mentor-form.css"; // We'll put the CSS in a separate file

export function MentorApplicationForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    // File names state for UI
    const [resumeName, setResumeName] = useState("");
    const [videoName, setVideoName] = useState("");

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'video') => {
        if (e.target.files && e.target.files[0]) {
            if (type === 'resume') setResumeName("✓ " + e.target.files[0].name);
            if (type === 'video') setVideoName("✓ " + e.target.files[0].name);
        }
    };

    const goNext = (step: number) => {
        // Enforce basic HTML5 validation before advancing steps
        const form = document.getElementById("mentorForm") as HTMLFormElement;
        const currentInputs = form.querySelectorAll(`.form-section:nth-child(${step}) [required]`);
        let isValid = true;
        
        currentInputs.forEach((input) => {
            if (!(input as HTMLInputElement).checkValidity()) {
                (input as HTMLInputElement).reportValidity();
                isValid = false;
            }
        });
        
        if (isValid) {
            setCurrentStep(step + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goBack = (step: number) => {
        setCurrentStep(step - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg("");

        const formData = new FormData(e.currentTarget);
        
        try {
            const res = await fetch("/api/mentor-application", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            
            if (res.ok && data.success) {
                setIsSuccess(true);
                setCurrentStep(5); // Success step
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setErrorMsg(data.error || "Failed to submit application");
            }
        } catch (error) {
            setErrorMsg("An unexpected error occurred. Please try again.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const progressPct = Math.round((Math.min(currentStep, 4) / 4) * 100);

    return (
        <div className="mentor-page">
            <aside className="mentor-sidebar">
                <div className="sidebar-brand">
                    <div className="brand-mark">S</div>
                    <div className="brand-name">SkillCred</div>
                </div>

                <h2>Freelance Technical Mentor</h2>
                <p className="sidebar-sub">We are seeking domain experts to create project-based learning content for college students — flexible, async, and fairly compensated.</p>

                <div className="sidebar-divider"></div>

                <div className="sidebar-eyebrow">Application Steps</div>
                <nav className="step-nav">
                    {[1, 2, 3, 4].map(step => (
                        <div key={step} className={`step-item ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'done' : ''}`}>
                            <div className="step-num"><span>{currentStep > step ? '✓' : step}</span></div>
                            <span className="step-text">
                                {step === 1 && "Personal Information"}
                                {step === 2 && "Domain & Expertise"}
                                {step === 3 && "Content & Background"}
                                {step === 4 && "Availability & Documents"}
                            </span>
                        </div>
                    ))}
                </nav>

                <div className="sidebar-footer mt-auto pt-6">
                    Applications are reviewed within 3–5 business days.<br/>
                    Shortlisted candidates will be contacted via email.
                </div>
            </aside>

            <main className="mentor-main">
                <div style={{ marginBottom: '24px' }}>
                    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#475569', textDecoration: 'none', fontSize: '20px', transition: 'all 0.2s', outline: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#475569'; }} title="Back to Home">
                        &larr;
                    </Link>
                </div>
                <div className="progress-wrap">
                    <div className="progress-meta">
                        <span className="progress-label" id="progressLabel">Step {Math.min(currentStep, 4)} of 4</span>
                        <span className="progress-pct" id="progressPct">{progressPct}%</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: progressPct + '%' }}></div></div>
                </div>

                {errorMsg && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
                        {errorMsg}
                    </div>
                )}

                <form id="mentorForm" onSubmit={onSubmit} style={{ display: isSuccess ? 'none' : 'block' }}>

                    {/* ── STEP 1 ── */}
                    <div className={`form-section ${currentStep === 1 ? 'active' : ''}`}>
                        <div className="section-header">
                            <div className="section-eyebrow">Step 01</div>
                            <div className="section-title">Personal Information</div>
                            <div className="section-desc">Provide your contact details so we can reach you throughout the review process.</div>
                        </div>

                        <div className="grid-2">
                            <div className="field">
                                <label className="field-label">First Name <span className="opt" style={{color: 'red'}}>*</span></label>
                                <input type="text" name="fname" placeholder="e.g. Arunesh" autoComplete="given-name" required/>
                            </div>
                            <div className="field">
                                <label className="field-label">Last Name <span className="opt" style={{color: 'red'}}>*</span></label>
                                <input type="text" name="lname" placeholder="e.g. Krishnamurthy" autoComplete="family-name" required/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="field-label">Professional Email Address <span className="opt" style={{color: 'red'}}>*</span></label>
                            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required/>
                        </div>

                        <div className="field">
                            <label className="field-label">Phone / WhatsApp Number <span className="opt" style={{color: 'red'}}>*</span></label>
                            <input type="tel" name="phone" placeholder="+91 98765 43210" autoComplete="tel" required/>
                        </div>

                        <div className="grid-2">
                            <div className="field">
                                <label className="field-label">LinkedIn Profile <span className="opt">(optional)</span></label>
                                <input type="url" name="linkedin" placeholder="linkedin.com/in/yourname"/>
                            </div>
                            <div className="field">
                                <label className="field-label">GitHub Profile <span className="opt">(optional)</span></label>
                                <input type="url" name="github" placeholder="github.com/yourname"/>
                            </div>
                        </div>

                        <div className="nav-row">
                            <span></span>
                            <button type="button" className="btn btn-next" onClick={() => goNext(1)}>Continue &rarr;</button>
                        </div>
                    </div>

                    {/* ── STEP 2 ── */}
                    <div className={`form-section ${currentStep === 2 ? 'active' : ''}`}>
                        <div className="section-header">
                            <div className="section-eyebrow">Step 02</div>
                            <div className="section-title">Domain &amp; Expertise</div>
                            <div className="section-desc">Select the technical domains you are qualified to teach.</div>
                        </div>

                        <div className="field">
                            <label className="field-label">Primary Technical Domain(s) <span className="opt" style={{color: 'red'}}>*</span></label>
                            <div className="check-group">
                                {["AI & Machine Learning", "Data Science & Analytics", "Full Stack Development", "DevOps & Cloud"].map(domain => (
                                    <label key={domain} className="check-card">
                                        <input type="checkbox" name="domain" value={domain} />
                                        <div className="check-box"><div className="check-box-inner"></div></div>
                                        <span className="check-card-text">{domain}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="field">
                            <label className="field-label">Years of Professional Experience <span className="opt" style={{color: 'red'}}>*</span></label>
                            <div className="radio-group">
                                {["Less than 1 year", "1–2 years", "2–4 years", "4–7 years", "7+ years"].map(exp => (
                                    <label key={exp} className="radio-item">
                                        <input type="radio" name="experience" value={exp} required/>
                                        <div className="radio-dot"><div className="radio-dot-inner"></div></div>
                                        <span className="radio-label">{exp === "7+ years" ? "7 or more years" : exp}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="field">
                            <label className="field-label">Core Technologies &amp; Tools <span className="opt" style={{color: 'red'}}>*</span></label>
                            <input type="text" name="tools" placeholder="e.g. Python, React, TensorFlow, AWS" required/>
                            <div className="field-hint">List your primary technical stack, separated by commas.</div>
                        </div>

                        <div className="nav-row">
                            <button type="button" className="btn btn-back" onClick={() => goBack(2)}>&larr; Back</button>
                            <button type="button" className="btn btn-next" onClick={() => goNext(2)}>Continue &rarr;</button>
                        </div>
                    </div>

                    {/* ── STEP 3 ── */}
                    <div className={`form-section ${currentStep === 3 ? 'active' : ''}`}>
                        <div className="section-header">
                            <div className="section-eyebrow">Step 03</div>
                            <div className="section-title">Content &amp; Background</div>
                        </div>

                        <div className="field">
                            <label className="field-label">Prior Teaching or Mentoring Experience <span className="opt" style={{color: 'red'}}>*</span></label>
                            <div className="radio-group">
                                {["None", "Informal", "Online content", "Formal training"].map(te => (
                                    <label key={te} className="radio-item">
                                        <input type="radio" name="teaching" value={te} required/>
                                        <div className="radio-dot"><div className="radio-dot-inner"></div></div>
                                        <span className="radio-label">{te}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="field">
                            <label className="field-label">Project Demonstration Video <span className="opt" style={{color: 'red'}}>*</span></label>
                            <div className={`upload-zone ${videoName ? 'has-file' : ''}`}>
                                <input type="file" name="sample_video" accept="video/*,.mp4,.mov,.avi,.webm" onChange={e => handleFile(e, 'video')} required/>
                                <div className="upload-icon">🎬</div>
                                <div className="upload-title">Upload a Project Walkthrough Video</div>
                                <div className="upload-sub">Submit a short video (5–15 minutes).</div>
                                <div className="upload-filename">{videoName}</div>
                            </div>
                        </div>

                        <div className="nav-row">
                            <button type="button" className="btn btn-back" onClick={() => goBack(3)}>&larr; Back</button>
                            <button type="button" className="btn btn-next" onClick={() => goNext(3)}>Continue &rarr;</button>
                        </div>
                    </div>

                    {/* ── STEP 4 ── */}
                    <div className={`form-section ${currentStep === 4 ? 'active' : ''}`}>
                        <div className="section-header">
                            <div className="section-eyebrow">Step 04</div>
                            <div className="section-title">Availability &amp; Documents</div>
                        </div>

                        <div className="field">
                            <label className="field-label">Estimated Video Contribution per Month <span className="opt" style={{color: 'red'}}>*</span></label>
                            <div className="select-wrap">
                                <select name="videos_per_month" defaultValue="" required>
                                    <option value="" disabled>Select your availability</option>
                                    <option>1 – 2 videos per month</option>
                                    <option>3 – 5 videos per month</option>
                                    <option>6 – 10 videos per month</option>
                                    <option>More than 10 videos per month</option>
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <label className="field-label">Resume / Curriculum Vitae <span className="opt" style={{color: 'red'}}>*</span></label>
                            <div className={`upload-zone ${resumeName ? 'has-file' : ''}`}>
                                <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={e => handleFile(e, 'resume')} required/>
                                <div className="upload-icon">📄</div>
                                <div className="upload-title">Upload Your Resume or CV</div>
                                <div className="upload-filename">{resumeName}</div>
                            </div>
                        </div>

                        <div className="nav-row">
                            <button type="button" className="btn btn-back" onClick={() => goBack(4)}>&larr; Back</button>
                            <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
                                {isSubmitting ? "Uploading files... please wait (this may take a few minutes)" : "Submit Application \u2192"}
                            </button>
                        </div>
                    </div>
                </form>

                {/* ── SUCCESS ── */}
                {isSuccess && (
                    <div className="success-screen" style={{display: 'block'}}>
                        <div className="success-ring">✓</div>
                        <h2>Application Submitted</h2>
                        <p>Thank you for your interest in joining SkillCred as a Freelance Technical Mentor. Our team will carefully review your application and reach out within 3–5 business days.</p>
                        <div className="success-tag">📬 &nbsp;Confirmation sent to your email</div>
                    </div>
                )}
            </main>
        </div>
    );
}
