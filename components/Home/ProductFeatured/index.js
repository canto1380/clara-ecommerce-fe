import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ItemsCarouselFeatured from "./ItemsCarouselFeatured.js";
import styles from "./productFeatured.module.css";

const ProductFeatured = ({ footwearNews }) => {
  return (
    <Container className={`py-5`}>
      <Row className={`pt-4`}>
        <Col xs={7} className={`text-start`}>
          <h4>Destacados</h4>
        </Col>
        <Col xs={5} className={`text-end`}>
          <Link href="/productos/destacados" as="/productos/destacados">
            <h5 type="button" className={`btn ${styles.btnVerMas}`}>
              Ver todo
            </h5>
          </Link>
        </Col>
      </Row>
      <Row>
        <ItemsCarouselFeatured footwearNews={footwearNews} />
      </Row>
    </Container>
  );
};

export default ProductFeatured;
