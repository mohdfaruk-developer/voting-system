import DangerButton from "@/Components/DangerButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import CandidateTable from "../Candidates/CandidateTable";

export default function Show({ auth, election, candidates, success, error }) {
  const electionData = election.data;
  const user = auth.user;

  const deleteElection = (election) => {
    if (!confirm("Are you sure you want to delete the election?")) {
      return;
    }
    router.delete(route("elections.destroy", election));
  };

  const getWinnerCandidate = (candidates) => {
    let winner = candidates[0];
    candidates.forEach((candidate) => {
      if (candidate.vote_count > winner.vote_count) {
        winner = candidate;
      }
    });
    return winner;
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Election: {electionData.name}
          </h2>
        </div>
      }
    >
      <Head title={`Election ${electionData.name}`} />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="p-5">
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Election Name
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{electionData.name}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Description
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{electionData.description}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Level
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{electionData.level}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Level Name
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{electionData.level_name}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Election Start
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{electionData.election_start}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Election End
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{electionData.election_end}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Last Updated By
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{electionData.lastUpdatedBy?.name || "NA"}</span>
                    </dd>
                  </div>
                </dl>
                {electionData.state === "ended" && (
                  <>
                    <dl>
                      <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                        <dt className="text-base font-medium leading-6 capitalize">
                          Total Votes Received
                        </dt>
                        <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                          <span>{electionData.total_vote}</span>
                        </dd>
                      </div>
                    </dl>
                    {getWinnerCandidate(candidates.data) && (
                      <dl>
                        <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                          <dt className="text-base font-medium leading-6 capitalize">
                            Winner Candidate
                          </dt>
                          <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                            <a
                              className="hover:underline text-blue-600 hover:cursor-pointer hover:text-blue-800 font-semibold"
                              href={route("candidates.show", [
                                electionData.id,
                                getWinnerCandidate(candidates.data).id,
                              ])}
                            >
                              {getWinnerCandidate(candidates.data).name}
                            </a>
                          </dd>
                        </div>
                      </dl>
                    )}
                  </>
                )}
                <div className="pt-6 text-right">
                  {electionData.state === "ongoing" && (
                    <Link
                      href={route("votes.create", electionData)}
                      className="mr-4 inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                    >
                      Voting
                    </Link>
                  )}
                  {user.is_admin && (
                    <>
                      <Link
                        href={route("elections.edit", electionData)}
                        className="mr-4 inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                      >
                        Update Election
                      </Link>
                      <DangerButton
                        onClick={(e) => deleteElection(electionData)}
                        disabled={electionData.state !== "upcoming"}
                      >
                        Delete Election
                      </DangerButton>
                    </>
                  )}
                  {!user.is_admin && (
                    <Link
                      href={route("candidate-request.create", electionData)}
                      className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                    >
                      Apply nomination
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="my-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                All candidates witch participates in this election.
              </h2>
              <CandidateTable candidates={candidates} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
