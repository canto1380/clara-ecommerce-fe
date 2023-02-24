import React from "react";
import {
  Card,
  Badge,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import Link from "next/link";
import styles from './betteroptions.module.css'

const CardBetterOption = ({
  foot: {
    _id,
    photos,
    description,
    idDiscount,
    nameFootwear,
    idColor,
    totalWithDiscount,
    priceOriginal,
    discountedPrice,
    stock,
    size,
    new: neww,
    countInStock,
  },
}) => {
  return (
    <>
      <Card className={`${styles.cardBody}`}>
        <img src={photos[0]} className={`${styles.imgStyle}`} />

        <Link href="/">
          <Card.Body className={`${styles.textCard}`}>
            <Card.Title className={``}>{nameFootwear}</Card.Title>
            {idDiscount ? (
              <div className="d-flex justify-content-between">
                <Card.Text className={`fw-bolder mb-2`}>
                  ${totalWithDiscount.toFixed(2)}
                </Card.Text>
              </div>
            ) : (
              <Card.Text className={`fw-bolder mb-2`}>
                ${priceOriginal.toFixed(2)}
              </Card.Text>
            )}
            {stock === 0 ? (
              <div className={`text-center`}>
                <p className={`text-center`}>
                  <span
                    className={`border border-1 px-2 py-1 ${styles.msgStock}`}
                  >
                    SIN STOCK
                  </span>
                </p>
              </div>
            ) : null}
          </Card.Body>
        </Link>
      </Card>
    </>
  );
};

export default CardBetterOption;
