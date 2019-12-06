import _ from "lodash";
import classnames from "classnames";
import React, { useRef, useContext, useLayoutEffect } from "react";
import Context from "../../../context/Context.js";
import pinIcon from "../../../assets/images/pin.png";
import styles from "./styles.module.css";

const Todo = ({ item, open, handleDelete, handlePin }) => {
  const refBtn = useRef();
  const itemRef = useRef();
  const pinRef = useRef();
  const { setPosition, itemSelected } = useContext(Context);

  const handleOpen = e => {
    if (
      !refBtn.current.contains(e.target) &&
      !pinRef.current.contains(e.target)
    ) {
      open(item);
    }
  };

  useLayoutEffect(() => {
    if (itemSelected && item === itemSelected) {
      const info = itemRef.current.getBoundingClientRect();
      const position = {
        width: info.width,
        height: info.height,
        x: info.left,
        y: info.top
      };
      setPosition(position);
    }
  }, [item, itemSelected, setPosition]);

  const pin = item => {
    handlePin(item)
  };

  return (
    <div
      id="todo-item"
      className={classnames(styles.item, {
        [styles.hide]: itemSelected && item.id === itemSelected.id
      })}
      onClick={e => handleOpen(e, item)}
      ref={itemRef}
    >
      <div
        className={classnames(styles.pin, { [styles.show]: item.pin })}
        onClick={() => pin(item)}
        ref={pinRef}
      >
        <img src={pinIcon} alt="pin" />
      </div>
      <p className={styles.title}>{item.title}</p>
      <p
        dangerouslySetInnerHTML={{
          __html:
            item.content.length > 1000
              ? item.content.substring(0, 1000) + "..."
              : item.content
        }}
      ></p>
      <div className={styles.btnDelete}>
        <button
          id="btn-delete"
          onClick={() => handleDelete(item.id)}
          ref={refBtn}
        >
          Xoá
        </button>
      </div>
    </div>
  );
};

export default Todo;
