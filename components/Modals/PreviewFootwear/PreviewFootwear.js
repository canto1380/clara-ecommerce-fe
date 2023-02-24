import { useState } from "react";
import {
  Modal,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Link } from "next/link";
import styles from "./preview.module.css";
import CarouselImg from "./CarouselImg";
import { setCartData, getCartData } from "helpers/helpers";
import { redirectBase } from "helpers/redirect";
import { useContext } from "react";
import { Cart } from "context/CartProvider";

const PreviewFootwear = (props) => {
  const { state, dispatch } = useContext(Cart);

  const { modalLogin, setModalLogin, foot, ...rest } = props;
  const [sizeSelected, setSizeSelected] = useState(0);
  const [colorSelected, setColorSelected] = useState(0);
  const [quantitySelected, setQuantitySelected] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const addItemCart = () => {
    foot.sizeSelected = sizeSelected;
    foot.colorSelected = colorSelected;
    foot.quantity = quantitySelected;

    const arrayItemCart = Object.values(state.cart.cartItems);
    const existsItem = arrayItemCart.find((x) => x._id === foot._id);
    const quantity = existsItem ? existsItem.quantity + 1 : 1;
    
    if(foot.countInStock < quantity) {
      alert('Disculpa, no hay stock disponible')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      dispatch({ type: "CARD_ADD_ITEM", payload: { ...foot, quantity } });
      setModalLogin(false)
    }, 2000);
  };

  return (
    <Modal
      {...rest}
      centered
      size="xl"
      className={styles.modalPreview}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Container className={`px-4 py-3 ${styles.sizeModal}`}>
        <Row className={`h-100`}>
          <Col xs={12} lg={8} className="border border-2 px-0">
            <CarouselImg photos={foot?.photos} />
          </Col>
          <Col xs={12} lg={4} className="">
            <h4>{foot?.nameFootwear}</h4>
            <p>{foot?.description}</p>
            {foot?.idDiscount ? (
              <div className={`d-flex justify-content-between`}>
                <span className={`fw-bolder`}>
                  ${foot?.totalWithDiscount.toFixed(2)}
                </span>
                <span className={`${styles.textDecoration}`}>
                  ${foot?.priceOriginal.toFixed(2)}
                </span>
              </div>
            ) : (
              <p>{foot?.priceOriginal.toFixed(2)}</p>
            )}
            <p className={`mb-0 mt-2`}>Talles disponibles</p>
            <ButtonGroup>
              <Row className={`p-1`}>
                {foot?.size.map((s, i) => (
                  <Col xs={2} lg={3} key={i + 2} className={`p-2 pt-0 my-1`}>
                    <ToggleButton
                      id={`radio-${i + 2}`}
                      type="radio"
                      variant={"outline-secondary"}
                      className={`w-100 ${styles.btnSizes}`}
                      name="size"
                      value={s}
                      checked={parseFloat(sizeSelected) === s}
                      onChange={(e) => setSizeSelected(e.currentTarget.value)}
                    >
                      {s}
                    </ToggleButton>
                  </Col>
                ))}
              </Row>
            </ButtonGroup>
            {foot?.idColor ? (
              <>
                <p className={`mb-0`}>Colores disponibles</p>
                <div className="d-flex justify-content-between mb-4">
                  <ButtonGroup className="py-2 align-items-center">
                    {foot?.idColor?.map((s, i) => (
                      <ToggleButton
                        key={i}
                        style={{
                          backgroundColor: `${s.colorCode}`,
                          filter: "opacity(20)",
                          borderRadius: "50%",
                          border: `0px solid ${s.colorCode}`,
                          width: "25px",
                          height: "25px",
                        }}
                        id={`radio1-${i}`}
                        type="radio"
                        className={`mx-1 ${styles.btnColor} ${
                          colorSelected === s?.colorName
                            ? `${styles.selectColor}`
                            : ""
                        }`}
                        name="colorSelected"
                        value={s?.colorName}
                        checked={colorSelected === s?.colorName}
                        onChange={(e) =>
                          setColorSelected(e.currentTarget.value)
                        }
                      ></ToggleButton>
                    ))}
                  </ButtonGroup>
                </div>
              </>
            ) : null}
            <div>
              {loading ? (
                <Button
                  onClick={addItemCart}
                  className={`w-100 ${styles.btnAdd}`}
                  disabled
                >
                  <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className='ms-2'>Agregando</span>
                </Button>
              ) : (
                <Button
                  onClick={addItemCart}
                  className={`w-100 ${styles.btnAdd} ${
                    sizeSelected === 0 || colorSelected === 0 ? "disabled" : ""
                  }`}
                >
                  Añadir al Carrito!
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};
export default PreviewFootwear;
