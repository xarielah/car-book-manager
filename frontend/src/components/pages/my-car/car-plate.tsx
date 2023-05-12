import { parseCarNumber } from "../../../lib/util";

const CarPlate = ({ children }: ICarPlateProps) => {
  //   return <div className="">{parseCarNumber(children)}</div>;
  return (
    <span className="w-max  text-lg bg-yellow-300 font-bold cursor-pointer duration-300 ease-in-out hover:scale-[1.1] pl-1 flex items-center justify-center rounded-md border-[1px] border-slate-300 shadow-md text-gray-800">
      <div className="ml-1 h-full p-[.2em] flex items-center text-white rounded-tr-md rounded-br-md bg-blue-600">
        IL
      </div>
      <span className="mx-[.3em] text-2xl font-bold">
        {parseCarNumber(children)}
      </span>
    </span>
  );
};

interface ICarPlateProps {
  children: string;
}

export default CarPlate;
