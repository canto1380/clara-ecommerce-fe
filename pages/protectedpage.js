import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const protectedpage = () => {
  return (
    <div>
      PAGINA PROTEGIDA!!
    </div>
  );
};

export default protectedpage;

export const getServerSideProps = withPageAuthRequired()
