import Layout from "components/Layout/Layout";
import Title from "components/Title";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Cart } from "context/CartProvider";
import styles from "../styles/Carrito.module.css";
import { getCartData } from "helpers/helpers";
import BtnNavigation from "components/Cart/BtnNavigation";
import ItemsCart from "components/Cart/ItemsCart";
import ResumeCart from "components/Cart/ResumeCart";
import BetterOptions from "components/BetterOptions";
import { api } from "utils";
import MoreInformation from "components/MoreInformation";

const carrito = ({ footwearFeatured }) => {
  const { state } = useContext(Cart);
  const {
    cart: { cartItems },
  } = state;
  const [cartItemsArray, setCartItemArray] = useState(0);

  useEffect(() => {
    setCartItemArray(getCartData());
  }, [cartItems]);
  // const cartItemsArray1 = Object.values(cartItemsArray);
  let cartItemsArray1;
  if (cartItemsArray !== null) {
    cartItemsArray1 = Object.values(cartItemsArray);
  }
  return (
    <Layout>
      <Title title="Carrito de compras" />
      <hr />
      <Container className={`px-3 ${styles.paddingContainer}`}>
        <BtnNavigation />
        <Row className={`d-flex justify-content-between`}>
          <Col
            xs={12}
            lg={7}
            className={`border border-1 px-0 ${styles.marginContainer}`}
          >
            <ItemsCart cartItemsArray1={cartItemsArray1} />
          </Col>
          <Col xs={12} lg={4} className={`border border-1 px-0`}>
            <ResumeCart cartItemsArray1={cartItemsArray1} />
          </Col>
        </Row>
        <hr />
        <Row className={`d-flex justify-content-between`}>
          <Col xs={12} lg={7} className={`border border-1 px-0 mb-5`}>
            <BetterOptions footwearFeatured={footwearFeatured} />
          </Col>
          <Col xs={12} lg={4} className={`px-0 mb-5`}>
            <MoreInformation />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default carrito;
export async function getStaticProps({ params }) {
  const res = await api(
    "GET",
    "footwear/footwearNew?limit=8&filterSearch=featured"
  );
  const footwearFeatured = res.data;
  return {
    props: {
      footwearFeatured,
    },
    revalidate: 60,
  };
}
