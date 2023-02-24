import FilterMenu from "components/FootwearType/FilterMenu";
import FilterOrder from "components/FootwearType/FilterOrder";
import FootwearList from "components/FootwearType/FootwearList";
import TitleFootwearSection from "components/FootwearSection/TitleFootwearSection";
import Layout from "components/Layout/Layout";
import Title from "components/Title";
import React, { useState } from "react";
import { api } from "utils";
import { Col, Container, Row } from "react-bootstrap";

const Nuevos = ({ footwearFeatured }) => {
  const [filterOrder, setFilterOrder] = useState(0);
  const [filterColor, setFilterColor] = useState([]);
  const [filterSize, setFilterSize] = useState([]);

  return (
    <Layout>
      <Title title="Productos Destacados" />
      <TitleFootwearSection data={footwearFeatured} title='Productos Destacados' />

      <Container fluid>
        <Row>
          <Col xs={12} className="px-5 py-3">
            <FilterOrder setFilterOrder={setFilterOrder} />
          </Col>
        </Row>
        <Row className="px-5">
          <Col sm={3} className={`px-2 py-3`}>
            <FilterMenu
              filterColor={filterColor}
              setFilterColor={setFilterColor}
              filterSize={filterSize}
              setFilterSize={setFilterSize}
              data={footwearFeatured?.allFootwear}
            />
          </Col>
        <Col sm={9} className={`px-2 py-3`}>
            <FootwearList
              paramsURL='featured'
              filterOrder={filterOrder}
              filterSize={filterSize}
              filterColor={filterColor}
              data={footwearFeatured?.allFootwear}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Nuevos;

export async function getStaticProps({ params }) {
  const res = await api("GET", `footwear/footwearNew?filterSearch=featured`);
  const footwearFeatured = res.data;

  return {
    props: {
      footwearFeatured,
    },
    revalidate: 60,
  };
}
