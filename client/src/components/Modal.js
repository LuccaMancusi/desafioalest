import { useState } from "react";
import styles from "./Modal.module.css";

export function Modal({
  name,
  price,
  urlImage,
  button,
  show,
  onHideModal,
  onCreateProduct,
  onUpdateProduct,
}) {
  const [object, setObject] = useState({ name, price, urlImage });

  function handleNameChange(e) {
    const newObject = { ...object };
    newObject.name = e.target.value;
    setObject(newObject);
  }
  function handlePriceChange(e) {
    const newObject = { ...object };
    newObject.price = e.target.value;
    setObject(newObject);
  }
  function handleLinkChange(e) {
    const newObject = { ...object };
    newObject.urlImage = e.target.value;
    setObject(newObject);
  }

  function createProduct(event) {
    event.preventDefault();
    onCreateProduct(object);
  }

  function updateProduct(event) {
    event.preventDefault();
    onUpdateProduct(object);
  }

  return (
    <div
      onClick={onHideModal}
      className={show ? styles.modalContainer : styles.hide}
      id="modal"
    >
      <form onSubmit={button === "Adicionar" ? createProduct : updateProduct}>
        <label htmlFor="name">Nome do produto:</label>
        <input
          onChange={handleNameChange}
          value={name}
          id="name"
          type="text"
          placeholder="Digite o nome do produto"
        ></input>

        <label htmlFor="price">Preço do produto:</label>
        <input
          onChange={handlePriceChange}
          value={price}
          id="price"
          type="number"
          placeholder="Digite o preço do produto"
        ></input>

        <label htmlFor="urlImage">Link da imagem:</label>
        <input
          onChange={handleLinkChange}
          value={urlImage}
          id="urlImage"
          type="text"
          placeholder="Digite o endereço da imagem"
        ></input>
        <button type="submit">{button}</button>
      </form>
    </div>
  );
}
