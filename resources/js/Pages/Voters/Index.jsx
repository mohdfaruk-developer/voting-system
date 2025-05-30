import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { dateformat } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ voters, queryParams = null, success, error }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("voters.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Voters
        </h2>
      }
    >
      <Head title="Voters" />

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
            <div className="text-gray-900 dark:text-gray-100 p-4 sm:p-8">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3">Voter Number</th>
                      <th className="px-3 py-3">Name</th>
                      <th className="px-3 py-3">Status</th>
                      <th className="px-3 py-3">Aadhar Number</th>
                      <th className="px-3 py-3">Address</th>
                      <th className="px-3 py-3">Create Date</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th colSpan="6" className="py-3">
                        <TextInput
                          className="mr-4"
                          defaultValue={queryParams.search}
                          placeholder="Search box"
                          onBlur={(e) =>
                            searchFieldChanged("search", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("search", e)}
                        />
                        <SelectInput
                          defaultValue={queryParams.active}
                          onChange={(e) =>
                            searchFieldChanged("active", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </SelectInput>
                      </th>
                    </tr>
                  </thead>
                  {voters.data.length ? (
                    <tbody>
                      {voters.data.map((voter) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={voter.id}
                        >
                          <th className="px-3 py-3 hover:underline text-blue-600 hover:cursor-pointer hover:text-blue-800">
                            <Link
                              href={route("voters.show", voter)}
                              title="View Details"
                            >
                              {voter.voter_number}
                            </Link>
                          </th>
                          <td className="px-3 py-3">{voter.name}</td>
                          <td className="px-3 py-3">
                            <span
                              className={
                                "font-bold" +
                                (voter.status === "Active"
                                  ? " text-green-600"
                                  : " text-red-600")
                              }
                            >
                              {voter.status}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-nowrap">
                            {voter.aadhar_number}
                          </td>
                          <td className="px-3 py-3">
                            {voter.state} {voter.country}
                          </td>
                          <td className="px-3 py-3 text-nowrap">
                            {dateformat(voter.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-center pt-5 text-lg">
                          <h1 className="text-gray-800 font-bold">
                            No voters found!
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
              {voters.meta.per_page < voters.meta.total ? (
                <Pagination links={voters.meta.links} />
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
