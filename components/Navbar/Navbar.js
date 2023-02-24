import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "./navabr.module.css";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineSetting,
  AiOutlineSound,
  AiOutlineShopping,
} from "react-icons/ai";
import Login from "../Login/Login";
import { useRouter } from "next/router";
import { deleteToken } from "helpers/helpers";
import CartComponent from "components/Cart/CartNavbar";
import {Cart} from "context/CartProvider";

const NavbarPage = () => {
  const { push } = useRouter();
  const {state, dataCart} = useContext(Cart)

  /**Marcar etiqueta de carrito **/
  const {cart} = state
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const [modalLogin, setModalLogin] = useState(false);

  const [tokenAuth, setTokenAuth] = useState([]);
  const [tokenAuthBan, setTokenAuthBan] = useState(false);
  const [dataAuth, setDataAuth] = useState([]);

  const cerrarSesion = async (e) => {
    deleteToken();
    setTokenAuthBan(false);
    await push("/");
  };

  useEffect(() => {
    setDataAuth(JSON.parse(localStorage.getItem("data-security-page")));
    setTokenAuth(JSON.parse(localStorage.getItem("jwt-security-page")));
  }, [tokenAuthBan]);

const arrayItemCart = Object.values(cart.cartItems);

  useEffect(() => {
    setCartItemsCount(arrayItemCart.reduce((a, c)=> a + c.quantity, 0 ))
  },[cart.cartItems])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className={`${styles.aa}`} href="/">
          <Image
            src="/images/logo.jpg"
            alt="Clara Calzados"
            priority
            height="40"
            width="40"
          />
          {/* </a> */}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className={`d-flex ms-auto col-lg-4 col-md-12 mb-2 mt-4 my-lg-0`}
            role="search"
          >
            <input
              className="form-control"
              type="search"
              placeholder="Que estas buscando?"
              aria-label="Search"
            />
            {/* <button className={`btn btn-outline-light ${styles.btnHidden}`} type="submit">
              Search
            </button> */}
          </form>
          {tokenAuth === null ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item text-center">
                <a
                  onClick={() => setModalLogin(true)}
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  <AiOutlineUser className={styles.sizeIcon} />
                  <p className="my-0">Logn in</p>
                </a>
                <Login
                  tokenAuthBan={tokenAuthBan}
                  setTokenAuthBan={setTokenAuthBan}
                  show={modalLogin}
                  modalLogin={modalLogin}
                  setModalLogin={setModalLogin}
                  onHide={() => setModalLogin(false)}
                />
              </li>
              <li className={`${styles.productItems} nav-item text-center`}>
                <a className={`nav-link ${styles.textPrincipal}`} href="#">
                  <span className="badge rounded-pill text-bg-success">{cartItemsCount}</span>
                  <AiOutlineShoppingCart className={styles.sizeIcon} />
                  <p className="my-0">Mi Carrito</p>
                </a>
                <CartComponent/>
              </li>
            </ul>
          ) : (
            <ul className={`navbar-nav ms-auto ${styles.menuAlign}`}>
              <li className={`nav-item dropdown text-center`}>
                <a
                  className="nav-link"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role="button"
                  href="#"
                >
                  <AiOutlineUser
                    className={`${styles.sizeIcon} ${styles.iconHidden}`}
                  />
                  <p className="my-0">Mi Cuenta</p>
                </a>
                <ul className={`${styles.dropdownAlign} dropdown-menu pt-0`}>
                  <div
                    className={`${styles.dropdownNickname} ${styles.dropdownNickname} px-3 py-3`}
                  >
                    <span>Hola </span>
                    <span className={``}>
                      {dataAuth?.nickname || dataAuth?.name}!
                    </span>
                  </div>
                  <hr className="mt-0" />
                  <li className={`py-1`}>
                    <Link 
                      className="dropdown-item"
                      href={`/${dataAuth?.nickname}/`}
                    >
                      <AiOutlineSetting
                        className={`${styles.sizeIcon} ${styles.dropdownColor} me-2`}
                      />
                      <span className={`fw-bold text-dark`}>Mis datos</span>
                    </Link>
                  </li>
                  <li className={`py-1`}>
                    <a
                      className="dropdown-item"
                      href={`/${dataAuth?.nickname}/compras`}
                    >
                      <AiOutlineShopping
                        className={`${styles.sizeIcon} ${styles.dropdownColor} me-2`}
                      />
                      <span className={`fw-bold text-dark`}>Mis compras</span>
                    </a>
                  </li>
                  <li className={`py-1`}>
                    <a
                      className="dropdown-item"
                      href={`/${dataAuth?.nickname}/notificaciones`}
                    >
                      <AiOutlineSound
                        className={`${styles.sizeIcon} ${styles.dropdownColor} me-2`}
                      />
                      <span className={`fw-bold text-dark`}>
                        Notificaciones
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item dropdown text-center`}
              >
                <a
                  className={`nav-link`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role="button"
                  href="#"
                >
                  <span className="badge rounded-pill text-bg-success">{cartItemsCount}</span>
                  <AiOutlineShoppingCart className={`${styles.sizeIcon} ${styles.iconHidden}`}/>
                  <p className="my-0">Mi Carrito</p>
                </a>
                <CartComponent/>

              </li>
              <li className="nav-item text-center">
                <a
                  onClick={cerrarSesion}
                  className="nav-link"
                  aria-current="page"
                  href="/api/auth/logout"
                >
                  <AiOutlineShoppingCart
                    className={`${styles.sizeIcon} ${styles.iconHidden}`}
                  />
                  <p className="my-0">Salir</p>
                </a>
              </li>
            </ul>
          )}
          {
            // <NavbarSecondary/>
          }
        </div>
      </div>
    </nav>
  );
};

export default NavbarPage;
