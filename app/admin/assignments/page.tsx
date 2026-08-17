import { prisma } from '@/lib/db';
import Image from 'next/image';

export default async function AdminAssignmentsPage({ searchParams }: { searchParams: { token?: string } }) {
  // Simple auth for v1
  if (searchParams.token !== process.env.ADMIN_TOKEN && process.env.NODE_ENV === 'production') {
    return <div className="p-8 text-red-600">Unauthorized</div>;
  }

  const claims = await prisma.rAGClaim.findMany({
    include: {
      project: true,
      submissionHistory: {
        orderBy: { createdAt: 'desc' }
      }
    },
    orderBy: {
      claimedAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-8 border-b border-gray-200 pb-6">
          <Image src="/logo.png" alt="SkillCred Logo" width={180} height={54} priority className="h-10 w-auto" />
          <h1 className="text-3xl font-bold text-gray-900 border-l border-gray-300 pl-4">RAG Assignments Admin Dashboard</h1>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {claims.map((claim) => (
              <li key={claim.id} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-[#F26522]">
                      Project {claim.projectNo.toString().padStart(2, '0')}: {claim.project.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      Claimed by {claim.studentName} ({claim.email}) on {new Date(claim.claimedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {claim.repoUrl ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Submitted ({claim.submissionCount})
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                    {claim.isLate && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        Late
                      </span>
                    )}
                  </div>
                </div>
                
                {claim.repoUrl && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-700">
                      <strong>Latest Repo:</strong> <a href={claim.repoUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{claim.repoUrl}</a>
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <strong>Submitted At:</strong> {claim.submittedAt ? new Date(claim.submittedAt).toLocaleString() : 'Unknown'}
                    </p>
                  </div>
                )}
                
                {claim.submissionHistory.length > 1 && (
                  <div className="mt-2 pl-4 border-l-2 border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Previous Submissions:</p>
                    <ul className="list-disc pl-5 text-xs text-gray-500">
                      {claim.submissionHistory.slice(1).map(h => (
                        <li key={h.id}>
                          <a href={h.repoUrl} target="_blank" rel="noreferrer" className="hover:underline">{h.repoUrl}</a> (on {new Date(h.createdAt).toLocaleString()})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            
            {claims.length === 0 && (
              <li className="p-6 text-center text-gray-500">No claims yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
