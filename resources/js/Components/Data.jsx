export default function Data({ data }) {
  return (
    <div>
      {data.name && (
        <div>
          <span className="font-medium text-base">Name:</span>
          <span className="mx-2 mt-1">{data.name}</span>
        </div>
      )}
      {data.date_of_birth && (
        <div className="mt-2">
          <span className="font-medium text-base">Date Of Birth:</span>
          <span className="mx-2 mt-1">{data.date_of_birth}</span>
        </div>
      )}
      {data.aadhar_number && (
        <div className="mt-2">
          <span className="font-medium text-base">Aadhar Number:</span>
          <span className="mx-2 mt-1">{data.aadhar_number}</span>
        </div>
      )}
      {data.religion && (
        <div className="mt-2">
          <span className="font-medium text-base">Religion:</span>
          <span className="mx-2 mt-1">{data.religion}</span>
        </div>
      )}
      {"voter_alive" in data && (
        <div className="mt-2">
          <span className="font-medium text-base">Voter alive:</span>
          <span className="mx-2 mt-1">{data.voter_alive ? "Yes" : "No"}</span>
        </div>
      )}
      {data.address && (
        <div className="mt-2">
          <span className="font-medium text-base">Address:</span>
          <span className="mx-2 mt-1">{data.address}</span>
        </div>
      )}
      {data.city && (
        <div className="mt-2">
          <span className="font-medium text-base">City:</span>
          <span className="mx-2 mt-1">{data.city}</span>
        </div>
      )}
      {data.state && (
        <div className="mt-2">
          <span className="font-medium text-base">State:</span>
          <span className="mx-2 mt-1">{data.state}</span>
        </div>
      )}
      {data.pin_code && (
        <div className="mt-2">
          <span className="font-medium text-base">Pin Code:</span>
          <span className="mx-2 mt-1">{data.pin_code}</span>
        </div>
      )}
      {data.country && (
        <div className="mt-2">
          <span className="font-medium text-base">Country:</span>
          <span className="mx-2 mt-1">{data.country}</span>
        </div>
      )}
    </div>
  );
}
