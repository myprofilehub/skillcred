"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Project = {
  projectNo: number;
  title: string;
  corpusSummary: string;
  useCase: string;
  constraintText: string;
  status: 'available' | 'claimed';
};

export default function AssignmentPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Modal Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // Honeypot
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(fetchProjects, 20000); // 20s polling
    return () => clearInterval(interval);
  }, []);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectNo: selectedProject?.projectNo, name, email, hp })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to claim project.");
        setSubmitting(false);
      } else {
        router.push("/assignment/thanks");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="mb-6">
            <Image src="/logo.png" alt="SkillCred Logo" width={200} height={60} priority className="h-auto w-auto max-h-16" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">RAG Build Assignment</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose your project below. Each project has a different corpus and a unique constraint. 
            Once claimed, you will receive an email with your dataset and submission link.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center text-gray-500">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div 
                key={p.projectNo} 
                className={`flex flex-col bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-200 relative z-0 ${
                  p.status === 'available' 
                    ? 'border-gray-200 hover:shadow-md hover:border-[#F26522] cursor-pointer group' 
                    : 'border-gray-200 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => p.status === 'available' && setSelectedProject(p)}
              >
                <div className="p-6 flex-1 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                      {p.projectNo.toString().padStart(2, '0')}
                    </span>
                    {p.status === 'available' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Claimed
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F26522] transition-colors">{p.title}</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p><strong className="text-gray-900">Corpus:</strong> {p.corpusSummary}</p>
                    <p><strong className="text-gray-900">Ask:</strong> {p.useCase}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setSelectedProject(null)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full relative z-50">
              <form onSubmit={handleClaim}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                    Claim Project {selectedProject.projectNo.toString().padStart(2, '0')}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{selectedProject.title}</p>
                  
                  {errorMsg && (
                    <div className="mb-4 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Honeypot field - visually hidden */}
                    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                      <label htmlFor="hp">Do not fill this out</label>
                      <input type="text" id="hp" name="hp" tabIndex={-1} value={hp} onChange={(e) => setHp(e.target.value)} />
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required 
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#F26522] focus:border-[#F26522] sm:text-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jane Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required 
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#F26522] focus:border-[#F26522] sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Used for receiving the corpus"
                      />
                      <p className="mt-1 text-xs text-gray-500">Your magic link and dataset will be sent here.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#F26522] text-base font-medium text-white hover:bg-[#d9551a] focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-70"
                  >
                    {submitting ? 'Claiming...' : 'Claim Project'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedProject(null)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
