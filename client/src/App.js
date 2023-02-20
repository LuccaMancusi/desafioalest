import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Card } from "./components/Card";
import { Modal } from "./components/Modal";

export function App() {
  const [data, setData] = useState([{}]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function onCreateProduct(product) {
    const options = {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(product),
    };

    fetch("/create", options).then((res) => {
      dataUpdate();
      setShowCreateModal(false);
    });
  }

  function onUpdateProduct(product) {
    const id = data[currentIndex].id;
    const options = {
      method: "PUT",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ ...product, id }),
    };
    console.log(options);
    fetch("/update", options).then((res) => {
      dataUpdate();
      setShowUpdateModal(false);
    });
  }

  function onHideModal(e) {
    let target = e.target;
    if (target.id === "modal") {
      setShowCreateModal(false);
      setShowUpdateModal(false);
    }
  }

  function dataUpdate() {
    fetch("/get/all")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }

  function openModal(product, index) {
    setCurrentIndex(index);
    setShowUpdateModal(true);
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
              setShowCreateModal(true);
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
                openModal={openModal}
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
        show={showCreateModal}
        onHideModal={onHideModal}
        button="Adicionar"
        onCreateProduct={onCreateProduct}
      />
      <Modal
        show={showUpdateModal}
        onHideModal={onHideModal}
        button="Atualizar"
        onUpdateProduct={onUpdateProduct}
      />
    </>
  );
}
