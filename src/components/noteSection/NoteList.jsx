import NoteItem from "./NoteItem";
import styles from "./NoteList.module.css";
import myImage from "../../assets/notFound.png";

const imgNotFound = (
  <div className={styles.errorContainer}>
    <img src={myImage} alt="Not Found" className={styles.notFound} />
    <p>Empty..</p>
  </div>
);

function NoteList(props) {
  const {
    noteRecords: records,
    updateFunction,
    deleteRecord,
    openEditHandler,
  } = props;
  return records?.length ? (
    <ul className={styles.notesContainer}>
      {records.map((note) => (
        <li className={styles.noteList} key={note.id}>
          <NoteItem
            onDelete={deleteRecord}
            onUpdate={updateFunction}
            id={note.id}
            content={note.content}
            completed={note.completed}
            onEdit={openEditHandler}
          ></NoteItem>
        </li>
      ))}
    </ul>
  ) : (
    imgNotFound
  );
}

export default NoteList;
