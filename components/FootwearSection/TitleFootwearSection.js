import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./footwearSection.module.css";

const TitleFootwearSection = ({ data, title }) => {
  const [imageBackdrop, setImageBackdrop] = useState("");
  return (
    <Container fluid className={`${styles.imgFondo}`}>
      <Row className={`${styles.backdropNew}`}>
          <Col className="">
            <p className={`${styles.title} m-0 text-center`}>{title}</p>
          </Col>
      </Row>
    </Container>
  );
};

export default TitleFootwearSection;
