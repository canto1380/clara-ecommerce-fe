import React from "react";
import Title from "components/Title";
import CarouselMain from "./CarouselMain";
import ProductNews from "./ProductNews";
import BannerHome from "./BannerHome";
import ProductFeatured from "./ProductFeatured";
import styles from './BannerHome/bannerHome.module.css'

const HomeContainer = ({footwearNews, footwearFeatured}) => {
  return (
    <div>
      <Title title="Home" />
      <CarouselMain />
      <ProductNews footwearNews={footwearNews}/>
      <BannerHome />
      <ProductFeatured footwearNews={footwearFeatured} />
      <hr className='mx-5 w-90 mt-0'/>
    </div>
  );
};

export default HomeContainer;


