export const REQUEST_STATUS_CLASS_MAP = {
  pending: "bg-amber-500",
  rejected: "bg-red-500",
  approved: "bg-green-500",
};

export const REQUEST_STATUS_TEXT_MAP = {
  pending: "Pending",
  rejected: "Rejected",
  approved: "Approved",
};

export const REQUEST_TYPE_TEXT_MAP = {
  new_voter: "New Voter",
  exist_voter: "Update Voter",
  new_candidate: "New Candidate",
  exist_candidate: "Update Candidate",
};

export const dateformat = (date) => {
  return (
    new Date(date).toLocaleDateString() +
    " " +
    new Date(date).toLocaleTimeString()
  );
};
