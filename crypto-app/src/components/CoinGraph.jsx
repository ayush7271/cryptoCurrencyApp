import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { getBitcoinInfoRequest } from "../slice/getBitcoinInfo";
import { historicalChartRequest } from "../slice/historicalChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import addCommaToCurrency from "../common/common";
export const CoinGraph = ({ currency }) => {
  const [days, setDays] = useState(7);
  const coindetails = useSelector(
    (store) => store?.getBitcoinInfo?.getBitcoinInfo
  );
  const historicData =
    useSelector((store) => store?.historicalChart?.historicalChart?.prices) ||
    [];
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBitcoinInfoRequest({ id: param.id }));
    dispatch(
      historicalChartRequest({ id: param.id, days: days, currency: currency })
    );
  }, []);

  useEffect(() => {
    dispatch(
      historicalChartRequest({ id: param.id, days: days, currency: currency })
    );
  }, [days]);

  function handleDays(e) {
    setDays(e);
  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  return (
    <div className="w-[100%] h-[1500px] bg-[#272727] coingraph">
      <img
        className="w-[30px] h-[50px] pt-5 ml-[10px] "
        onClick={() => navigate("/")}
        src="https://cdn-icons-png.flaticon.com/128/12432/12432190.png"
        alt=""
      />
      <div className="w-[100%] h-auto c1">
        <div className="w-[100%] bg-[] h-[400px]">
          <img
            className="m-auto pt-[50px]"
            src={coindetails?.image?.large}
            alt=""
          />
          <p className="m-auto w-[100%] text-[yellow] text-center text-[50px] ">
            {coindetails?.name}
          </p>
        </div>
        <div className="w-[80%] m-auto h-auto mb-[20px]">
          <div className="w-[100%] text-[#ffffff] h-auto text-[20px]">
            {coindetails?.description?.bg.split(".")[0]}.
          </div>
          <div className="w-[100%] text-[#ffffff] h-auto text-[30px]">
            <span className="font-bold">Rank</span>:
            {coindetails?.coingecko_rank}
          </div>
          <div className="w-[100%] text-[#ffffff] h-auto text-[30px]">
            <span className="font-bold">Current Price</span>:
            {addCommaToCurrency(
              coindetails?.market_data?.current_price?.inr,
              currency
            )}
          </div>
        </div>
      </div>

      <div className="w-[100%] h-[500px] graphbox">
        {!historicData ? (
          <p>''</p>
        ) : (
          <>
            <Line
              data={{
                labels: historicData?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData?.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </>
        )}
        <div className="flex justify-around">
          <div className="w-[100px] h-[40px] rounded-lg bg-[yellow] text-[25px] text-center pt-[2px] cursor-pointer" onClick={()=>{handleDays(1)}}>
            24hr
          </div>
          <div className="w-[100px] h-[40px] rounded-lg bg-[yellow] text-[25px] text-center pt-[2px] cursor-pointer " onClick={()=>{handleDays(7)}}>
            7 days
          </div>
          <div className="w-[100px] h-[40px] rounded-lg bg-[yellow] text-[25px] text-center pt-[2px] cursor-pointer" onClick={()=>{handleDays(30)}}>
            30days
          </div>
        </div>
      </div>
    </div>
  );
};
