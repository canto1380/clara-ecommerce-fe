import Image from "next/image";
import Layout from "../components/Layout/Layout";
import Script from "next/script";
import Head from "next/head";
import Link from "next/link";
import Profile from "components/Profile";
import { useEffect, useState, useContext, createContext   } from "react";
import { api } from "utils";
import { setToken } from "../helpers/helpers";
import Title from "components/Title";
// import { useUser } from "@auth0/nextjs-auth0";

import Cookies from 'js-cookie'
import { getIdUser, getToken } from "utils/cookies";
import HomeContainer from "components/Home";

export default function Home({ footwearNews, footwearFeatured }) {
  const UserContext = createContext()
  /** Data with auth0 **/
  // const { user, error, isLoading } = useUser();
  const userActive  = useContext(UserContext);

  const [tokenAuth, setTokenAuth] = useState([]);
  const [tokenAuthBan, setTokenAuthBan] = useState(false);

  const handleLogin = async() => {
    const { given_name, family_name, nickname, picture, email } = user
    const handleValues = {
      // name: given_name,
      // surname: family_name,
      // nickname,
      email: 'ata1@gmail.com',
      password: '12345678'
      // avatar: picture
    }
    const res = await api('POST', 'signin', handleValues)
  }


  return (
    <Layout>
      <Title title='Inicio'/>
      <HomeContainer footwearNews={footwearNews} footwearFeatured={footwearFeatured}/>
     

      <Script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
        crossorigin="anonymous"
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
        integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk"
        crossorigin="anonymous"
      ></Script>
    </Layout>
  );
}

export async function getStaticProps({params}) {
  const res = await api('GET', `footwear/footwearNew?limit=8&filterSearch=new`)
  const res1 = await api('GET', `footwear/footwearNew?filterSearch=featured`)
  const footwearNews = res.data
  const footwearFeatured = res1.data

  return {
    props: {
      footwearNews,
      footwearFeatured
    },
    revalidate: 60
  }
}
