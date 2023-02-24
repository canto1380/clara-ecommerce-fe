import { useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import styles from "./NavbarSecondary.module.css";
import { getFootwearType } from "utils/queryAPI/footwearTypes";
import { api } from "utils";
import Link from "next/link";

const NavbarSecondary = ({ tokenAuth }) => {

  const [activeBand, setActiveband] = useState(0);
  const [footwearTypes, setFootwearTypes] = useState([]);

  useEffect(() => {
    getTypeFootwear();
  }, [tokenAuth]);

  const getTypeFootwear = async () => {
    const data = await getFootwearType();
    setFootwearTypes(data);
  };
  return (
    <Nav
      className={`justify-content-center ${styles.navbarSecondary} ${styles.alignItems}`}
      activeKey="/home"
    >
      <Nav.Item>
        <Nav.Link
          className={`${styles.textPrincipal} ${
            activeBand === 0 ? `${styles.btnActive}` : ``
          }`}
          href="/"
          onClick={() => setActiveband(0)}
        >
          INICIO
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className={`${styles.productItems}`}>
        <Nav.Link
          onClick={() => setActiveband(1)}
          className={`${styles.textPrincipal} ${
            activeBand === 1 ? `${styles.btnActive}` : ``
          }`}
          eventKey="link-1"
        >
          PRODUCTOS
        </Nav.Link>

        <div className={`${styles.productItemsPosition}`}>
          <ul className={`${styles.nav}`}>
            {footwearTypes?.map((foot) => (
                <Link key={foot._id} href={`/productos/${(foot.nameType).toLowerCase()}`}>
              <li>
                {foot?.nameType}
              </li>
                </Link>
            ))}

          </ul>
        </div>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          onClick={() => setActiveband(2)}
          className={`${styles.textPrincipal} ${
            activeBand === 2 ? `${styles.btnActive}` : ``
          }`}
          eventKey="link-2"
        >
          ENVÍOS
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => setActiveband(3)}
          className={`${styles.textPrincipal} ${
            activeBand === 3 ? `${styles.btnActive}` : ``
          }`}
          eventKey="link-2"
        >
          POLÍTICA DE CAMBIOS
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => setActiveband(4)}
          className={`${styles.textPrincipal} ${
            activeBand === 4 ? `${styles.btnActive}` : ``
          }`}
          eventKey="link-2"
        >
          CONTACTO
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavbarSecondary;
