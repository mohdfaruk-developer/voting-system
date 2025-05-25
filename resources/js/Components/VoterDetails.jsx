import { Link } from "@inertiajs/react";

export function VoterDetails({ voter }) {
  return (
    <>
      <div className="grid md:grid-cols-2 px-3 md:px-0">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">Voter Details</h1>
        </div>
        <div className="flex justify-between md:justify-end md:my-0 my-3">
          <Link
            href={route("voters.show", voter)}
            className="md:mr-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
          >
            View details
          </Link>
          <Link
            href={route("requests.create") + `?voter_id=${voter.id}`}
            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
          >
            Update request
          </Link>
        </div>
      </div>
      <dl>
        <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
          <dt className="text-base font-medium leading-6 capitalize">
            Voter Number
          </dt>
          <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
            <span>{voter.voter_number}</span>
          </dd>
        </div>
      </dl>
      <dl>
        <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
          <dt className="text-base font-medium leading-6 capitalize">
            Voter Name
          </dt>
          <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
            <span>{voter.name}</span>
          </dd>
        </div>
      </dl>
      <dl>
        <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
          <dt className="text-base font-medium leading-6 capitalize">
            Date Of Birth
          </dt>
          <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
            <span>{voter.date_of_birth}</span>
          </dd>
        </div>
      </dl>
      <dl>
        <div className="px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-300">
          <dt className="text-base font-medium leading-6 capitalize">
            Aadhar Number
          </dt>
          <dd className="mt-1 text-base leading-6 col-span-2 text-end w-full sm:mt-0 flex justify-between">
            <span>{voter.aadhar_number}</span>
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
                (voter.status === "Active"
                  ? " text-green-600"
                  : " text-red-600")
              }
            >
              {voter.status}
            </span>
          </dd>
        </div>
      </dl>
    </>
  );
}
