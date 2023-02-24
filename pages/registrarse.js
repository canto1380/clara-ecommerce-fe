import Layout from "components/Layout/Layout";
import MsjError from "components/MsjError";
import Title from "components/Title";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { api } from "utils";
import styles from "../styles/Registrarse.module.css";
import { validaEmail, validaClave } from "utils/validations/validations";
import { redirectBase } from "helpers/redirect";
import { Toast } from "utils/msgSuccess";

const registrarse = () => {
  const [loading, setLoading] = useState(false);
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    birthdate: "",
  });
  const [newsletter, setNewsLetter] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [validationsError, setValidationsError] = useState(false);
  const [msgValidations, setMsgValidations] = useState("");

  const handleValues = (e) => {
    const { name, value } = e.target;
    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      validaEmail(userRegistration.email) &&
      validaClave(userRegistration.password)
    ) {
      await createUser(e);
    } else {
      setMsgValidations("Verifique los datos ingresados");
      setValidationsError(true);
      setTimeout(() => {
        setValidationsError(false);
      }, 5000);
    }
  };
  const createUser = async (e) => {
    try {
      const newUser = {
        name: userRegistration.name,
        surname: userRegistration.surname,
        email: userRegistration.email,
        password: userRegistration.password,
        phone: userRegistration.phone,
        birthdate: userRegistration.birthdate,
        newsletter: newsletter,
      };
      const res = await api(
        "POST",
        "users/createUser",
        newUser
      );
      if (res.status === 201) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          redirectBase('');
        }, 3000);
        setTimeout(() => {
          Toast.fire({
            icon: 'success',
            title: 'Register in successfully'
          })
        }, 3000);
        e.target.reset();
      }
      if (res?.response?.status === 400) {
        const arrayErrors = res?.response?.data?.errors;
        setMsgError(arrayErrors);
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
  return (
    <Layout>
      <Title title="Registrarse" />

      <Container className={`${styles.paddingContainer}`}>
        <Row className="justify-content-center">
          <Col lg="6" className={`px-0 ${styles.colContainer}`}>
            <div className={`text-center py-3 ${styles.titleContainer}`}>
              <h3>CREAR CUENTA</h3>
            </div>
            <Form className="px-3 py-3" onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Nombre <span className={`text-danger`}>*</span>
                    </Form.Label>
                    <Form.Control
                      name="name"
                      size="sm"
                      type="text"
                      placeholder=""
                      onChange={handleValues}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      Apellido <span className={`text-danger`}>*</span>
                    </Form.Label>
                    <Form.Control
                      name="surname"
                      size="sm"
                      type="text"
                      placeholder=""
                      onChange={handleValues}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Email <span className={`text-danger`}>*</span>
                    </Form.Label>
                    <Form.Control
                      name="email"
                      size="sm"
                      type="email"
                      minLength="13"
                      maxLength="60"
                      placeholder=""
                      onChange={handleValues}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      Clave <span className={`text-danger`}>*</span>
                    </Form.Label>
                    <Form.Control
                      name="password"
                      size="sm"
                      minLength="8"
                      maxLength="16"
                      type="password"
                      placeholder=""
                      onChange={handleValues}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control
                      name="phone"
                      size="sm"
                      type="text"
                      placeholder=""
                      onChange={handleValues}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Fecha Nacimiento</Form.Label>
                    <Form.Control
                      name="birthdate"
                      size="sm"
                      type="date"
                      placeholder=""
                      onChange={handleValues}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Suscribirme a newsletter"
                    name="newsletter"
                    onChange={() => setNewsLetter(!newsletter)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <p className={`${styles.mandatoryMsg}`}>
                  <span className={`text-danger`}>(*)</span>Datos obligatorios
                </p>
              </Row>

              {loading ? (
                <Button variant="secondary" className={`w-100`} disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span>Loading...</span>
                </Button>
              ) : (
                <Button variant="secondary" className={`w-100`} type="submit">
                  Registrarse
                </Button>
              )}
              {dataError
                ? msgError.map((e, i) => (
                    <Alert
                      key={i}
                      className={`text-center my-3`}
                      variant="danger"
                    >
                      {e.msg}
                    </Alert>
                  ))
                :
                  null}
              {validationsError ? <Alert className={`text-center`} variant='danger'>{msgValidations}</Alert> : null}
              {serverError ? <Alert className={`text-center`} variant='danger'>Server internal Error</Alert>: null}
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default registrarse;
