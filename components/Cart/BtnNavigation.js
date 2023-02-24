import React from "react";
import { Row, Button, Col } from "react-bootstrap";
import Link from "next/link";
import styles from './cart.module.css'
import { BsArrowLeftShort } from "react-icons/bs";

const BtnNavigation = () => {
  return (
    <Row className={`mb-3`}>
      <Col className={`p-0`}>
        <Link href="/" as="/" className={`fw-bolder`}>
          <Button className={`btn ${styles.btnNavegar}`}>
            <BsArrowLeftShort className={`${styles.sizeIcon} text-light`} />
            Seguir Navegando
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default BtnNavigation;
