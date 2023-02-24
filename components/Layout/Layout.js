import NavbarSecondary from "components/NavbarSecundario/NavbarSecondary";
import { useEffect, useState } from "react";
import { getToken } from "utils/cookies";
import NavbarPage from "../Navbar/Navbar";

const Layout = ({children , home}) => {
  const [tokenAuth, setTokenAuth] = useState()
  useEffect(()=> {
    const tokenData =  getToken()
    setTokenAuth(tokenData)
  },[])
  return (
    <>
      <NavbarPage />
      {home ? (
        null
      ) : (
      <NavbarSecondary tokenAuth={tokenAuth}/>
      )}
      <main>{children}</main>
    </>
  );
};


export default Layout
