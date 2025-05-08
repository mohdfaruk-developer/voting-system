import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  REQUEST_STATUS_CLASS_MAP,
  REQUEST_STATUS_TEXT_MAP,
  REQUEST_TYPE_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router, usePage } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Index({
  auth,
  requests,
  queryParams = null,
  success,
  error,
}) {
  const user = auth.user;
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("requests.index"), queryParams);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("requests.index"), queryParams);
  };

  const approveRequest = (request) => {
    if (!window.confirm("Are you sure you want to approve the request?")) {
      return;
    }
    router.put(route("requests.update", request), {
      status: "approved",
    });
  };

  const rejectRequest = (request) => {
    let comment = window.prompt("Please enter a reason for rejection");
    if (comment === null) {
      return;
    }
    router.put(route("requests.update", request), {
      status: "rejected",
      comment: comment,
    });
  };

  const deleteRequest = (request) => {
    if (!window.confirm("Are you sure you want to delete the request?")) {
      return;
    }
    router.delete(route("requests.destroy", request));
  };

  const clearFilter = () => {
    router.get(route("requests.index"));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Requests
          </h2>
          <Link
            href={route("requests.create")}
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
          >
            Apply for voter
          </Link>
        </div>
      }
    >
      <Head title="Requests" />

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
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <TableHeading
                        name="type"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Request For
                      </TableHeading>

                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>

                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Create Date
                      </TableHeading>
                      <th className="px-3 py-3">Verified By</th>
                      <th className="px-3 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th colSpan="6" className="py-3">
                        <SelectInput
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                          <option value="approved">Approved</option>
                        </SelectInput>
                        <SelectInput
                          className="mx-4"
                          defaultValue={queryParams.type}
                          onChange={(e) =>
                            searchFieldChanged("type", e.target.value)
                          }
                        >
                          <option value="">Select Request</option>
                          <option value="new_voter">New Voter</option>
                          <option value="exist_voter">Update Voter</option>
                          <option value="new_candidate">New Candidate</option>
                          <option value="exist_candidate">
                            Update Candidate
                          </option>
                        </SelectInput>
                        <SecondaryButton onClick={() => clearFilter()}>
                          Clear Filter
                        </SecondaryButton>
                      </th>
                    </tr>
                  </thead>
                  {requests.data.length ? (
                    <tbody>
                      {requests.data.map((request) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={request.id}
                        >
                          <td className="px-3 py-2">{request.id}</td>
                          <th className="px-3 py-2 hover:underline text-blue-600 hover:cursor-pointer hover:text-blue-800">
                            <Link
                              href={route("requests.show", request)}
                              title="View Details"
                            >
                              {REQUEST_TYPE_TEXT_MAP[request.type]}
                            </Link>
                          </th>
                          <td className="px-3 py-2">
                            <span
                              className={
                                "px-2 py-1 rounded text-white " +
                                REQUEST_STATUS_CLASS_MAP[request.status]
                              }
                            >
                              {REQUEST_STATUS_TEXT_MAP[request.status]}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {request.created_at}
                          </td>
                          <td className="px-3 py-2">
                            {request.lastUpdatedBy?.name}
                          </td>
                          <td className="px-3 py-2 text-nowrap text-center">
                            {user.is_admin && (
                              <>
                                <button
                                  disabled={request.status !== "pending"}
                                  onClick={(e) => approveRequest(request)}
                                  className={
                                    "border border-green-500 text-green-600 hover:bg-green-50 py-1 px-3 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out mx-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-900/20 " +
                                    (request.status !== "pending"
                                      ? " cursor-not-allowed"
                                      : "")
                                  }
                                >
                                  Approve
                                </button>
                                <button
                                  disabled={request.status !== "pending"}
                                  onClick={(e) => rejectRequest(request)}
                                  className={
                                    "border border-amber-500 text-amber-600 hover:bg-amber-50 py-1 px-3 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out mx-1 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-amber-900/20 " +
                                    (request.status !== "pending"
                                      ? " cursor-not-allowed"
                                      : "")
                                  }
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              disabled={request.status !== "pending"}
                              onClick={(e) => deleteRequest(request)}
                              className={
                                "border border-red-500 text-red-600 hover:bg-red-50 py-1 px-3 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out mx-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 " +
                                (request.status !== "pending"
                                  ? " cursor-not-allowed"
                                  : "")
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-center pt-5 text-lg">
                          <h1 className="text-gray-800 font-bold">
                            No requests found!
                          </h1>
                          <p className="text-gray-500">
                            Please check your filters.
                          </p>
                          <p className="text-gray-500">
                            If you don't have any requests, please apply.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
              {requests.meta.per_page < requests.meta.total ? (
                <Pagination links={requests.meta.links} />
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
