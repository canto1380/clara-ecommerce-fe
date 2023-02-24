import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import CardFootwear from "components/Cards/CardFootwear";

const ItemsCarouselFeatured = ({footwearNews}) => {
  const [footwearFilter, setFootwearFilter] = useState("");

  useEffect(() => {
    const filterFootw = footwearNews?.allFootwear.slice(0, 8);
    setFootwearFilter(filterFootw);
  }, []);
  return (
    <>
      {footwearFilter.length ? (
        <div className={`container pt-2 pb-4 justify-content-center`}>
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode, Navigation]}
            navigation={true}
            className={`mySwipper`}
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
              1150: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            <Row>
            {footwearFilter?.map((foot) => (
              <SwiperSlide key={foot._id}>
                <Col className={``}>
                <CardFootwear foot={foot}/>
                </Col>
              </SwiperSlide>
            ))}
            </Row>

          </Swiper>
        </div>
      ) : null}
    </>
  );
};

export default ItemsCarouselFeatured;
