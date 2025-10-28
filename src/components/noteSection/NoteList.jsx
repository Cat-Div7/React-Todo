import styles from "./NoteList.module.css";
import { NoteItem } from "./NoteItem";
import EmptyState from "./EmptyState";
import { memo } from "react";

function NoteListBase({ noteRecords, updateFunction, deleteRecord, openEditHandler }) {
  if (!noteRecords.length) return <EmptyState message="Empty.." />;

  return (
    <ul className={styles.notesContainer}>
      {noteRecords.map((note) => (
        <li className={styles.noteList} key={note.id}>
          <NoteItem
            onUpdate={updateFunction}
            onDelete={deleteRecord}
            onEdit={openEditHandler}
            id={note.id}
            content={note.content}
            completed={note.completed}
          ></NoteItem>
        </li>
      ))}
    </ul>
  );
}

const NoteList = memo(NoteListBase);

export { NoteList };
