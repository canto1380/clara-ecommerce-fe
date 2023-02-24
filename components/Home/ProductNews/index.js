import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ItemsCarousel from "./ItemsCarousel";
import styles from "./productNew.module.css";

const ProductNews = ({ footwearNews }) => {
  return (
    <Container className={`py-5`}>
      <Row className={`pt-4`}>
        <Col xs={7} className={`text-start`}>
          <h4>Lo mas nuevo</h4>
        </Col>
        <Col xs={5} className={`text-end`}>
          <Link
            as='/productos/nuevos'
            href="/productos/nuevos"
          >
            <h5 type="button" className={`btn ${styles.btnVerMas}`}>
              Ver todo
            </h5>
          </Link>
        </Col>
      </Row>
      <Row>
        <ItemsCarousel footwearNews={footwearNews} />
      </Row>
    </Container>
  );
};

export default ProductNews;
