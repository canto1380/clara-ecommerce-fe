import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import { api } from "utils";
import { getLocation } from "utils/queryAPI/location";
import { getProvince } from "utils/queryAPI/province";
import { getCountry } from "utils/queryAPI/country";
import styles from "./MyAddress.module.css";
import { redirectBase } from "helpers/redirect";
import MsjError from "components/MsjError";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MyAddress = ({ dataAuth, tokenAuth }) => {
  const [addAddressBand, setAddAddressBan] = useState(false);
  const [listAddressBand, setListAddressBand] = useState(false);
  const [editAddressband, setEditAddressBand] = useState(false);
  const [newAddress, setNewAddress] = useState({
    as: "",
    nameAddress: "",
    number: "",
    apartament: "",
    idLocation: "",
    idProvince: "",
    idCountry: "",
    cp: "",
    idUser: dataAuth?._id,
  });
  const [address, setAddress] = useState([]);
  const [location, setLocation] = useState([]);
  const [province, setProvince] = useState([]);
  const [country, setCountry] = useState([]);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [validationsError, setValidationsError] = useState(false);
  const [msgValidations, setMsgValidations] = useState("");

  const [errorDelete, setErrorDelete] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [msgDelete, setMsgDelete] = useState("");

  useEffect(() => {
    getAddress();
  }, [listAddressBand]);
  const getAddress = async () => {
    const data = await api("GET", "address", "", tokenAuth);
    if (data.status === 200) {
      const res = data?.data?.allAddress;
      const filterAddress = res.filter((ad) => ad.idUser?._id === dataAuth._id);
      setAddress(filterAddress);
    }
  };

  const params = {
    limit: 1000,
  };
  useEffect(() => {
    getLocations();
    getProvinces();
    getCountries();
  }, []);

  const getLocations = async () => {
    const data = await getLocation(params, tokenAuth);
    setLocation(data);
  };
  const getProvinces = async () => {
    const data = await getProvince(params, tokenAuth);
    setProvince(data);
  };
  const getCountries = async () => {
    const data = await getCountry(params, tokenAuth);
    setCountry(data);
  };

  const handleValues = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const changeBandAdd = () => {
    setAddAddressBan(true);
    setListAddressBand(false);
  };

  const [idEdit, setIdEdit] = useState('')
  const changeBandEdit = (id) => {
    setIdEdit(id)
    setEditAddressBand(true);
    setListAddressBand(false);
    const filter = address.filter((f) => f._id === id);
    setNewAddress({
      ...newAddress,
      as: filter[0].as,
      nameAddress: filter[0].nameAddress,
      number: filter[0].number,
      apartament: filter[0].apartament,
      idLocation: filter[0].idLocation,
      idProvince: filter[0].idLocation?.idProvince?._id,
      idCountry: filter[0].idLocation?.idProvince?.idCountry?._id,
      cp: filter[0].cp,
    });
  };

  const changeFlag = () => {
    setAddAddressBan(false);
    setEditAddressBand(false);
    setListAddressBand(true);
    setNewAddress({
      as: "",
      nameAddress: "",
      number: "",
      apartament: "",
      idLocation: "",
      idProvince: "",
      idCountry: "",
      cp: "",
      idUser: dataAuth?._id,
    });
    setIdEdit('')
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if(addAddressBand) {
      createAddress(e);
    } else {
      handleUpdate(e)
    }

  };
  const createAddress = async (e) => {
    try {
      const res = await api("POST", "address", newAddress, tokenAuth);
      if (res.status === 201) {
        setListAddressBand(true)
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          redirectBase(`${dataAuth?.nickname}`);
        }, 3000);
        e.target.reset();
        setTimeout(() => {
          setAddAddressBan(false);
          setListAddressBand(false)
        }, 3000);
      }
      if (res?.response?.status === 400) {
        const arraysError = res?.response?.data?.errors;
        setMsgError(arraysError);
        setDataError(true);
        setTimeout(() => {
          setDataError(false);
        }, 3000);
      }
    } catch (error) {
      setServerError(true);
      setTimeout(() => {
        setServerError(false);
      }, 3000);
    }
  };
  const handleUpdate = async(e) => {
    try {
      const res = await api("PATCH", `address/${idEdit}`, newAddress, tokenAuth)
      if(res.status === 200) {
        setListAddressBand(true)
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          setEditAddressBand(false)
          setListAddressBand(false)
          redirectBase(`${dataAuth?.nickname}`)
        }, 2000);
        e.target.reset()
      } if(res?.response?.status === 400) {
        const arraysError = res?.response?.data?.errors;
        setMsgError(arraysError);
        setDataError(true);
        setTimeout(() => {
          setDataError(false);
        }, 3000);
      }
    } catch (error) {
      setServerError(true);
      setTimeout(() => {
        setServerError(false);
      }, 3000);
    }
  };

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Esta seguro de eliminar?",
        text: "Una vez eliminada, no se podra recuperar los datos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await api("DELETE", `address/${id}`, "", tokenAuth);
          if (res.status === 200) {
            setMsgDelete(res.data.message);
            setListAddressBand(true);
            setSuccessDelete(true);

            setTimeout(() => {
              setSuccessDelete(false);
            }, 3000);
            setTimeout(() => {
              setListAddressBand(false);
            }, 1000);
          }
          if (res?.response?.status === 400) {
            setErrorDelete(true);
            setTimeout(() => {
              setErrorDelete(false);
            }, 2000);
          }
        }
      });
    } catch (error) {}
  };

  return (
    <Container>
      <Row className={`d-flex justify-content-between align-items-center`}>
        <Col xs={12} md={8} className={`mt-3`}>
          <div className={`pt-4 pb-1 px-4`}>
            <h3>Mis Direcciones</h3>
          </div>
        </Col>
        {editAddressband || addAddressBand ? null : (
          <Col xs={12} md={4} className={`${styles.btnAlign} mt-3 text-end`}>
            <div className={`pt-4 pb-1 px-4`}>
              <Button className={``} onClick={changeBandAdd}>
                {" "}
                {addAddressBand || editAddressband
                  ? "Cancelar"
                  : "Agregar Direccion"}
              </Button>
            </div>
          </Col>
        )}
      </Row>
      <div
        className={`${
          addAddressBand || editAddressband
            ? `mt-2 ${styles.listContainer}`
            : `mt-2`
        }`}
      >
        <ListGroup className={`mt-4`}>
          {address.map((ad) => (
            <ListGroup.Item key={ad._id}>
              <Row className={`align-items-center`}>
                <Col xs={8}>
                  <h5>{ad?.as}</h5>
                  <p className={`mb-0`}>
                    Direccion: {ad?.nameAddress} {ad?.number}{" "}
                    {ad?.apartament !== "" && ad.apartament !== undefined
                      ? `- ${ad?.apartament}`
                      : ""}
                  </p>
                  <p className={`mb-0`}>
                    {ad?.idLocation?.idProvince?.idCountry?.nameCountry} -{" "}
                    {ad?.idLocation?.idProvince?.nameProvince} -{" "}
                    {ad?.idLocation?.nameLocation} - {ad?.cp}
                  </p>
                </Col>
                <Col xs={4} className={`text-end`}>
                  <p>
                    <Button
                      onClick={() => changeBandEdit(ad?._id)}
                      variant="light"
                      className={`p-0 text-secondary ${styles.itemsButton}`}
                    >
                      <MdModeEditOutline className={styles.sizeIcon} />
                    </Button>
                  </p>
                  <p>
                    <Button
                      onClick={() => handleDelete(ad?._id)}
                      variant="light"
                      className={`p-0 text-danger ${styles.itemsButton}`}
                    >
                      <MdDelete className={styles.sizeIcon} />
                    </Button>
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {errorDelete ? (
          <Alert
            className={`text-center ${styles.alertError}`}
            variant="danger"
          >
            No se pudo eliminar la Direccion. Intente luego por favor
          </Alert>
        ) : null}

        {successDelete ? (
          <Alert
            className={`text-center ${styles.alertError}`}
            variant="success"
          >
            {msgDelete}
          </Alert>
        ) : null}
      </div>
      <div
        className={` ${
          addAddressBand || editAddressband
            ? `mt-2`
            : `mt-2 ${styles.formContainer}`
        }`}
      >
        <Form onSubmit={handleSubmit}>
          <Row className={`mt-4 mb-3`}>
            <Col>
              <h4>
                {editAddressband ? `Editar Direccion` : `Nueva Direccion`}
              </h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Alias <span className={`text-danger`}>*</span>
                </Form.Label>
                <Form.Control
                  name="as"
                  size="sm"
                  type="text"
                  placeholder=""
                  defaultValue={newAddress.as}
                  onChange={handleValues}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Direccion <span className={`text-danger`}>*</span>
                </Form.Label>
                <Form.Control
                  name="nameAddress"
                  size="sm"
                  type="text"
                  placeholder=""
                  defaultValue={newAddress.nameAddress}
                  onChange={handleValues}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Numero <span className={`text-danger`}>*</span>
                </Form.Label>
                <Form.Control
                  name="number"
                  size="sm"
                  type="text"
                  placeholder=""
                  defaultValue={newAddress.number}
                  onChange={handleValues}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Piso - Depto</Form.Label>
                <Form.Control
                  name="apartament"
                  size="sm"
                  type="text"
                  placeholder=""
                  defaultValue={newAddress.apartament}
                  onChange={handleValues}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Pais <span className={`text-danger`}>*</span>
                </Form.Label>
                <Form.Select
                  as="select"
                  name="idCountry"
                  size="sm"
                  type="text"
                  placeholder=""
                  selected={
                    newAddress.idLocation?.idProvince?.idCountry?.nameCountry
                  }
                  onChange={handleValues}
                >
                  <option>Seleccione</option>
                  {country?.map((c) => {
                    if (
                      c._id ===
                      newAddress.idLocation?.idProvince?.idCountry?._id
                    ) {
                      return (
                        <option selected key={c._id} value={c?._id}>
                          {c?.nameCountry}
                        </option>
                      );
                    } else {
                      return (
                        <option key={c._id} value={c?._id}>
                          {c?.nameCountry}
                        </option>
                      );
                    }
                  })}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Provincia <span className={`text-danger`}>*</span>
                </Form.Label>
                <Form.Select
                  as="select"
                  name="idProvince"
                  size="sm"
                  type="text"
                  placeholder=""
                  selected={newAddress.idLocation?.idProvince?.nameProvince}
                  onChange={handleValues}
                >
                  <option>Seleccione</option>

                  {province?.map((p) => {
                    if (p?.idCountry?._id === newAddress?.idCountry) {
                      if( p._id === newAddress.idLocation?.idProvince?._id) {
                        return (
                          <option selected key={p._id} value={p._id}>
                            {p?.nameProvince}
                          </option>
                        );
                      } else {
                        return (
                          <option key={p._id} value={p._id}>
                            {p?.nameProvince}
                          </option>
                        )
                      }
                    }
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Localidad <span className={`text-danger`}>*</span>
                </Form.Label>
                <Form.Select
                  as="select"
                  name="idLocation"
                  size="sm"
                  type="text"
                  placeholder=""
                  selected={newAddress.idLocation?.nameLocation}
                  onChange={handleValues}
                >
                  <option>Seleccione</option>
                  {location?.map((l) => {
                    if (l?.idProvince?._id === newAddress?.idProvince) {
                      if(l._id === newAddress?.idLocation?._id) {
                        return (
                          <option selected key={l._id} value={l?._id}>
                            {l.nameLocation}
                          </option>
                        );

                      }
                      else {
                        return (
                          <option key={l._id} value={l?._id}>
                            {l.nameLocation}
                          </option>
                        );
                    }

                    }
                  })}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Codigo Postal <span className={`text-danger`}>*</span>
                </Form.Label>
                <Form.Control
                  name="cp"
                  size="sm"
                  type="text"
                  placeholder=""
                  defaultValue={newAddress.cp}
                  onChange={handleValues}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-end">
            <Col className={`text-end`}>
              <Button variant="secondary" onClick={changeFlag}>
                Cancelar
              </Button>
            </Col>
            <Col>
              {loading ? (
                <Button variant="success" type="submit" className={``}>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Guardando</span>
                </Button>
              ) : (
                <Button variant="success" type="submit" className={``}>
                  { addAddressBand ? `Guardar` : `Actualizar`}
                </Button>
              )}
            </Col>
          </Row>
          {dataError
            ? msgError.map((e, i) => <MsjError key={i} text2={e.msg} />)
            : null}
          {validationsError ? <MsjError text2={msgValidations} /> : null}
          {serverError ? <MsjError text2="Server internal Error" /> : null}
        </Form>
      </div>
    </Container>
  );
};

export default MyAddress;
