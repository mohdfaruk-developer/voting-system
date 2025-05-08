import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({
  auth,
  elections,
  queryParams = null,
  success,
  error,
}) {
  queryParams = queryParams || {};
  const user = auth.user;
  const [search, setSearch] = useState(queryParams.search || "");
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("elections.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Elections
          </h2>
          {user.is_admin && (
            <Link
              href={route("elections.create")}
              className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
            >
              Create Election
            </Link>
          )}
        </div>
      }
    >
      <Head title="Elections" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3">Name</th>
                      <th className="px-3 py-3">Description</th>
                      <th className="px-3 py-3">Level</th>
                      <th className="px-3 py-3">Level Name</th>
                      <th className="px-3 py-3">Start Date</th>
                      <th className="px-3 py-3">End Date</th>
                      <th className="px-3 py-3">Last Updated By</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th colSpan="6" className="py-3">
                        <TextInput
                          className="mr-4"
                          defaultValue={search}
                          placeholder="Search box"
                          onKeyPress={(e) => onKeyPress("search", e)}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <PrimaryButton
                          onClick={() => searchFieldChanged("search", search)}
                        >
                          Search
                        </PrimaryButton>
                      </th>
                    </tr>
                  </thead>
                  {elections.data.length ? (
                    <tbody>
                      {elections.data.map((election) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={election.id}
                        >
                          <th className="px-3 py-3 hover:underline text-blue-600 hover:cursor-pointer hover:text-blue-800">
                            <Link
                              href={route("elections.show", election)}
                              title="View Details"
                            >
                              {election.name}
                            </Link>
                          </th>
                          <td className="px-3 py-3">{election.description}</td>
                          <td className="px-3 py-3">{election.level}</td>
                          <td className="px-3 py-3">{election.level_name}</td>
                          <td className="px-3 py-3 text-nowrap">
                            {election.election_start}
                          </td>
                          <td className="px-3 py-3 text-nowrap">
                            {election.election_end}
                          </td>
                          <td className="px-3 py-3 text-nowrap">
                            {election.lastUpdatedBy?.name || "NA"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-center pt-5 text-lg">
                          <h1 className="text-gray-800 font-bold">
                            No elections found!
                          </h1>
                          <p className="text-gray-500">
                            Please check your filters.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
              {elections.meta.per_page < elections.meta.total ? (
                <Pagination links={elections.meta.links} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
