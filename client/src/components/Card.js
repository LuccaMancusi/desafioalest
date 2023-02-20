import styles from "./Card.module.css";
import { PencilLine, Trash } from "phosphor-react";

export function Card({ name, urlImage, price, onDeleteProduct, index }) {
  function handleDelete() {
    onDeleteProduct(index);
  }
  return (
    <li className={styles.card}>
      <span>{name}</span>
      <img src={urlImage} alt=""></img>
      <span>R$ {price}</span>
      <div className={styles.footer}>
        <button>
          <PencilLine size={32} />
        </button>
        <button onClick={handleDelete}>
          <Trash size={32} />
        </button>
      </div>
    </li>
  );
}
