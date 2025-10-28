import styles from "./EmptyState.module.css";
import myImage from "../../assets/notFound.png";

function EmptyState({ message }) {
  return (
    <div className={styles.errorContainer}>
      <img src={myImage} alt="Not Found" className={styles.notFound} />
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
