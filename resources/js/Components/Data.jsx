export default function Data({ data }) {
  return (
    <div>
      <div>
        <span className="font-medium text-base">Name:</span>
        <span className="mx-2 mt-1">{data.name || "NA"}</span>
      </div>
      <div className="mt-2">
        <span className="font-medium text-base">Date Of Birth:</span>
        <span className="mx-2 mt-1">{data.date_of_birth || "NA"}</span>
      </div>
      <div className="mt-2">
        <span className="font-medium text-base">Aadhar Number:</span>
        <span className="mx-2 mt-1">{data.aadhar_number || "NA"}</span>
      </div>
      <div className="mt-2">
        <span className="font-medium text-base">Religion:</span>
        <span className="mx-2 mt-1">{data.religion || "NA"}</span>
      </div>
      <div className="mt-2">
        <span className="font-medium text-base">Address:</span>
        <span className="mx-2 mt-1">{data.address || "NA"}</span>
      </div>
      <div className="mt-2">
        <span className="font-medium text-base">City:</span>
        <span className="mx-2 mt-1">{data.city || "NA"}</span>
      </div>
      <div className="mt-2">
        <span className="font-medium text-base">State:</span>
        <span className="mx-2 mt-1">{data.state || "NA"}</span>
      </div>
      <div className="mt-2">
        <span className="font-medium text-base">Pin Code:</span>
        <span className="mx-2 mt-1">{data.pin_code || "NA"}</span>
      </div>
      <div className="mt-2">
        <span className="font-medium text-base">Country:</span>
        <span className="mx-2 mt-1">{data.country || "NA"}</span>
      </div>
    </div>
  );
}
