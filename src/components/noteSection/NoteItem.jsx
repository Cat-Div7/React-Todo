import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "../../utils/icons";
import { memo, useEffect, useState } from "react";
import styles from "./NoteItem.module.css";

function NoteItemBase(props) {
  const { content, id, completed, onUpdate, onDelete, onEdit } = props;
  const [isChecked, setIsChecked] = useState(completed);

  // Sync local state with props
  useEffect(() => {
    setIsChecked(completed);
  }, [completed]);

  const checkHandler = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onUpdate(id, checked);
  };

  return (
    <>
      <div className={styles.noteMain}>
        {/* Note Checkbox And Content */}
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

      {/* Action Icons */}
      <div className={styles.actions}>
        <FontAwesomeIcon
          icon={faEdit}
          className={styles.editIcon}
          onClick={() => onEdit({ id, content })}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className={styles.deleteIcon}
          onClick={() => onDelete(id)}
        />
      </div>
    </>
  );
}

// Memoizing Note
const NoteItem = memo(
  NoteItemBase,
  (prev, next) =>
    prev.content === next.content && prev.completed === next.completed
);

export { NoteItem };
