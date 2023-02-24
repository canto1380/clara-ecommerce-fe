import React, { useEffect, useState } from "react";
import { Col, InputGroup, Form, Button } from "react-bootstrap";
import styles from "./cart.module.css";

const ResumeCart = ({ cartItemsArray1 }) => {
  const [delivery, setDelivery] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const deliveryAmount =
      cartItemsArray1.reduce((a, c) => a + c.quantity, 0) > 4 ? 0 : 1000;
    setDelivery(deliveryAmount);
    const amount = cartItemsArray1.reduce(
      (a, c) =>
        a +
        c.quantity * (c.idDiscount ? c?.totalWithDiscount : c?.priceOriginal),
      0
    );
    setAmount(amount);
  }, [cartItemsArray1]);
  useEffect(() => {

    setTotal(amount + delivery);
  }, [cartItemsArray1, amount, delivery]);
  return (
    <>
      <div>
        <p className={`mb-0 fw-bolder py-2 px-3 ${styles.titleText}`}>
          Tu Resumen
        </p>
      </div>
      <div className={`px-3`}>
        <div className={`d-flex justify-content-between ${styles.resume}`}>
          <p className={`mb-0`}>
            {cartItemsArray1.reduce((a, c) => a + c.quantity, 0)} Articulo/s
          </p>
          <p className={`mb-0`}>${amount}</p>
        </div>
        <div className={`d-flex justify-content-between ${styles.resume}`}>
          <p className={`mb-0`}>Impuestos</p>
          <p className={`mb-0`}>$0</p>
        </div>
        <div className={`d-flex justify-content-between ${styles.resume}`}>
          <p className={`mb-0`}>Entrega</p>
          <p className={`mb-0`}>${delivery}</p>
        </div>
        <div className={`d-flex justify-content-between ${styles.resumeTotal}`}>
          <p className={`mb-0`}>Total</p>
          <p className={`mb-0`}>${total}</p>
        </div>
        <hr />
        <div>
          <InputGroup className="mb-3">
            <Form.Control
              disabled
              size="sm"
              placeholder="Codigo Promocional"
              aria-label="Codigo Promocional"
              aria-describedby="basic-addon2"
            />
            <Button
              disabled
              className={`${styles.btnCupon}`}
              id="button-addon2"
            >
              Añadir
            </Button>
          </InputGroup>
        </div>
        <div className={`pt-2 pb-4`}>
          <Button
            className={`w-100 ${styles.btnFinalizar} ${
              cartItemsArray1.length === 0 ? "disabled" : ""
            }`}
            size="sm"
          >
            Ir a Pagar
          </Button>
        </div>
      </div>
    </>
  );
};

export default ResumeCart;
