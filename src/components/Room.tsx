import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./room.module.css";
import { useDispatch, useSelector } from "react-redux";
import { reserveActions } from "../store/reserve-reducer";
import ChildAge from "./ChildAge";


interface Props {
  adults : number,
  id: number,
  roomNumber : number,
  children : {
    id:number,
    value: number
  }[]
}
const Room = (props:Props) => {
  const { adults, id, roomNumber, children } = props;

  const dispatch = useDispatch();

  const changeAdultHandler = (operator:string) => {
    dispatch(reserveActions.addAdults({ operator, id }));
  };

  const changeChildHandler = (operator:string) => {
    dispatch(reserveActions.addChildren({ operator, id }));
  };
  const removeRoomHandler = ()=>{
    dispatch(reserveActions.removeRoom(id))
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["room-title"]}>
      <p >Room {roomNumber}</p>
      {roomNumber >1 && <span onClick={removeRoomHandler}>Remove room</span>}
      </div>
      <div className={styles["section-container"]}>
        <p>adults</p>
        <div className={styles["controll-btn-container"]}>
          <button
            className={styles["controll-btn"]}
            onClick={changeAdultHandler.bind(this, "REMOVE")}
          >
            <RemoveIcon />
          </button>
          {adults}
          <button
            className={styles["controll-btn"]}
            onClick={changeAdultHandler.bind(this, "ADD")}
          >
            <AddIcon />
          </button>
        </div>
      </div>
      <div className={styles["section-container"]}>
        <p>children</p>
        <div className={styles["controll-btn-container"]}>
          <button
            className={styles["controll-btn"]}
            onClick={changeChildHandler.bind(this, "REMOVE")}
          >
            <RemoveIcon />
          </button>
          <span>{children.length}</span>
          <button
            className={styles["controll-btn"]}
            onClick={changeChildHandler.bind(this, "ADD")}
          >
            <AddIcon />
          </button>
        </div>
      </div>
      <div className={styles["age-child-container"]}>
        {children.length !== 0
          ? children.map((item , index) => (
              <ChildAge key={index} id={item.id} parentId={id} value={item.value} />
            ))
          : ""}
      </div>
    </div>
  );
};
//
export default Room;
