import { useMemo } from "react";
import styles from "./Stats.module.css";

function Stats({ records = [] }) {
  const stats = useMemo(() => {
    const total = records.length;
    const completed = records.filter((n) => n.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [records]);

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statBox}>
        <div className={styles.statLabel}>Total</div>
        <div className={styles.statValue}>{stats.total}</div>
      </div>

      <div className={styles.statBox}>
        <div className={styles.statLabel}>Completed</div>
        <div className={styles.statValue}>{stats.completed}</div>
      </div>

      <div className={styles.statBox}>
        <div className={styles.statLabel}>Pending</div>
        <div className={styles.statValue}>{stats.active}</div>
      </div>
    </div>
  );
}

export { Stats };
