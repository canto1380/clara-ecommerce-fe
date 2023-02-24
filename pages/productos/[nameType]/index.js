import FilterMenu from "components/FootwearType/FilterMenu";
import FilterOrder from "components/FootwearType/FilterOrder";
import FootwearList from "components/FootwearType/FootwearList";
import TitleFootwear from "components/FootwearType/TitleFootwear";
import Layout from "components/Layout/Layout";
import Title from "components/Title";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { api } from "utils";
import { getFootwearType } from "utils/queryAPI/footwearTypes";
import styles from '../../../components/FootwearType/footwearType.module.css'

const footwearTypes = ({ data, paramsURL }) => {
  const [filterOrder, setFilterOrder] = useState(0);
  const [filterColor, setFilterColor] = useState([]);
  const [filterSize, setFilterSize] = useState([]);

  const [aaa, setAaa] = useState("");


  return (
    <Layout>
      <Title title="Productos" />
      <TitleFootwear data={data} />


      <Container>
        <Row>
          <p className={`${styles.titleFilter} pt-4 mb-0`}>Filtros</p>
          <Col xs={12} className={`pt-1 pb-2 py-3`}>
            <FilterMenu
              filterColor={filterColor}
              setFilterColor={setFilterColor}
              filterSize={filterSize}
              setFilterSize={setFilterSize}
              data={data?.footwearByType}
              setAaa={setAaa}
              aaa={aaa}
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
          <Col xs={12} className={`pt-1 pb-4 py-3`}>
            <FilterOrder setFilterOrder={setFilterOrder} />
          </Col>
          </Row>
          <hr/>
          <Row className="px-5">
          <Col xs={12} className={`px-2 py-3`}>
          <FootwearList
              paramsURL={paramsURL}
              filterOrder={filterOrder}
              filterSize={filterSize}
              filterColor={filterColor}
              aaa={aaa}
              data={data?.footwearByType}
            />
            </Col>
        </Row>

      </Container> 
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const paramsURL = params.nameType[0].toUpperCase() + params.nameType.slice(1);
  const res = await api("GET", `footwear/productos/${paramsURL}`);
  const data = res.data;
  const data1 = data.footwearByType;
  if (data1.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
        // statusCode: 301
      },
    };
  }
  return {
    props: {
      data,
      paramsURL,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const footwearTypes = await getFootwearType();

  const paths = footwearTypes.map((params) => ({ params }));
  return { fallback: "blocking", paths };
}

export default footwearTypes;
