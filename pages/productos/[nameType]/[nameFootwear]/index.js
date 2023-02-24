import Layout from "components/Layout/Layout";
import ProductImage from "components/Product/ProductImage";
import Title from "components/Title";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { api } from "utils";
import { getFootwear } from "utils/queryAPI/footwearName.js";

const footwearName = ({ data, paramsURL }) => {
  return (
    <Layout>
      <Title title={`${data[0].nameFootwear ? data[0].nameFootwear : 'Producto'}`}/>
      <hr/>
      <Container className={`px-3`}>
        <Row className={`d-flex justify-content-between`}>
          <Col xs={12} lg={7} className={`border border-1 px-0`}>
            <ProductImage data={data} />
          </Col>
          <Col xs={12} lg={4} className={`border border-1 px-0`}>
            
          </Col>
        </Row>
      </Container>
    </Layout>
  )
};

export async function getStaticProps({ params }) {
  const paramsURL =
    params.nameFootwear[0].toUpperCase() + params.nameFootwear.slice(1);
  const res = await api("GET", `footwear/producto/${paramsURL}`);
  const data = res.data;
  return {
    props: {
      data,
      paramsURL,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const footwearName = await getFootwear();
  const paths = footwearName.map((params) => ({ params }));
  return { fallback: "blocking", paths };
}
export default footwearName;
