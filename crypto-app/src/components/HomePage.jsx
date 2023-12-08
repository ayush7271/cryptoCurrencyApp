import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../common/carousel";
import { getCryptoCoinListRequest } from "../slice/cryptoCoinListSlice";
import { trendingCoinRequest } from "../slice/cryptoSlice";
import addCommaToCurrency from "../common/common";
import { useNavigate } from "react-router-dom";
import { CryptoConverter } from "./CryptoConverter";

export const HomePage = ({ currency }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(10);
  const crypto = useSelector((store) => store);
  const trendingCrypto = useSelector(
    (store) => store?.trendingCrypto?.trendingCoin
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCryptoCoinListRequest({ currency: currency }));
    dispatch(trendingCoinRequest({ currency: currency, page: page }));
  }, [currency]);
  var b = trendingCrypto?.filter((value) => {
    if (search === "") {
      return;
    }
    if (value.name?.toLowerCase()?.includes(search?.toLowerCase())) {
      return value;
    }
  });
  useEffect(() => {
    dispatch(trendingCoinRequest({ currency: currency, page: page }));
  }, [page]);

  return (
    <div className="bg-[black] h-screen">
      {!trendingCrypto && !crypto?.coinlist?.cryptoList ? (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-[60px] w-[60px] border-t-[2px] border-b-5 border-yellow-500"></div>
          </div>
        </>
      ) : (
        <>
          <CryptoConverter
          setPage={setPage}
          currency={currency}
          setSearch={setSearch}
          trendingCrypto={trendingCrypto}
          search={search}
          />
        </>
      )}
    </div>
  );
};
