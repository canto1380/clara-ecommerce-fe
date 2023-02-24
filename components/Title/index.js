import Head from "next/head";
import { useRouter } from "next/router";

const Title = ({ title, metatitle, metarobots }) => {
  let location = useRouter()
  let params = new URLSearchParams(location.query)
  const url = `${process.env.REACT_APP_API}${location.asPath}`
  return (
    <Head>
      <title>Clara Calzados {title ? `- ${title}` : ''}</title>
      <link rel="icon" href="/images/logo.jpg" />

      {params.has('aoe') ?
        <meta content='noindex, nofollow' name='robots' /> :
        (metarobots ?
          <meta content={metarobots} name='robots' /> :
          <meta content='index, follow' name='robots' />
          )
      }
    </Head>
  );
};

export default Title;
