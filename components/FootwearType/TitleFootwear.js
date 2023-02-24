import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./footwearType.module.css";

const TitleFootwear = ({ data }) => {
  const [imageBackdrop, setImageBackdrop] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setImageBackdrop(data?.footwearByType[0]?.idFootwearType?.image);
    setTitle(data?.footwearByType[0]?.idFootwearType?.nameType?.toUpperCase());
  }, [data]);
  return (
    <>
      {imageBackdrop !== "" ? (
        <Container
          fluid
          style={{ backgroundImage: `url(${imageBackdrop})` }}
          // style={{backgroundColor: "red"}}
          className={` ${styles.imgFondo}`}
        >
          <Row className={`${styles.backdropNew}`}>
            <Col>
              <p className={`${styles.title} m-0 text-center`}>{title}</p>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container
          fluid
          style={{ backgroundImage: `url("/images/defaultImages.png")` }}
          className={` ${styles.imgFondo}`}
        >
          <Row className={`${styles.backdropNew}`}>
            <Col>
              <p className={`${styles.title} m-0 text-center`}>{title}</p>
            </Col>
          </Row>
        </Container>

      )}
    </>
  );
};

export default TitleFootwear;
