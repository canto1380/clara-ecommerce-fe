import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./cart.module.css";
import { Cart } from "context/CartProvider";

const ItemsCart = ({ cartItemsArray1 }) => {
  const { dispatch } = useContext(Cart);

  const removeCartHandler = (item) => {
    dispatch({ type: "CARD_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: "CARD_ADD_ITEM", payload: { ...item, quantity } });
  };

  //   useEffect(() => {
  //     setCartItemArray(getCartData());
  //   }, [cartItems]);
  //   // const cartItemsArray1 = Object.values(cartItemsArray);
  //   let cartItemsArray1;
  //   if (cartItemsArray !== null) {
  //     cartItemsArray1 = Object.values(cartItemsArray);
  //   }
  return (
    <>
      <div>
        <p className={`mb-0 fw-bolder py-2 px-3 ${styles.titleText}`}>
          Tu Carrito
        </p>
      </div>
      <div>
        <ul className={`px-3`}>
          {cartItemsArray1.length ? (
            cartItemsArray1.map((item) => (
              <li key={item?._id} className={`my-3 ${styles.itemsCartLI}`}>
                <Row className="m-0 d-flex justify-content-between">
                  <>
                    <Col
                      xs={3}
                      className={`${styles.containerImgItemCart} my-2`}
                    >
                      <img
                        src="images/logo.jpg"
                        className={`${styles.imgCarousel}`}
                      />
                    </Col>
                    <Col xs={4} className={`py-2 px-0`}>
                      <div>
                        <span>{item?.nameFootwear}</span>
                      </div>
                      <div>
                        <p className={`mb-0`}>Color: {item?.colorSelected}</p>
                      </div>
                      <div>
                        <p className={`mb-0`}>Talle: {item?.sizeSelected}</p>
                      </div>
                    </Col>
                    <Col xs={1} className={`py-2 px-0 text-center`}>
                      <select
                        defaultValue={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col xs={3} className={`py-2 px-0 text-center`}>
                      <p className="fw-bolder">
                        ${" "}
                        {item.idDiscount
                          ? item?.totalWithDiscount * item?.quantity
                          : item?.priceOriginal * item?.quantity}
                      </p>
                    </Col>
                    <Col xs={1} className={`py-2 ps-0 pe-1 pe-0 text-end`}>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartHandler(item)}
                      >
                        X
                      </button>
                    </Col>
                    <hr className="my-0 " />
                  </>
                </Row>
              </li>
            ))
          ) : (
            <li className={`my-3 text-center py-3 ${styles.itemsCartLI}`}>
              <p className="fw-bolder m-0">No hay elementos en el Carrito</p>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default ItemsCart;
