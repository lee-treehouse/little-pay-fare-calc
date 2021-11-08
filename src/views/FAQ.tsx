import styles from "./ViewsCommon.module.css";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

export const FAQ = () => {
  return (
    <>
      <h2 className={styles.subHeader}>
        <FaQuestionCircle />
        {""} FAQ
      </h2>
      <div className={styles.main}>
        <h3>A what question?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eligendi eaque
          corporis, ullam, similique tenetur molestiae et quam inventore soluta autem consectetur
          enim animi laboriosam hic labore natus assumenda sequi.
        </p>
        <h3>A why question?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eligendi eaque
          corporis, ullam, similique tenetur molestiae et quam inventore soluta autem consectetur
          enim animi laboriosam hic labore natus assumenda sequi.
        </p>
        <h3>A who question?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eligendi eaque
          corporis, ullam, similique tenetur molestiae et quam inventore soluta autem consectetur
          enim animi laboriosam hic labore natus assumenda sequi.
        </p>
        <h3>A where question?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eligendi eaque
          corporis, ullam, similique tenetur molestiae et quam inventore soluta autem consectetur
          enim animi laboriosam hic labore natus assumenda sequi.
        </p>
        <h3>A when question?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eligendi eaque
          corporis, ullam, similique tenetur molestiae et quam inventore soluta autem consectetur
          enim animi laboriosam hic labore natus assumenda sequi.
        </p>
      </div>
    </>
  );
};
