import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/sandstone/bootstrap.min.css";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import CartProvider from "context/CartProvider";


function MyApp({ Component, pageProps }) {
  return (
    // <UserProvider>
    <CartProvider>
      <Component {...pageProps} />

    </CartProvider>
    // </UserProvider>
  );
}

export default MyApp;
