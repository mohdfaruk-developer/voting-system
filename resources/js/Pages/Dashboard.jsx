import ElectionCard from "@/Components/ElectionCard";
import { VoterDetails } from "@/Components/VoterDetails";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, voter, elections }) {
  const user = auth.user;
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="text-gray-900 dark:text-gray-100 p-4 sm:p-8">
              {voter ? (
                <VoterDetails voter={voter.data} />
              ) : (
                <div>
                  <h1 className="text-xl font-bold">Hi, {user.name}! 👋</h1>
                  <p className="mt-2 text-gray-600">
                    Welcome to the voting system. Please check your elections
                    below.
                  </p>
                  <p className="mt-2 text-gray-600">
                    Apply for voter card{" "}
                    <Link
                      className="text-blue-800 hover:text-blue-600 hover:underline"
                      href={route("requests.create")}
                    >
                      click here
                    </Link>
                  </p>
                  <p className="mt-2 text-gray-600">Happy voting! 🗳️</p>
                </div>
              )}
              <ElectionCard elections={elections ? elections.data : null} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
