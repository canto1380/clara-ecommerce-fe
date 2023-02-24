import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./cart.module.css";
import { BsArrowRightShort } from "react-icons/bs";
import { Cart } from "context/CartProvider";

const CartNav = () => {
  const [arrayItemCart, setArrayItemCart] = useState([]);
  const {state} = useContext(Cart)
  const {cart} = state
  let arrayItemCart1

  useEffect(() => {
    setArrayItemCart(JSON.parse(localStorage.getItem("cart-clara")) ? JSON.parse(localStorage.getItem("cart-clara")) : []);
  }, [cart.cartItems]);
  arrayItemCart1 = Object.values(arrayItemCart);
  return (
    <ul
      className={`${styles.dropdownAlignCart} dropdown-menu pt-0 px-2 border border-1`}
    >
      <li className={``}>
        <Link href="/carrito" className={`fw-bolder m-0 text-end`}>
          <p type="button" className={`m-0 py-2 px-2`}>
            Ir al carrito
            <BsArrowRightShort className={`${styles.sizeIcon} text-success`} />
          </p>
        </Link>
      </li>
      {arrayItemCart1.length ? (
        arrayItemCart1.map((item) => (
          <li key={item?._id} className={``}>
            <Row className="m-0 d-flex justify-content-between">
              <>
                <Col xs={3} className={`${styles.containerImgCart} my-2`}>
                  <img
                    src="images/logo.jpg"
                    className={`${styles.imgCarousel}`}
                  />
                </Col>
                <Col xs={5} className={`py-2 px-0`}>
                  <div>
                    <span>{item?.nameFootwear}</span>
                    <span> | {item?.quantity} Ud.</span>
                  </div>
                  <div>
                    <p className={`mb-0`}>Color: {item?.colorSelected}</p>
                  </div>
                  <div>
                    <p className={`mb-0`}>Talle: {item?.sizeSelected}</p>
                  </div>
                </Col>
                <Col xs={3} className={`py-2 px-0 text-center`}>
                  <p className="fw-bolder">
                    ${" "}
                    {item.idDiscount
                      ? item?.totalWithDiscount 
                      : item?.priceOriginal} 
                  </p>
                </Col>
                <Col xs={1} className={`py-2 ps-0 pe-1 pe-0 text-end`}>
                  X
                </Col>
                <hr className="my-0 " />
              </>
            </Row>
          </li>
        ))
      ) : (
        <li className="text-center py-3">
          <p className="fw-bolder m-0">No hay elementos en el Carrito</p>
        </li>
      )}
      <hr className="mt-0" />
    </ul>

  );
};

export default CartNav;
