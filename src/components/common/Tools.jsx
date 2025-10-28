import styles from "./Tools.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "../../utils/icons";
import { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../ThemeContext";

function Tools(props) {
  const { selectFilter, searchFilter } = props;
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const filterHandler = (e) => {
    selectFilter(e.target.value);
  };

  const searchHandler = (e) => {
    searchFilter(e.target.value);
  };

  return (
    <div className={styles["tools-container"]}>
      {/* Search Filter Input */}
      <div className={styles["search-container"]}>
        <input
          type="search"
          placeholder="Search notes..."
          onChange={searchHandler}
        />
      </div>
      {/* Select Filter Box */}
      <select onChange={filterHandler}>
        <option>All</option>
        <option>Completed</option>
        <option>Pending</option>
      </select>
      {/* Toggling Theme Btn */}
      <button className={styles["theme-toggle"]} onClick={toggleTheme}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
        </motion.span>
      </button>
    </div>
  );
}

export { Tools };
