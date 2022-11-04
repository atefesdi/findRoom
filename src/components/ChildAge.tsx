import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { reserveActions } from "../store/reserve-reducer";
import { useDispatch } from "react-redux";
import styles from "./childAge.module.css";

const maxChildAge = 18;
interface Props {
  id: number,
  parentId: number,
  value: number
}

const ChildAge = (props:Props) => {
  const { id, parentId, value } = props;
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(reserveActions.removeAgeChild({ id, parentId }));
  };

  const ageChangeHandler = (e:React.ChangeEvent<HTMLSelectElement> ) => {
    const ageValue = e.target.value;
    dispatch(reserveActions.ageChidren({ id, parentId, ageValue }));
  };

  const options = [];
  for (let i = 0; i < maxChildAge; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className={styles["container"]}>
      <label htmlFor="age">Child age</label>
      <div className={styles["select-container"]}>
        <select name="age" id="age" onChange={ageChangeHandler} value={value}>
          {options}
        </select>
        <CloseIcon onClick={closeHandler} className={styles["close-icon"]} />
      </div>
    </div>
  );
};

export default ChildAge;
