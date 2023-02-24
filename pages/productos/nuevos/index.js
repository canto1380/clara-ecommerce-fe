import FilterMenu from "components/FootwearType/FilterMenu";
import FilterOrder from "components/FootwearType/FilterOrder";
import FootwearList from "components/FootwearType/FootwearList";
import TitleFootwearSection from "components/FootwearSection/TitleFootwearSection";
import Layout from "components/Layout/Layout";
import Title from "components/Title";
import React, { useState, useEffect } from "react";
import { api } from "utils";
import { Col, Container, Row, Toast } from "react-bootstrap";
import styles from "../../../components/FootwearType/footwearType.module.css";

const Nuevos = ({ footwearNews }) => {
  const [filterOrder, setFilterOrder] = useState(0);
  const [filterColor, setFilterColor] = useState([]);
  const [filterSize, setFilterSize] = useState([]);
  // console.log(filterColor)
  // console.log(filterSize)
  // const handleSize = (s) => {
  //   console.log(s)

  //   setFilter(filterSize.filter((ss) => ss != s));
  // }

  useEffect(() => {
  }, [filterSize]);

  return (
    <Layout>
      <Title title="Productos Nuevos" />
      <TitleFootwearSection data={footwearNews} title="Nuevos Lanzamientos" />

      <Container>
        <Row>
          <p className={`${styles.titleFilter} pt-4 mb-0`}>Filtros</p>
          <Col xs={12} className={`pt-1 pb-2 py-3`}>
            <FilterMenu
              filterColor={filterColor}
              setFilterColor={setFilterColor}
              filterSize={filterSize}
              setFilterSize={setFilterSize}
              data={footwearNews?.allFootwear}
            />
          </Col>

          {filterSize.length > 0 ? (
            <div
              className={`d-flex justify-content-start pb-4 ${styles.flexFilterLabel}`}
            >
              <p className={`${styles.titleFilter1} my-0 me-2`}>
                Filtros seleccionados:
              </p>
              {filterSize?.map((s, i) => (
                <div key={i} className={`ps-1 ${styles.filterLabel} me-2 mb-1`}>
                  <span className={`${styles.filterLabelText}`}>
                    Talle: {s}
                  </span>
                  <span>
                    <button
                      className={`btn btn-outline-secondary ${styles.filterLabelBtn}`}
                      onClick={() => {
                        handleSize(s);
                      }}
                    >
                      X
                    </button>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </Row>
        <Row>
          <Col xs={12} className="pt-1 pb-4 py-3">
            <FilterOrder setFilterOrder={setFilterOrder} />
          </Col>
        </Row>
        <hr />
        <Row className="px-5">
          <Col xs={12} className={`px-2 py-3`}>
            <FootwearList
              paramsURL="new"
              filterOrder={filterOrder}
              filterSize={filterSize}
              filterColor={filterColor}
              data={footwearNews?.allFootwear}
            />
          </Col>
        </Row>
      </Container>

    </Layout>
  );
};

export default Nuevos;

export async function getStaticProps({ params }) {
  const res = await api("GET", `footwear/footwearNew?filterSearch=new`);
  const footwearNews = res.data;

  return {
    props: {
      footwearNews,
    },
    revalidate: 60,
  };
}
