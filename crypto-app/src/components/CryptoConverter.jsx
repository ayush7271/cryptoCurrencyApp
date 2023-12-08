import React from "react";
import Carousel from "../common/carousel";
import addCommaToCurrency from "../common/common";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const CryptoConverter = ({
  setPage,
  currency,
  setSearch,
  trendingCrypto,
  search,
}) => {
    const crypto = useSelector((store) => store);
  const navigate = useNavigate();
  function formatAmount(amount) {
    if (amount < 1000000) {
      return amount.toLocaleString();
    } else {
      return (amount / 1000000).toFixed(2) + "M";
    }
  }
  const handlePage = (e) => {
    setPage(e);
  };
  return (
    <>
      <div
        className={`w-[100%] h-[500px] bg-[url('https://iili.io/JIUeO3Q.jpg')]`}
      >
        <div className="w-[60%] pt-[80px] text-center h-[20px] font-bold text-[50px] m-auto text-[#ffffff]">
          CRYPTO HUNTER
        </div>
        <div className="w-[100%] h-[200px] pt-[150px]">
          <Carousel data={crypto?.coinlist?.cryptoList} currency={currency} />
        </div>
      </div>
      <div className="w-[100%] h-auto bg-[black]">
        <div className="w-[80%] m-auto h-[50px]">
          <input
            type="text"
            className="w-[100%] h-[50px] rounded-2xl placeholder:text-center"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search here"
          />
        </div>
        <div className="w-[100%]">
          <div className="w-[90%] h-[40px] m-auto bg-[yellow] mt-[10px] flex justify-around rounded-xl">
            <div className="w-[80px] h-[50px] text-[black] font-bold  text-[15px]  pt-[10px] flex">
              Coin
            </div>
            <div className="w-[50px] pt-[10px] font-bold  text-[15px]  h-[40px] text-[black]">
              {" "}
              Price
            </div>
            <div className="w-[100px] pt-[10px] h-[40px] font-bold text-[black]  text-[15px] ">
              {" "}
              24hr change
            </div>
            <div className="w-[120px] pt-[10px] h-[40px] font-bold  text-[15px] text-[black]">
              {" "}
              Market Cap
            </div>
          </div>
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
                <div
                  className="w-[90%] h-[50px] m-auto bg-[] mt-[10px] flex justify-around rounded-xl cursor-pointer"
                  onClick={() => navigate(`/${i.id}`)}
                >
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
                    {addCommaToCurrency(i?.current_price, currency)}
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
                    ₹{formatAmount(i?.market_cap)}
                  </div>
                </div>

                {<hr className="w-[90%] m-auto" />}
              </>
            ))}

          <div className="text-[#FFFFFF] h-[100px] bg-[black]">
            <div className="w-[400px] m-auto flex justify-around mt-[15px]">
              {[...Array(10)].map((i, j) => (
                <div
                  className="w-[10px] h-[10px] cursor-pointer"
                  onClick={() => {
                    handlePage((j + 1));
                  }}
                >
                  {j + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
