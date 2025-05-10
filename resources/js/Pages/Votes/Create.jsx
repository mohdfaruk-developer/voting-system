import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function Create({ election, candidates }) {
  const { data, setData, post, errors } = useForm({
    candidate_id: "",
  });

  const handleVote = (candidate) => {
    data.candidate_id = candidate.id;

    post(route("votes.store", candidate.election_id));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Vote casting
          </h2>
        </div>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {errors.vote && (
            <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
              {errors.vote}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {election.data.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-500 mt-2">
                {election.data.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {candidates.data.map((candidate) => (
                <div
                  key={candidate.id}
                  className="rounded-2xl shadow p-6 border border-gray-200 dark:border-gray-50 flex flex-col items-center text-center"
                >
                  <img
                    src={candidate.candidate_image}
                    alt={candidate.name}
                    className="w-28 h-28 rounded-full object-contain mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {candidate.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2 dark:text-gray-500">
                    {candidate.description}
                  </p>
                  <PrimaryButton
                    className="mt-2"
                    onClick={() => handleVote(candidate)}
                  >
                    Cast Vote
                  </PrimaryButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
