import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Card } from "./components/Card";
import { Modal } from "./components/Modal";

export function App() {
  const [data, setData] = useState([{}]);
  const [show, setShow] = useState(false);

  function onCreateProduct(product) {
    const options = {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(product),
    };

    fetch("/create", options).then((res) => {
      dataUpdate();
      setShow(false);
    });
  }

  function onHideModal(e) {
    let target = e.target;
    if (target.id === "modal") {
      setShow(false);
    }
  }

  function dataUpdate() {
    fetch("/get/all")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }

  useEffect(() => {
    dataUpdate();
  }, []);

  function deleteProduct(index) {
    const id = data[index].id;
    const url = "/delete/" + id;
    const options = {
      method: "DELETE",
      headers: new Headers({ "content-type": "application/json" }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  return (
    <>
      <header className={styles.header}>Produtos CRUD</header>
      <div className={styles.contentContainer}>
        <div className={styles.contentHeader}>
          <button
            className={styles.button}
            onClick={() => {
              setShow(true);
            }}
          >
            Adicionar
          </button>
        </div>
        <ul className={styles.cardContainer}>
          {data.map((product, index) => {
            return (
              <Card
                index={index}
                onDeleteProduct={deleteProduct}
                key={product.id}
                name={product.name}
                urlImage={product.urlImage}
                price={product.price}
              />
            );
          })}
        </ul>
      </div>
      <Modal
        show={show}
        onHideModal={onHideModal}
        button="Adicionar"
        onCreateProduct={onCreateProduct}
      />
    </>
  );
}
