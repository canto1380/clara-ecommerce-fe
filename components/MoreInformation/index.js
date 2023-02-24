import Link from "next/link";
import React from "react";
import styles from "./MoreInformation.module.css";

const MoreInformation = () => {
  return (
    <>
      <div>
        <p className={`mb-0 fw-bolder py-2 px-3 ${styles.titleText}`}>
          Informacion
        </p>
      </div>
      <div className={`px-3`}>
        <div className={`${styles.information}`}>
          <p className={`mb-0`}>
            Metodos de pago
          </p>
          <div className={`d-flex justify-content-around my-3 ${styles.box}`}>
            <div className={`me-1 ${styles.containerImg}`}><img className={`${styles.imgCard}`} src={'images/visa.png'}/></div>
            <div className={`me-1 ${styles.containerImg}`}><img className={`${styles.imgCard}`} src={'images/mercadoPago.png'}/></div>
            <div className={`me-1 ${styles.containerImg}`}><img className={`${styles.imgCard}`} src={'images/americanExpress.png'}/></div>
            <div className={`me-1 ${styles.containerImg}`}><img className={`${styles.imgCard}`} src={'images/mastercard.jpg'}/></div>

          </div>
        </div>
        <div className={`${styles.information}`}>
          <Link href='/'>
          <p className={`mb-0`}>
            Envio GRATIS a partir de $25000
          </p>
          </Link>
        </div>
        <div className={`${styles.information}`}>
          <Link href='/'>
          <p className={`mb-0`}>
            Cambio Gratis
          </p>
          </Link>
        </div>
        <div className={`${styles.information}`}>
          <Link href='/'>
          <p className={`mb-0`}>
            Paga en Cuotas
          </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MoreInformation;
