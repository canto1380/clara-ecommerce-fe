import Layout from "components/Layout/Layout";
import MyAddress from "components/Menu/Cliente/MyAddress";
import PersonalInfo from "components/Menu/Cliente/PersonalInfo";
import Sidebar from "components/Menu/Cliente/Sidebar";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { api } from "utils";
import styles from '../../components/Menu/Cliente/sidebarCliente.module.css'
import { getToken, getIdUser } from "utils/cookies";

const misDatos = ({userInfo}) => {
  const [inactivo, setInactivo] = useState(false);
  const [tokenAuth, setTokenAuth] = useState([])
  const [dataAuth, setDataAuth] = useState([])
  const [tab, setTab] = useState('informacion')


  useEffect(() => {
    const tokenData = getToken()
    setTokenAuth(tokenData)
    // if(localStorage.getItem('jwt-security-page')) {
    //   setDataAuth(JSON.parse(localStorage.getItem('data-security-page')))
    //   setTokenAuth(JSON.parse(localStorage.getItem('jwt-security-page')))
    // }
  }, [])

  return (
    <Layout home>
      <Title title="Perfil" />
      <Container fluid className="app p-0 d-flex justify-content-start">

        <Sidebar setTab={setTab} inactivo={inactivo} setInactivo={setInactivo} tokenAuth={tokenAuth} dataAuth={userInfo}/>
      {
        tab === 'informacion' &&
        <div className={`${
          inactivo
            ? `${styles.parte2Inactivo}`
            : `${styles.parte2}`
        } `}>
        <PersonalInfo tokenAuth={tokenAuth} dataAuth={userInfo} setTab={setTab}/>
      </div>
      }
      {
        tab === 'direccion' &&
        <div className={`${
          inactivo
            ? `${styles.parte2Inactivo}`
            : `${styles.parte2}`
        } `}>
        <MyAddress tokenAuth={tokenAuth} dataAuth={userInfo} setTab={setTab}/>
      </div>
      }

      </Container>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const token = getToken(ctx)
  const idUser = getIdUser(ctx)
  const res = await api ('GET', `users/${idUser}`, '', token)
  if(res?.status === 200) {
    const { data } = res
    return {
      props: {
        userInfo: data
      }
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}

export default misDatos;
