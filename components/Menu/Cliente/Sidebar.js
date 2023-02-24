import Link from "next/link";
import styles from "./sidebarCliente.module.css";
import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import {
  BsFillCaretRightFill,
  BsFillCaretLeftFill,
  BsFillBookmarkStarFill,
  BsFillFileEarmarkPersonFill,
  BsFillGeoAltFill
} from "react-icons/bs";

import { RiCoupon3Fill } from 'react-icons/ri'
import { useEffect, useState } from "react";

const Sidebar = ({ inactivo, setInactivo, tokenAuth, dataAuth, setTab }) => {
  const [initial, setInitial] = useState('')

const prueba =(aa) => {
  setTab(aa)
}

  useEffect(() => {
    const a = (dataAuth?.name)?.toUpperCase()
    setInitial(a?.substr(0,1))
  },[dataAuth])
  return (
    <div
      className={`${
        inactivo
          ? `${styles.sidebarInactivo} text-light bg-dark`
          : `${styles.sidebar} text-light bg-dark`
      }

      `}
    >
      <Row
        className={`${
          inactivo
            ? "pt-4 pb-2 d-flex justify-content-center align-items-center m-0"
            : "pt-4 pb-2 d-flex justify-content-center align-items-center m-0"
        }`}
      >
        <Col xs={3} className={` ${
          inactivo
          ? `text-center justify-content-center px-0 ${styles.imgContainer}`
          : `text-center px-0`
        }`}>
          {/* <Image
            src="/images/logo.jpg"
            width="35"
            height="35"
            alt={`${dataAuth?.nickname}`}
            className={`${styles.imgUser}`}
          ></Image> */}
          <div className={`${styles.imgProfile} text-center`}>{initial}</div>
        </Col>
        <Col xs={6} className="px-1">
          <p className={`${inactivo ? `${styles.inactivo}` : "mb-0"}`}>{dataAuth?.nickname}</p>
        </Col>

        {inactivo ? (
          <Col
            xs={12}
            className={`text-light mt-3 btn-menu text-center px-0`}
            onClick={() => setInactivo(!inactivo)}
          >
            {<BsFillCaretRightFill title='Desplegar' className={styles.sizeIcon} />}
          </Col>
        ) : (
          <Col
            xs={2}
            className={`p-0 text-light btn-menu`}
            onClick={() => setInactivo(!inactivo)}
          >
            {<BsFillCaretLeftFill title='Minimizar' className={styles.sizeIcon} />}
          </Col>
        )}
      </Row>
      <hr />
      <ul className="text-decoration-none list-unstyled sidebarList">
        <li
          onClick={() => prueba('informacion')}
          title='Inf. Personal'
          className={`${
            inactivo
              ? `${styles.sidebarListRow} d-flex justify-content-center align-items-center`
              : `${styles.sidebarListRow} d-flex justify-content-start px-3 align-items-center`
          }`}
        >
        <div className=""><BsFillFileEarmarkPersonFill className={styles.sizeIcon} /></div>
              <div className={` ${inactivo ? `${styles.inactivo}` : "ms-3"}`}>
                Informacion Personal
              </div>
        </li>
        <li
          onClick={() => prueba('direccion')}
          title='Direccion'
          className={`${
            inactivo
              ? `${styles.sidebarListRow} d-flex justify-content-center align-items-center`
              : `${styles.sidebarListRow} d-flex justify-content-start px-3 align-items-center`
          }`}
        >
          <div className=""><BsFillGeoAltFill className={styles.sizeIcon} /></div>
              <div className={` ${inactivo ? `${styles.inactivo}` : "ms-3"}`}>
                Direccion Principal
              </div>
        </li>
        <li
        onClick={() => prueba('cupones')}
          title='Cupones'
          className={`${
            inactivo
              ? `${styles.sidebarListRow} d-flex justify-content-center align-items-center`
              : `${styles.sidebarListRow} d-flex justify-content-start px-3 align-items-center`
          }`}
        >
          <div className=""><RiCoupon3Fill className={styles.sizeIcon} /></div>
              <div className={` ${inactivo ? `${styles.inactivo}` : "ms-3"}`}>
                Cupones
              </div>
        </li>
        <li
        onClick={() => prueba('favoritos')}
          title='Favoritos'
          className={`${
            inactivo
              ? `${styles.sidebarListRow} d-flex justify-content-center align-items-center`
              : `${styles.sidebarListRow} d-flex justify-content-start px-3 align-items-center`
          }`}
        >
          <div className=""><BsFillBookmarkStarFill className={styles.sizeIcon} /></div>
              <div className={` ${inactivo ? `${styles.inactivo}` : "ms-3"}`}>
                Favoritos
              </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
