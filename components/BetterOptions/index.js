import React from "react";
import { Col } from "react-bootstrap";
import styles from './betteroptions.module.css'
import BetterOptionsCarousel from "./BetterOptionsCarousel";

const BetterOptions = ({footwearFeatured}) => {
  return (
    <>
      <div>
        <p className={`mb-0 fw-bolder py-2 px-3 ${styles.titleText}`}>
          Otras Opciones
        </p>
      </div>
      <div>
        <BetterOptionsCarousel footwearFeatured={footwearFeatured}/>
      </div>
    </>

  );
};

export default BetterOptions;
