import { GoPlus } from "react-icons/go";

const OwnCarSearch = ({ fn }: IOwnCarSearchProps) => {
  return (
    <button
      onClick={fn}
      className="flex gap-2 items-center button classic-mid-button classic-sub-button h-max"
    >
      הוספת רכב <GoPlus />
    </button>
  );
};

interface IOwnCarSearchProps {
  fn: () => void;
}

export default OwnCarSearch;
