export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Project Claimed!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Check your inbox for the assignment brief and your magic submission link.
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <p className="text-gray-700 mb-6">
            If you don't see the email within a few minutes, please check your spam folder. 
            The email is sent from <strong>admin@skillcred.in</strong>.
          </p>
          <a href="/assignment" className="font-medium text-[#F26522] hover:text-[#d9551a]">
            &larr; Back to all projects
          </a>
        </div>
      </div>
    </div>
  );
}
