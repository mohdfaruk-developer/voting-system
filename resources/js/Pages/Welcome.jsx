import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="Welcome" />
      <div className="text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900">
        <div className="relative flex min-h-screen flex-col items-center">
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <header className="grid grid-cols-2 items-center gap-2 py-10">
              <nav className="flex -mx-3">
                <div className="flex items-center space-x-3 rounded-2xl">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big-icon lucide-circle-check-big"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                      VoteNow
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Secure & Easy Voting
                    </p>
                  </div>
                </div>
              </nav>
              <nav className="-mx-3 flex justify-end">
                {auth.user ? (
                  <Link
                    href={route("dashboard")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href={route("login")}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                      Log in
                    </Link>
                    <Link
                      href={route("register")}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </header>
            <div className="p-6 text-gray-800 dark:text-white transition-colors duration-300">
              <h1 className="text-2xl font-bold text-center">
                Online Voting System
              </h1>

              {/* Hero Section */}
              <section className="text-center py-10 md:py-20">
                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                  Secure, Transparent & Fast Voting
                </h2>
                <p className="mt-4 text-lg max-w-xl mx-auto text-gray-600 dark:text-gray-300">
                  Cast your vote from anywhere in a matter of seconds. No more
                  long queues or paper ballots.
                </p>
              </section>

              {/* Features */}
              <section className="py-6 md:py-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                  {[
                    {
                      title: "Secure & Transparent",
                      description:
                        "All votes are encrypted and stored immutably, ensuring the integrity and transparency of the election process.",
                    },
                    {
                      title: "User Friendly",
                      description:
                        "Simple and intuitive interface for all voters.",
                    },
                    {
                      title: "Instant Results",
                      description:
                        "Get real-time election results immediately after voting ends no delays, no manual counting.",
                    },
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl shadow border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Footer */}
              <footer className="text-center text-sm py-6 text-gray-500 dark:text-gray-400">
                © 2025 Online Voting System. All rights reserved.
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
