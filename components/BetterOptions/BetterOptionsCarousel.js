import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Row, Col } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import CardBetterOption from "./CardBetterOption";
import "./betteroptions.module.css";

const BetterOptionsCarousel = ({ footwearFeatured }) => {
  const [footFeatured, setFootFeatured] = useState("");
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  useEffect(() => {
    setFootFeatured(footwearFeatured?.allFootwear);
  }, []);
  return (
    <div>
      {footFeatured.length ? (
        <div className={`container pt-2 justify-content-center`}>
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
            grabCursor={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            <Row>
              {footFeatured?.map((foot) => (
                <SwiperSlide key={foot._id}>
                  <Col className={`mb-5`}>
                    <CardBetterOption foot={foot} />
                  </Col>
                </SwiperSlide>
              ))}
            </Row>
          </Swiper>
        </div>
      ) : (
        <p>a</p>
      )}
    </div>
  );
};

export default BetterOptionsCarousel;
