import React from "react";
import { Container, Carousel } from "react-bootstrap";
import styles from "./carouselMain.module.css";

const CarouselMain = () => {
  return (
    <Container fluid className={`px-0`}>
      <Carousel className={`${styles.carouselIndicators}`}>
        <Carousel.Item className={`aa ${styles.containerImg} ${styles.carouselIndicators}`} interval={2000}>
          <img
            className={`d-block w-100 ${styles.imgCarousel}`}
            src={`https://thumbs.dreamstime.com/b/gold-sale-background-shine-backdrop-flyer-poster-shopping-sale-sign-discount-marketing-selling-banner-web-header-gold-sale-136099270.jpg`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className='text-dark'>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={`${styles.containerImg}`} interval={2000}>
          <img
            className={`d-block w-100 ${styles.imgCarousel}`}
            src={`https://previews.123rf.com/images/helenamozhjer/helenamozhjer1710/helenamozhjer171000013/88035806-zapatos-de-cuero-marr%C3%B3n-para-ni%C3%B1os-sobre-fondo-de-madera-concepto-de-oto%C3%B1o.jpg`}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3 className='text-dark'>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={`${styles.containerImg}`} interval={2000}>
          <img
            className={`d-block w-100 ${styles.imgCarousel}`}
            src={`https://img.freepik.com/vector-gratis/par-zapatos-deportivos-cuero-fondo-madera_1284-17526.jpg?w=2000`}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3 className='text-dark'>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </Container>
  );
};

export default CarouselMain;
