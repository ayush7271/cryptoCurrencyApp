import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallCurrencyRequest } from "../slice/getallCurrency";

export const Navbar = ({setCurrency}) => {
  const getallCurrency = useSelector(
    (store) => store?.getallCurrency?.getallCurrency
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallCurrencyRequest());
  }, []);
  return (
    <div className="w-[100%] h-[70px] bg-[#272727] flex justify-between">
      <div className= "w-[220px] text-[yellow] pt-[18px] ml-[8%] font-bold text-[25px]">
        Crypto Hunter
      </div>
      <div className="w-[180px] pt-[18px] text-[25px]">
        <select onChange={(e)=>setCurrency(e.target.value)} className="rounded-lg">
          <option value={"inr"}>currency</option>

          {getallCurrency?.map((i, j) => (
            <>{<option value={i}>{i}</option>}</>
          ))}
        </select>
      </div>
    </div>
  );
};
