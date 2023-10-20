import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const URL_DE_BASE = `arrondissement/`;
let isValidate = false;
let i = 0;

export default function ModalEdition(props) {
  //#region // MES VARIABLES
  const identifiant = props.children;
  const u_info = getDataUtilisateur() 
  const [inputs, setInputs] = useState({
    idArrondissement: "",
    nomArrondissement: "",
    adressArrondissement: "",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    idArrondissement: "",
    adressArrondissement: "Adresse de l'arrondissement obligatoire",
    nomArrondissement: "Nom de l'arrondissement obligatoire",
    messageErreur: "Aucune modification apercu",
  });
  //#endregion

  //#region // RECUPERER UN Arrondissement
  // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (props.showEdit && i === 0) {
    if (i !== 0) {
      break;
    }
    getOneUser(identifiant);
    i = 1;
  }

  function getOneUser(xid) {
    axios.get(URL_DE_BASE + `${xid}`, u_info.opts).then(function (response) {
      setInputs(response.data[0]);
    });
  }
  //#endregion

  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = (identifiant) => {
    axios
      .put(URL_DE_BASE + `${identifiant}`, inputs, u_info.opts)
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Modificatoin Reussi.");
          onClose();
        } else {
          toast.error("Echec de la Modification!");
        }
      });
  };
  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    isValidate = true;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, messageErreur: false }));

    if (value.length === 0) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " obligatoire",
      }));
    } else if (value.length < 4) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " trop court",
      }));
    } else if (value.length > 20) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " trop long",
      }));
    } else {
      isValidate = true;
      setErreurs((values) => ({ ...values, [name]: false }));
      setMessages((values) => ({ ...values, [name]: "" }));
    }
  };
  //#endregion

  //#region //VALIDATION FORMULAIRE
  const validation = (event, identifiant) => {
    event.preventDefault();
    // isValidate = true;

    const inputsArray = Object.keys(inputs);
    inputsArray.forEach((element) => {
      const eString = inputs[element].toString();

      if (eString.length === 0) {
        setErreurs((values) => ({ ...values, [element]: true }));
        isValidate = false;
      }
    });

    if (isValidate) {
      onSubmit(identifiant);
    } else{
      
      setErreurs((values) => ({ ...values, messageErreur: true }));
    }
  };
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
  function onClose() {
    props.onHide();
    i = 0;

    const inputsArray = Object.keys(inputs);

    inputsArray.forEach((element) => {
      setInputs((values) => ({ ...values, [element]: "" }));
      inputs[element] = "";
      isValidate = false;
      setErreurs((values) => ({ ...values, [element]: false }));
    });
  }
  //#endregion

  //#region // RENDU HTML DU MODAL AJOUT
  return (
    <>
      <Modal
        size="md"
        show={props.showEdit}
        onHide={props.closeEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-primary h5 md-6">
            Edition Arrondissement : {identifiant}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              hidden={true}
            >
              <Form.Control
                type="text"
                name="idArrondissement"
                onChange={handleChange}
                value={inputs.idArrondissement}
                placeholder="Identifiant de l'Arrondissement"
                autoComplete="off"
                autoFocus
                disabled={true}
                hidden={true}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>- Nom de l'Arrondissement : </Form.Label>
              <Form.Control
                type="text"
                name="nomArrondissement"
                onChange={handleChange}
                value={inputs.nomArrondissement}
                placeholder="Nom de l'Arrondissement"
                autoComplete="off"
                autoFocus
              />
              <small className="text-danger d-block">
                {erreurs.nomArrondissement ? messages.nomArrondissement : null}
              </small>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>- Adress de l'Arrondissement : </Form.Label>
              <Form.Control
                type="text"
                name="adressArrondissement"
                onChange={handleChange}
                value={inputs.adressArrondissement}
                autoComplete="off"
                placeholder= "Entrer l'adress d'Arrondissement"
                
              />
              <small className="text-danger d-block">
                {erreurs.adressArrondissement ? messages.adressArrondissement : null}
              </small>
              <small className="text-danger d-block">
                {erreurs.messageErreur ? messages.messageErreur : null}
              </small>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button
            variant="primary"
            onClick={(e) => validation(e, inputs.idArrondissement)}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
