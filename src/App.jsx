import { useState } from "react";
import Modal from "react-modal";
import styles from "./App.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "./utils/icons";
import { EditForm, AddForm } from "./components/edit";
import { Tools } from "./components/common";
import { NoteList } from "./components/noteSection/NoteList";
import ThemeProvider from "./ThemeContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

const STORAGE_KEY_TODOS = "todoRecords"; // LocalStorage

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

// Main App Component
function App() {
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

  const {
    value: noteRecords,
    setValue: setNoteRecords,
    isLoaded,
  } = useLocalStorage(STORAGE_KEY_TODOS, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [filterValue, setFilterValue] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [editValue, setEditValue] = useState("");
  const [storedId, setStoredId] = useState(0);

  const getNextId = () =>
    noteRecords.length === 0
      ? 1
      : Math.max(...noteRecords.map((rec) => rec.id)) + 1;

  // Handlers For Modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // CRUD => {Create, Read, Update, Delete}
  const formSubmit = (noteRecord) => {
    setNoteRecords((prev) => {
      const newLists = [
        { id: getNextId(), content: noteRecord, completed: false },
        ...prev,
      ];
      return newLists;
    });
    handleCloseModal();
  };

  const updateCompleted = (id, status) => {
    const updatedRecords = noteRecords.map((rec) =>
      rec.id === id ? { ...rec, completed: status } : rec
    );
    setNoteRecords(updatedRecords);
  };

  const deleteNote = (id) => {
    setNoteRecords((prev) => prev.filter((rec) => rec.id !== id));
  };

  // Filter and Search Handlers
  const selectFilterHandler = (value) => setFilterValue(value);

  const searchHandler = (value) => {
    if (value.trim() === "") return setSearchFilter("");
    setSearchFilter(value);
  };

  const filteredNotes = noteRecords?.filter((note) => {
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

  // Edit Modal Handlers
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
      return updated;
    });
    handleCloseModal2();
  };

  if (!isLoaded) return <div className={styles.loader}></div>;

  return (
    <ThemeProvider>
      <div className={styles.container}>
        <h1>Todo List</h1>
        {/* Tools Section */}
        <Tools
          selectFilter={selectFilterHandler}
          searchFilter={searchHandler}
        ></Tools>

        {/* Note List Section */}
        <NoteList
          deleteRecord={deleteNote}
          noteRecords={filteredNotes}
          updateFunction={updateCompleted}
          openEditHandler={handleOpenModal2}
        ></NoteList>

        {/* Form Modal Add */}
        <button className={styles.addBtn} onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Modal"
          style={modalStyles}
        >
          <AddForm
            onCancel={handleCloseModal}
            formSubmit={formSubmit}
          ></AddForm>
        </Modal>

        {/* Form Modal Edit */}
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
    </ThemeProvider>
  );
}

export default App;
