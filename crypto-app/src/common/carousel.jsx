import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import addCommaToCurrency from "./common";
const Carousel = ({ data, currency }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <Slider {...settings}>
          {data &&
            data.map((coin, index) => {
              const coinName = Object.keys(coin)[0];
              const coinInfo = coin[coinName];
              return (
                <div key={index} className="w-[90%] m-auto">
                  <div
                    className={`w-[80px] ${"h-[50px]"} m-auto cursor-pointer pt-[20px] rounded-lg`}
                  >
                    <div className="w-[90%] m-auto">
                      <img className={` m-auto`} src={coin?.image} alt="" />
                      <div className="flex ">
                        <div className="h-[10px] text-[15px] font-bold text-[white] opacity-80 mt-[10px] mb-[10px]">
                          {coin?.symbol}
                        </div>
                        <div className="text-[15px] ml-[5px] font-bold  text-[green] opacity-80 mt-[10px] mb-[10px]">
                          {coin?.market_cap_change_percentage_24h > 0 ? (
                            "+" +
                            coin?.market_cap_change_percentage_24h.toFixed(2)
                          ) : (
                            <p className="text-[red]">
                              {coin?.market_cap_change_percentage_24h.toFixed(
                                2
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className=" text-[#373737]">
                        <div className="w-[80%] m-auto text-left text-[15px] text-[#FFFFFF]">
                          {addCommaToCurrency(coin?.current_price, currency)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
