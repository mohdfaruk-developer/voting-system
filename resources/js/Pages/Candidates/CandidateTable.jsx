import Pagination from "@/Components/Pagination";
import { Link } from "@inertiajs/react";

export default function CandidateTable({ candidates }) {
  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-3">ID</th>
              <th className="px-3 py-3">Image</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">description</th>
              <th className="px-3 py-3">qualification</th>
              <th className="px-3 py-3">country</th>
              <th className="px-3 py-3">Received Votes</th>
            </tr>
          </thead>
          {candidates.data.length ? (
            <tbody>
              {candidates.data.map((candidate) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={candidate.id}
                >
                  <td className="px-3 py-2">{candidate.id}</td>
                  <td className="px-3 py-2">
                    <img
                      src={candidate.candidate_image}
                      className="w-11 h-11 md:w-28 md:h-28 rounded-full object-cover"
                    />
                  </td>
                  <th className="px-3 py-2 hover:underline text-blue-600 hover:cursor-pointer hover:text-blue-800">
                    <Link
                      href={route("candidates.show", [
                        candidate.election_id,
                        candidate,
                      ])}
                    >
                      {candidate.name}
                    </Link>
                  </th>
                  <td className="px-3 py-2">{candidate.description}</td>
                  <td className="px-3 py-2 text-nowrap">
                    {candidate.qualification}
                  </td>
                  <td className="px-3 py-2 text-nowrap">{candidate.country}</td>
                  <td className="px-3 py-2 text-nowrap">
                    {candidate.election.state === "ended"
                      ? `${candidate.total_vote} votes`
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center pt-5 text-lg">
                  <h1 className="text-gray-800 font-bold">
                    No candidate found!
                  </h1>
                  <p className="text-gray-500">
                    If you don't have any candidate, please apply.
                  </p>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {candidates.meta.per_page < candidates.meta.total ? (
        <Pagination links={candidates.meta.links} />
      ) : (
        ""
      )}
    </>
  );
}
