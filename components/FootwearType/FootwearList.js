import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { api } from "utils";
import axios from "axios";
import styles from "./footwearType.module.css";
import Link from "next/link";
import CardFootwear from "components/Cards/CardFootwear";

const FootwearList = ({
  filterOrder,
  filterSize,
  filterColor,
  data,
  paramsURL,
}) => {
  const [dataFootwear, setDataFootwear] = useState("");
  const [dataQuery, setDataQuery] = useState("");
  // console.log(filterOrder)
  // console.log(filterSize.join())
  // console.log(filterColor)

  

  const listProducts = async () => {
    if (paramsURL === "new") {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API}/footwear/footwearNew?filterSearch=${paramsURL}`,
        params: {
          order: filterOrder,
          filterColor
        },
      });
      const data = res.data;
      setDataQuery(data);
      setDataFootwear(data.allFootwear);
    } else if(paramsURL === 'featured') {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API}/footwear/footwearNew?filterSearch=${paramsURL}`,
        params: {
          order: filterOrder,
        },
      });
      const data = res.data;
      setDataQuery(data);
      setDataFootwear(data.allFootwear);
    } else {
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API}/footwear/productos/${paramsURL}`,
        params: {
          order: filterOrder,
          filterSize
        },
      });
      const data = res.data;
      setDataQuery(data);
      setDataFootwear(data.footwearByType);
    }
  };

  useEffect(() => {
      listProducts();
  }, [ filterColor, filterOrder]);

  const addFavoritos = () => {
  };
  return (
    <div>
      {dataFootwear.length ? (
        <Row className="">
          {dataFootwear?.map((foot) => (
            <Col key={foot._id} xs={12} md={4} xl={3}>
              <CardFootwear foot={foot} />
            </Col>
          ))}
        </Row>
      ) : null}
    </div>
  );
};

export default FootwearList;
