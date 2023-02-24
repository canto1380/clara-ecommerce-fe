import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./bannerHome.module.css";

const BannerHome = () => {
  return (
    <Container fluid className={`${styles.imgFondo}`}>
      <Row className={`${styles.bannerHome}`}>
        <Col className=''>
        <p className={`text-center mx-5 my-0 ${styles.bannerHomeText}`}>La mejor calidad y los mejores precios en calzados femeninos</p>
        </Col>
      </Row>
    </Container>
  );
};

export default BannerHome;
