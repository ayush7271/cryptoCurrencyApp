import React, { useEffect, useState } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import Carousel from "../common/carousel";
import { getCryptoCoinListRequest } from "../slice/cryptoCoinListSlice";
import { trendingCoinRequest } from "../slice/cryptoSlice";
import addCommaToCurrency from "../common/common";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const crypto = useSelector((store) => store);
  const trendingCrypto = useSelector(
    (store) => store?.trendingCrypto?.trendingCoin
  );
  const base = window.location.href;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCryptoCoinListRequest());
    dispatch(trendingCoinRequest());

    // trendingCoinRequest
  }, []);
  console.log(trendingCrypto, "trendingCrypto");
  var b = trendingCrypto?.filter((value) => {
    if (search === "") {
      return;
    }
    if (value.name?.toLowerCase()?.includes(search?.toLowerCase())) {
      return value;
    }
  });
  console.log(b);
  function formatAmount(amount) {
    if (amount < 1000000) {
        return amount.toLocaleString(); // Add commas for thousands separator
    } else {
        return (amount / 1000000).toFixed(2) + "M"; // Convert to millions with two decimal places
    }
}
  return (
    <div className="bg-[black] h-screen">
      <div className={`w-[100%] h-[500px] container`}>
        <div className="w-[60%] pt-[80px] text-center h-[20px] font-bold text-[50px] m-auto text-[#ffffff]">
          CRYPTO HUNTER
        </div>
        <div className="w-[100%] h-[200px] pt-[150px]">
          <Carousel data={crypto?.coinlist?.cryptoList} />
        </div>
      </div>
      <div className="w-[100%] h-auto bg-[black]">
        <div className="w-[80%] m-auto bg-[red]">
          <input
            type="text"
            className=""
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-[100%]">
          <div className="w-[90%] h-[40px] m-auto bg-[yellow] mt-[10px] flex justify-around rounded-xl"></div>
          {trendingCrypto
            ?.filter((state) => {
              if (!search) {
                return state;
              }
              if (state?.name?.toLowerCase()?.includes(search?.toLowerCase())) {
                return state;
              }
            })
            .map((i, j) => (
              <>
                <div className="w-[90%] h-[50px] m-auto bg-[] mt-[10px] flex justify-around rounded-xl">
                  <div className="w-[80px] h-[50px] text-[#FFFFFF]  bg-[] pt-[10px] flex">
                    <div className="">
                      <img
                        className="w-[30px] h-[30px] ml-[5px]"
                        src={i?.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-[10px]">
                      <div>{i?.symbol}</div>
                      <div className="text-[10px]">{i?.name}</div>
                    </div>
                  </div>
                  <div className="w-[80px] pt-[10px] h-[40px] text-[#ffffff]">
                    {addCommaToCurrency(i?.current_price)}
                  </div>
                  <div className="w-[50px] pt-[10px] h-[40px] text-[green]">
                    {i?.market_cap_change_percentage_24h > 0 ? (
                      "+" + i?.market_cap_change_percentage_24h.toFixed(2)
                    ) : (
                      <p className="text-[red]">
                        {i?.market_cap_change_percentage_24h.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <div className="w-[120px] pt-[10px] h-[40px] text-[#ffffff]">
                  ₹{  formatAmount(i?.market_cap)}
                  </div>
                </div>

                {<hr className="w-[90%] m-auto" />}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};
