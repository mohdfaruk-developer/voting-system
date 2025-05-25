export default function ApplicationLogo(props) {
  return (
    <div className="flex items-center space-x-3 rounded-2xl text-gray-900 dark:text-gray-100">
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
  );
}
