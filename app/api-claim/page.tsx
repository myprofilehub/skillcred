'use client';

import { useState } from 'react';
import Image from 'next/image';
import { sendWorkshopOtp, verifyWorkshopOtpAndFetchKey } from '@/app/actions/workshop-keys';

export default function ApiKeyClaimPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // Claimed data
  const [apiKey, setApiKey] = useState('');
  const [studentName, setStudentName] = useState('');
  const [keyName, setKeyName] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const result = await sendWorkshopOtp(email);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccessMsg("OTP sent successfully!");
      setStep(2);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const result = await verifyWorkshopOtpAndFetchKey(email, otp);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.success && result.apiKey) {
      setApiKey(result.apiKey);
      setStudentName(result.name || 'Student');
      setKeyName(result.keyName || '');
      setStep(3);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setSuccessMsg("API Key copied to clipboard!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-8 text-center flex flex-col items-center">
          <div className="mb-4 bg-white p-4 rounded-xl shadow-md inline-block">
            <Image src="/logo.png" alt="SkillCred Logo" width={120} height={40} className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Workshop API Key</h1>
          <p className="text-indigo-100 text-sm">
            Claim your Gemini API key for the RAG Workshop
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
          {successMsg && step !== 3 && (
            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-sm text-emerald-600 dark:text-emerald-400">
              {successMsg}
            </div>
          )}

          {/* STEP 1: Email ID */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@gmail.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Get OTP'}
              </button>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-4 text-center">
                OTP sent to <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="ml-2 text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  (Change)
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Enter 6-digit OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="••••••"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-center tracking-[0.5em] text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify & Claim Key'}
              </button>
            </form>
          )}

          {/* STEP 3: Success & API Key Display */}
          {step === 3 && (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                  Welcome, {studentName}!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Your dedicated API key is ready to use.
                </p>
              </div>

              <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 relative group">
                <div className="text-xs text-slate-500 font-medium mb-2 text-left uppercase tracking-wider">
                  {keyName || 'API Key'}
                </div>
                <div className="font-mono text-sm break-all text-slate-800 dark:text-slate-200 text-left">
                  {apiKey}
                </div>
                
                <button 
                  onClick={copyToClipboard}
                  className="mt-4 w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Key
                </button>
              </div>

              {successMsg && (
                <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in slide-in-from-bottom-2">
                  {successMsg}
                </div>
              )}
              
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                <span className="font-semibold block mb-1 text-yellow-700 dark:text-yellow-600">Important Security Notice:</span>
                Keep this key private! Do not commit it to GitHub or share it publicly. It is linked to your name for the workshop.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
