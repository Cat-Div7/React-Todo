import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "../../utils/icons";
import styles from "./NoteItem.module.css";
import { useState } from "react";
import Modal from "react-modal";

function NoteItem(props) {
  const { content, id, completed, onUpdate, onDelete, onEdit } = props;
  const [isChecked, setIsChecked] = useState(completed);

  const checkHandler = (e) => {
    setIsChecked(e.target.checked);
    onUpdate(id, e.target.checked);
  };

  const deleteHandler = () => onDelete(id);
  const editHandler = () => {
    onEdit({ id, content });
  };

  return (
    <>
      <div className={styles.noteMain}>
        <input
          type="checkbox"
          id={`note-${id}`}
          checked={isChecked}
          onChange={checkHandler}
          className={styles.checkbox}
        />
        <label htmlFor={`note-${id}`} className={styles.label}>
          {content}
        </label>
      </div>

      <div className={styles.actions}>
        <FontAwesomeIcon
          icon={faEdit}
          className={styles.editIcon}
          onClick={editHandler}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className={styles.deleteIcon}
          onClick={deleteHandler}
        />
      </div>
    </>
  );
}

export default NoteItem;
