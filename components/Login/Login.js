import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import styles from "./loginModal.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { validaEmail, validaClave } from "../../utils/validations/validations";
import MsjError from "../MsjError";
import { setDataToken, setToken } from "../../helpers/helpers";
import { redirectBase } from "helpers/redirect";
import loginn from "utils/authentication/login";
import Cookies from "js-cookie";

export const COOKIES = {
  authToken: 'token',
  authId: 'idUser'
}

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const {
    modalLogin,
    setTokenAuth,
    tokenAuthBan,
    setTokenAuthBan,
    setModalLogin,
    ...rest
  } = props;
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [dataError, setDataError] = useState(false);
  const [msgDataError, setMsgDataError] = useState("");
  const [errorValid, setErrorValid] = useState(false);
  const [errorServer, setErrorServer] = useState(false);

  const handleValues = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validaEmail(userLogin.email) && validaClave(userLogin.password)) {
        login(e);
      } else {
        setErrorValid(true);
        setTimeout(() => {
          setErrorValid(false);
        }, 3000);
      }
    } catch (error) {
      setErrorServer(true);
      setTimeout(() => {
        setErrorServer(false);
      }, 3000);
    }
  };
  const login = async (e) => {
    try {
      const res = await loginn(userLogin)
      if (res.status === 200) {
        const {token, user: {_id}} = res.data
        Cookies.set(COOKIES.authToken, token, process.env.REACT_APP_API,{ expires: 1 })
        Cookies.set(COOKIES.authId, _id, process.env.REACT_APP_API, { expires: 1 })
        setToken(res?.data?.token);
        setDataToken(res?.data?.user);

        setLoading(true);
        setTimeout(() => {
          e.target.reset();

          setLoading(false);
        }, 3000);
        setTimeout(() => {
          setTokenAuthBan(true);
          setModalLogin(false);
          redirectBase("");

        }, 3000);
      }
      if (res?.response?.status === 404) {
        setDataError(true);
        setMsgDataError(res?.response?.data?.error);
        setTimeout(() => {
          setDataError(false);
        }, 3000);
      }
    } catch (error) {}
  };

  return (
    <Modal {...rest} size="md" aria-labelledby="contained-modal-title-vcenter">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark" id="contained-modal-title-vcenter">
            <h3>Iniciar Sesion</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold">Email</Form.Label>
            <Form.Control
              onChange={handleValues}
              type="email"
              name="email"
              minLength="13"
              maxLength="60"
              placeholder="mail@dominio.com"
              // onBlur={validarNombreLocalidad}
              // isInvalid={noValidaNombre}
              // isValid={validaNombre}
            />
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Campo Obligatorio, al menos debe contener entre 4 - 40 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-bold">Clave</Form.Label>
            <Form.Control
              onChange={handleValues}
              type="password"
              name="password"
              minLength="8"
              maxLength="16"
              // onBlur={validaClave}
              // isInvalid={!validaClave(userLogin.clave)}
              // isValid={validaClave(userLogin.clave)}
            ></Form.Control>
            <Form.Control.Feedback type="invalid" className="text-danger small">
              Debe ser entre 8 y 20 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <Button disabled variant="success" type="submit">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className='ms-2'>logging in</span>
            </Button>
          ) : (
            <Button variant="success" type="submit">
              Log in
            </Button>
          )}

          <Button variant="secondary" onClick={props.onHide}>
            Cancelar
          </Button>
        </Modal.Footer>
        {errorValid ? (
          <MsjError
            text1="Datos incorrectos"
            text2="Todos los campos son obligatorios."
          />
        ) : null}
        {dataError ? (
          <MsjError text1="Datos incorrectos" text2={msgDataError} />
        ) : null}
        {errorServer ? (
          <MsjError
            text1="Hubo un problema en el servidor"
            text2="Intente mas tarde"
          />
        ) : null}
      </Form>
      <hr className="mt-2" />
      <div className="text-center mb-3">
        <p>
          No estas registrado?{" "}
          <Link className={styles.btnRegistrarse} href="/registrarse">
            Registrate!
          </Link>
        </p>
      </div>
    </Modal>
  );
};

export default Login;
