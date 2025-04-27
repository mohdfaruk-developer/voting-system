export default function Data({ data }) {
  return (
    <div>
      <div>
        <span className="font-bold text-lg">Address:</span>
        <span className="mx-2 mt-1">{data.address || "NA"}</span>
      </div>
      <div className="mt-4">
        <span className="font-bold text-lg">City:</span>
        <span className="mx-2 mt-1">{data.city || "NA"}</span>
      </div>
      <div className="mt-4">
        <span className="font-bold text-lg">State:</span>
        <span className="mx-2 mt-1">{data.state || "NA"}</span>
      </div>
      <div className="mt-4">
        <span className="font-bold text-lg">Country:</span>
        <span className="mx-2 mt-1">{data.country || "NA"}</span>
      </div>
      <div className="mt-4">
        <span className="font-bold text-lg">Pin Code:</span>
        <span className="mx-2 mt-1">{data.pin_code || "NA"}</span>
      </div>
      <div className="mt-4">
        <span className="font-bold text-lg">Religion:</span>
        <span className="mx-2 mt-1">{data.religion || "NA"}</span>
      </div>
      <div className="mt-4">
        <span className="font-bold text-lg">Aadhar Number:</span>
        <span className="mx-2 mt-1">{data.aadhar_number || "NA"}</span>
      </div>
      <div className="mt-4">
        <span className="font-bold text-lg">Date Of Birth:</span>
        <span className="mx-2 mt-1">{data.date_of_birth || "NA"}</span>
      </div>
    </div>
  );
}
