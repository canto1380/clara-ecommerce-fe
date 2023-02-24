import React, { useState } from "react";
import {
  Card,
  Badge,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import styles from "./CardsFootwear.module.css";
import Link from "next/link";
import PreviewFootwear from "components/Modals/PreviewFootwear/PreviewFootwear";


const CardFootwear = ({
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
    idFootwearType: {nameType}
  },
}) => {
  const [sizeSelected, setSizeSelected] = useState(0);
  const [modalLogin, setModalLogin] = useState(false);

  const addFavoritos = () => {
  };

  return (
    <div className={`${styles.containerCard} my-3`}>
      <Card className={`${styles.cardBody}`}>
        <img src={photos[0]} className={`${styles.imgStyle}`} />

        {idDiscount ? (
          <Badge className={`${styles.msgDiscount}`} bg="primary">
            <p className={`px-1 py-1 mb-0`}>
              -{idDiscount.discountPercentage.toFixed(2) * 100}%
            </p>
          </Badge>
        ) : null}
        {neww ? (
          <Badge className={`${styles.msgNew}`} bg="light">
            <p className={`px-1 py-1 mb-0`}>New</p>
          </Badge>
        ) : null}
        <div
          className={`${styles.containerHoverImg} m-0 row justify-content-between`}
        >
          <div className={`col-9 py-2 text-center ${styles.textHoverImg}`}>
            <a
              variant="outline-light"
              className={`p-0 border border-0 ${styles.btnAddFav}`}
              onClick={() => setModalLogin(true)}
              href="#"
            >
              <span>Vista previa</span>
            </a>
            <PreviewFootwear
              show={modalLogin}
              modalLogin={modalLogin}
              // itemCart={itemCart}
              foot={{
                photos,
                nameFootwear,
                totalWithDiscount,
                priceOriginal,
                discountedPrice,
                stock,
                description,
                size,
                idDiscount,
                idColor,
                _id,
                countInStock
              }}
              setModalLogin={setModalLogin}
              onHide={() => setModalLogin(false)}
            />
          </div>

          <div className={`col-3 py-2 text-center ${styles.iconHoverImg}`}>
            <Button
              variant="outline-light"
              className={`p-0 border border-0 ${styles.btnAddFav}`}
              onClick={addFavoritos}
            >
              <span> ()</span>
            </Button>
          </div>
        </div>
        <Link href={`/productos/${(nameType).toLowerCase()}/${(nameFootwear).toLowerCase()}`}>
          <Card.Body className={`${styles.textCard}`}>
            <Card.Title className={``}>{nameFootwear}</Card.Title>
            <div className="d-flex justify-content-between">
              <ButtonGroup className="py-2">
                {idColor?.map((s, i) => {
                  return (
                    <ToggleButton
                      key={i}
                      style={{
                        backgroundColor: `${s.colorCode}`,
                        borderRadius: "50%",
                        border: "1px solid black",
                        width: "10px",
                        height: "20px",
                      }}
                      id={`radio-${i}`}
                      type="radio"
                      variant={"outline-secondary"}
                      className={`mx-1 ${styles.btnColorSizes}`}
                      name="size"
                      value={s?.colorName}
                      // checked={parseFloat(sizeSelected) === s}
                      // onChange={(e) => setSizeSelected(e.currentTarget.value)}
                    ></ToggleButton>
                  );
                })}
              </ButtonGroup>
            </div>

            {idDiscount ? (
              <div className="d-flex justify-content-between">
                <Card.Text className={`fw-bolder mb-2`}>
                  ${totalWithDiscount.toFixed(2)}
                </Card.Text>
                <Card.Text className={`${styles.textDecoration} mb-2`}>
                  ${discountedPrice.toFixed(2)}
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
    </div>
  );
};

export default CardFootwear;
