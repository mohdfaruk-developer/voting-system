import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ voter }) {
  const voterData = voter.data;

  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Voter Details
          </h2>
        </div>
      }
    >
      <Head title="Voter Details" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="p-5">
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Voter Number
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{voterData.voter_number}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Voter Name
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{voterData.name}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Date Of Birth
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{voterData.date_of_birth}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Aadhar Number
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{voterData.aadhar_number}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Voter Status
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span
                        className={
                          "font-bold" +
                          (voterData.status === "Active"
                            ? " text-green-600"
                            : " text-red-600")
                        }
                      >
                        {voterData.status}
                      </span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Religion
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>{voterData.religion}</span>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
                    <dt className="text-base font-medium leading-6 capitalize">
                      Address
                    </dt>
                    <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
                      <span>
                        {voterData.address} {voterData.city} {voterData.state}{" "}
                        {voterData.pin_code} ({voterData.country})
                      </span>
                    </dd>
                  </div>
                </dl>
                <div className="pt-10 text-center">
                  <span
                    className="mx-2 underline text-base text-blue-600 hover:cursor-pointer hover:text-blue-800"
                    onClick={confirmUserDeletion}
                  >
                    View Aadhar Card
                  </span>
                  {voterData.status == "Active" && (
                    <Link
                      href={
                        route("requests.create") + `?voter_id=${voterData.id}`
                      }
                      className="mx-2 inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                    >
                      Update request
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <div className="p-6">
          <div>
            <img
              src={voterData.aadhar_image_path}
              alt="Aadhar image"
              className="w-full h-[500px] object-contain"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
          </div>
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}
