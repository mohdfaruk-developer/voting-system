import { dateformat } from "@/constants";
import { Link } from "@inertiajs/react";
import React from "react";

export default function ElectionCard({ elections }) {
  if (!elections || elections.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No upcoming elections.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {elections.map((election) => (
        <Link
          href={route("elections.show", election.id)}
          key={election.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            {election.name}
          </h2>
          <p className="text-gray-600 mt-1">
            {election.level_name} {election.level} Level
          </p>
          <p className="mt-3 text-gray-700">{election.description}</p>

          <div className="mt-4 text-gray-500">
            <p>
              <span className="font-medium text-gray-700">Start:</span>{" "}
              {dateformat(election.election_start)}
            </p>
            <p>
              <span className="font-medium text-gray-700">End:</span>{" "}
              {dateformat(election.election_end)}
            </p>
            <p>
              <span className="font-medium text-gray-700">State:</span>{" "}
              <span
                className={
                  election.state === "upcoming"
                    ? "text-green-600 capitalize"
                    : "text-yellow-600 capitalize"
                }
              >
                {election.state}
              </span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
