import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
  dateformat,
  REQUEST_STATUS_CLASS_MAP,
  REQUEST_STATUS_TEXT_MAP,
  REQUEST_TYPE_TEXT_MAP,
} from "@/constants.jsx";
import Data from "@/Components/Data";
import { useState } from "react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Show({ auth, request, success, error }) {
  const user = auth.user;
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
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
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Request for ${REQUEST_TYPE_TEXT_MAP[request.type]}`}
          </h2>
        </div>
      }
    >
      <Head title={`Request for ${REQUEST_TYPE_TEXT_MAP[request.type]}`} />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="py-12">
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
            <div className="p-10 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-semibold text-base">
                      Request ID
                    </label>
                    <p className="mt-1">{request.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-base">
                      Request Type
                    </label>
                    <p className="mt-1">
                      {REQUEST_TYPE_TEXT_MAP[request.type]}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-base">
                      Request Status
                    </label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          REQUEST_STATUS_CLASS_MAP[request.status]
                        }
                      >
                        {REQUEST_STATUS_TEXT_MAP[request.status]}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-semibold text-base">
                      Create Date
                    </label>
                    <p className="mt-1">{dateformat(request.created_at)}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-base">
                      Last Update Date
                    </label>
                    <p className="mt-1">{dateformat(request.updated_at)}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-base">
                      Verified By
                    </label>
                    <p className="mt-1">
                      {request.lastUpdatedBy?.name || "NA"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:gap-1 md:grid-cols-2 mt-4">
                <div>
                  <label className="font-semibold text-2xl">Request Data</label>
                  <Data data={request.data} request={request} />
                </div>
                {request.old_data ? (
                  <div className="md:mt-0 mt-4">
                    <label className="font-semibold text-2xl">Old Data</label>
                    <Data data={request.old_data} request={request} />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="grid md:gap-1 md:grid-cols-2 mt-4">
                {request.comment && (
                  <div>
                    <label className="font-semibold text-base">
                      Rejection Reason
                    </label>
                    <p className="mt-1">{request.comment || "NA"}</p>
                  </div>
                )}
                <div className="md:mt-0 mt-4 flex items-center">
                  <p
                    className="underline text-base text-blue-600 hover:cursor-pointer hover:text-blue-800"
                    onClick={confirmUserDeletion}
                  >
                    {request.type.includes("voter")
                      ? "View Aadhar Card"
                      : "View Candidate Image"}
                  </p>
                </div>
              </div>
              <div className="my-4 text-center">
                {user.is_admin && (
                  <>
                    <button
                      disabled={request.status !== "pending"}
                      onClick={(e) => approveRequest(request)}
                      className={
                        "mx-2 border border-green-500 text-green-600 hover:bg-green-50 py-2 px-5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-900/20 " +
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
                        "mx-2 border border-amber-500 text-amber-600 hover:bg-amber-50 py-2 px-5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-amber-900/20 " +
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
                    "mx-2 border border-red-500 text-red-600 hover:bg-red-50 py-2 px-5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 " +
                    (request.status !== "pending" ? " cursor-not-allowed" : "")
                  }
                >
                  Delete
                </button>
              </div>

              <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <div className="p-6">
                  {request.type.includes("voter") ? (
                    <>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Aadhar Card Image of request user for verification
                      </h2>
                      <p className="my-2 text-sm text-gray-600 dark:text-gray-400">
                        This is the Aadhar card image of the voter user. Please
                        verify the details before proceeding with any actions.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Candidate Image of request user for verification
                      </h2>
                      <p className="my-2 text-sm text-gray-600 dark:text-gray-400">
                        This is the candidate image of the request user. Please
                        verify the details before proceeding with any actions.
                      </p>
                    </>
                  )}
                  <div>
                    <img
                      src={
                        request.type.includes("voter")
                          ? request.data.aadhar_image_path
                          : request.data.candidate_image
                      }
                      alt={
                        request.type.includes("voter")
                          ? "Aadhar image"
                          : "Candidate image"
                      }
                      className="w-full h-[300px] object-contain"
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>
                      Cancel
                    </SecondaryButton>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
