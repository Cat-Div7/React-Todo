import styles from "./Tools.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "../../utils/icons";
import { useState } from "react";

const STORAGE_KEY_THEME = "themeMode";
const INITIAL_THEME = false;

function Tools(props) {
  const { selectFilter, searchFilter } = props;
  const savedTheme =
    JSON.parse(localStorage.getItem(STORAGE_KEY_THEME)) ?? INITIAL_THEME;

  const [isDark, setIsDark] = useState(savedTheme);

  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );

  const changeThemeHandler = () => {
    const newTheme = !isDark;
    document.documentElement.setAttribute(
      "data-theme",
      newTheme ? "dark" : "light"
    );
    setIsDark(newTheme);
    localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(newTheme));
  };

  const filterHandler = (e) => {
    selectFilter(e.target.value);
  };

  const searchHandler = (e) => {
    searchFilter(e.target.value);
  };

  return (
    <div className={styles["tools-container"]}>
      <div className={styles["search-container"]}>
        <input
          type="search"
          placeholder="Search notes..."
          onChange={searchHandler}
        />
      </div>
      <select onChange={filterHandler}>
        <option>All</option>
        <option>Completed</option>
        <option>Pending</option>
      </select>
      <button className={styles["theme-toggle"]} onClick={changeThemeHandler}>
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
      </button>
    </div>
  );
}

export default Tools;
