'use client';

// styles
import styles from './styles/loading.module.css';

export default function Loading() {
  return (
    <>
      <div className={styles.loadingWrapper}>
        <div className={styles.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
