import { useState } from "react";
import styles from "./AddForm.module.css";

function AddForm(props) {
  const { onCancel, formSubmit } = props;
  const [note, setNote] = useState("");
  const [hasError, setHasError] = useState(false);

  const noteChangeHandler = (e) => {
    setNote(e.target.value);
    if (e.target.value.trim() !== "") {
      setHasError(false);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (note.trim() === "") {
      setHasError(true);
      return;
    }
    formSubmit(note);
    setNote("");
    setHasError(false);
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label className={styles.title} htmlFor="note">
        New Note
      </label>
      <input
        className={`${styles.input} ${hasError ? styles.error : ""}`}
        type="text"
        id="note"
        placeholder="Input your note..."
        value={note}
        onChange={noteChangeHandler}
      />
      <div className={styles["form-actions"]}>
        <button
          type="button"
          className={`${styles.btn} ${styles["btn-cancel"]}`}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className={`${styles.btn} ${styles["btn-apply"]}`}>
          Apply
        </button>
      </div>
    </form>
  );
}

export default AddForm;
