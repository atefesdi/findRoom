import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Room from "../components/Room";
import { useDispatch, useSelector } from "react-redux";
import { reserveActions } from "../store/reserve-reducer";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const url = useSelector((state) => state.URL);

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(reserveActions.changeURL());
  }, [dispatch, rooms]);

  const addRoomHandler = () => {
    dispatch(reserveActions.addRoom());
  };
  const resetHandler = () => {
    dispatch(reserveActions.reset());
    navigate(`/`);
  };
  const searchHandler = () => {
    navigate(`/${url}`);
  };

  return (
    <div className={styles["container"]}>
      <header>
        <CloseIcon className={styles["close-icon"]} onClick={resetHandler} />
        <h3>Who is staying</h3>
      </header>

      <div className={styles["rooms-conatiner"]}>
        {rooms.map((item, index) => (
          <Room
            key={index}
            roomNumber={index + 1}
            id={item.id}
            adults={item.adults}
            children={item.children}
          />
        ))}
      </div>
      <button
        className={`${styles["add-btn"]} ${styles["btn"]}`}
        onClick={addRoomHandler}
      >
        <AddIcon />
        Add Room
      </button>
      <button
        className={`${styles["search-btn"]} ${styles["btn"]}`}
        onClick={searchHandler}
      >
        <SearchIcon />
        Search
      </button>
    </div>
  );
}

export default Home;
