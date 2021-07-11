import React, { useState, useRef } from "react";
import styles from "./filtering.module.css";

const Filtering = (props) => {
  const scrollRef = useRef(null);

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  return (
    <>
      <div className={styles.bar} />
      <div
        aria-hidden
        className={styles.categories}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scrollRef}
      >
        <button type="button" className={styles.category}>
          멤버 전체
        </button>
        <button type="button" className={styles.category}>
          판매・구매
        </button>
        <button type="button" className={styles.category}>
          카테고리
        </button>
        <button type="button" className={styles.category}>
          상품상태
        </button>
        <button type="button" className={styles.category}>
          가격대
        </button>
      </div>
      <div className={styles.bar} />
    </>
  );
};

export default Filtering;
