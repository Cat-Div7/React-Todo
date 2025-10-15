import { useState } from "react";
import styles from "./EditForm.module.css";

function EditForm(props) {
  const { onCancel, onSave, value, onChange } = props;
  const [hasError, setHasError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setHasError(true);
      return;
    }
    onSave(value);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label className={styles.title} htmlFor="edit-note">
        Edit Note
      </label>
      <input
        className={`${styles.input} ${hasError ? styles.error : ""}`}
        type="text"
        id="edit-note"
        placeholder="Edit your note..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.trim() !== "") setHasError(false);
        }}
      />
      <div className={styles["form-actions"]}>
        <button
          type="button"
          className={`${styles.btn} ${styles["btn-cancel"]}`}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className={`${styles.btn} ${styles["btn-save"]}`}>Save</button>
      </div>
    </form>
  );
}

export default EditForm;
