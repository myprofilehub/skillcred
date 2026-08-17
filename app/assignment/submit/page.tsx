import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import SubmitForm from './SubmitForm';

export default async function SubmitPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const token = typeof searchParams.t === 'string' ? searchParams.t : undefined;
  
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center text-red-600 bg-red-50 p-6 rounded-md">
          Invalid or missing token. Please use the link sent to your email.
        </div>
      </div>
    );
  }

  const claim = await prisma.rAGClaim.findUnique({
    where: { submissionToken: token },
    include: { project: true }
  });

  if (!claim) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center text-red-600 bg-red-50 p-6 rounded-md">
          Invalid or missing token. Please use the link sent to your email.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white shadow sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Project {claim.project.projectNo.toString().padStart(2, '0')}: {claim.project.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Claimed by {claim.studentName}
              </p>
            </div>
            <a 
              href={`/api/corpus?t=${token}`} 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#F26522] hover:bg-[#d9551a] focus:outline-none"
            >
              Download Corpus
            </a>
          </div>
          <div className="px-4 py-5 sm:p-6 text-sm text-gray-700 space-y-4">
            <div>
              <strong className="block text-gray-900 mb-1">Your Use Case</strong>
              <p className="bg-gray-50 p-3 rounded">{claim.project.useCase}</p>
            </div>
            <div>
              <strong className="block text-gray-900 mb-1">Your Constraint</strong>
              <p className="bg-gray-50 p-3 rounded font-mono text-xs">{claim.project.constraintText}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Submit Assignment</h3>
            <p className="text-sm text-gray-500 mb-6">
              Please submit the link to your public GitHub repository containing the four required files (rag.ipynb, eval.md, README.md, FAILURES.md).
              You have currently submitted {claim.submissionCount} times.
            </p>
            
            <SubmitForm token={token} />

          </div>
        </div>

      </div>
    </div>
  );
}
