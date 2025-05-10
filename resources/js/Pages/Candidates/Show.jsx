import DangerButton from "@/Components/DangerButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ auth, candidate, success, error }) {
  const user = auth.user;
  const election = candidate.data.election;
  const candidateData = candidate.data;

  const deleteCandidate = () => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      router.delete(
        route("candidates.destroy", [candidateData.election_id, candidateData])
      );
    }
  };
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Candidate: {candidateData.name}
          </h2>
        </div>
      }
    >
      <Head title={`Candidate ${candidateData.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
              {error}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Candidate Image */}
              <div className="p-6 flex justify-center items-center bg-gray-100 dark:bg-gray-700">
                <img
                  src={candidateData.candidate_image}
                  alt={`Candidate ${candidateData.name}`}
                  className="w-full max-w-sm h-auto object-contain rounded-md shadow-md"
                />
              </div>

              {/* Candidate Info */}
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">Candidate Name</h3>
                    <p>{candidateData.name}</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Bio</h3>
                    <p>{candidateData.description}</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Highest Qualification</h3>
                    <p>{candidateData.qualification}</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Declared Property</h3>
                    <p>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(candidateData.property)}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Address</h3>
                    <p>
                      {candidateData.address}, {candidateData.city},{" "}
                      {candidateData.pin_code}, {candidateData.state},{" "}
                      {candidateData.country}
                    </p>
                  </div>

                  {election.state === "ended" && (
                    <div>
                      <h3 className="font-bold text-lg">
                        Total Votes Received
                      </h3>
                      <p>
                        {candidateData.total_vote}/{election.total_vote} votes
                      </p>
                    </div>
                  )}

                  {user.id === candidateData.user_id && (
                    <div className="mt-4 flex justify-end">
                      <Link
                        href={
                          route(
                            "candidate-request.create",
                            candidateData.election_id
                          ) + `?candidate_id=${candidateData.id}`
                        }
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                      >
                        Update request
                      </Link>
                      <DangerButton
                        className="ml-4"
                        onClick={() => deleteCandidate()}
                      >
                        Delete
                      </DangerButton>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Election Info */}
            <div className="p-6 border-t text-gray-900 dark:text-gray-100">
              <h3 className="font-bold text-lg mb-4">Election Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Election Name</h4>
                  <p>{election.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Election Description</h4>
                  <p>{election.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Election Start</h4>
                  <p>{election.election_start}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Election End</h4>
                  <p>{election.election_end}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
