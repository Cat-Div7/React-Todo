import { useState } from "react";
import AddForm from "./components/edit/AddForm";
import Modal from "react-modal";
import styles from "./App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "./utils/icons";
import Tools from "./components/common/Tools";
import NoteList from "./components/noteSection/NoteList";
import EditForm from "./components/edit/EditForm";

const STORAGE_KEY_TODOS = "todoRecords"; // LocalStorage
const INITIAL_VALUES = [
  { id: 1, content: "NOTE #1", completed: true },
  { id: 2, content: "NOTE #2", completed: false },
  { id: 3, content: "NOTE #3", completed: true },
];

function App() {
  const savedRecords =
    JSON.parse(localStorage.getItem(STORAGE_KEY_TODOS)) || INITIAL_VALUES;

  const INITIAL_ID = () => {
    const savedRecords =
      JSON.parse(localStorage.getItem(STORAGE_KEY_TODOS)) || [];
    if (savedRecords.length === 0) return 1;
    const maxId = savedRecords.reduce(
      (max, rec) => (rec.id > max ? rec.id : max),
      0
    );
    return maxId + 1;
  };

  const [noteRecords, setNoteRecords] = useState(savedRecords);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [currentID, setCurrentID] = useState(INITIAL_ID);
  const [filterValue, setFilterValue] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [editValue, setEditValue] = useState("");
  const [storedId, setStoredId] = useState(0);

  const modalStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      border: "1px solid var(--border-color)",
      marginRight: "-50%",
      transform: "translate(-50%, -30%)",
      padding: "0px",
      borderRadius: "var(--border-smooth)",
      backgroundColor: "transparent",
      minWidth: "300px",
      maxWidth: "500px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const formSubmit = (noteRecord) => {
    setNoteRecords((prev) => {
      const newLists = [
        { id: currentID, content: noteRecord, completed: false },
        ...prev,
      ];
      localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(newLists));
      return newLists;
    });
    setCurrentID((prev) => prev + 1);
    handleCloseModal();
  };

  const updateCompleted = (id, status) => {
    const updatedRecords = noteRecords.map((rec) =>
      rec.id === id ? { ...rec, completed: status } : rec
    );
    setNoteRecords(updatedRecords);
    localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(updatedRecords));
  };

  const deleteNote = (id) => {
    setNoteRecords((prev) => {
      const updatedRecords = prev.filter((rec) => rec.id !== id);
      localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(updatedRecords));
      return updatedRecords;
    });
  };

  const selectFilterHandler = (value) => setFilterValue(value);

  const searchHandler = (value) => {
    if (value.trim() === "") return setSearchFilter("");
    setSearchFilter(value);
  };

  const filteredNotes = noteRecords.filter((note) => {
    // Select Box Filter
    const matchesFilter =
      filterValue === "All"
        ? true
        : filterValue === "Completed"
        ? note.completed
        : !note.completed;
    // Search Filter
    const matchesSearch = note.content
      .toLowerCase()
      .includes(searchFilter.toLowerCase());
    // Returns Note that Achives Both
    return matchesFilter && matchesSearch;
  });

  const handleOpenModal2 = (note) => {
    setStoredId(note.id);
    setEditValue(note.content);
    setIsModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
    setEditValue("");
    setStoredId(0);
  };

  const editChangeHandler = (newValue) => setEditValue(newValue);

  const onSaveEdit = (newValue) => {
    setNoteRecords((prev) => {
      const updated = prev.map((rec) =>
        rec.id === storedId ? { ...rec, content: newValue } : rec
      );
      localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(updated));
      return updated;
    });
    handleCloseModal2();
  };

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <Tools
        selectFilter={selectFilterHandler}
        searchFilter={searchHandler}
      ></Tools>
      <NoteList
        deleteRecord={deleteNote}
        noteRecords={filteredNotes}
        updateFunction={updateCompleted}
        openEditHandler={handleOpenModal2}
      ></NoteList>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >
        <AddForm onCancel={handleCloseModal} formSubmit={formSubmit}></AddForm>
      </Modal>

      <button className={styles.addBtn} onClick={handleOpenModal}>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <Modal
        isOpen={isModalOpen2}
        onRequestClose={handleCloseModal2}
        contentLabel="Modal"
        style={modalStyles}
      >
        <EditForm
          onCancel={handleCloseModal2}
          onChange={editChangeHandler}
          value={editValue}
          onSave={onSaveEdit}
        ></EditForm>
      </Modal>
    </div>
  );
}

export default App;
