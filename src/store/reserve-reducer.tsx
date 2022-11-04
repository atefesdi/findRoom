import { createSlice } from "@reduxjs/toolkit";

const maxCountOfadult = 5;
const minCountOfadult = 1;
const maxCountChildren = 3;
const minCountChildren = 0;

interface InitialState {
  rooms: {
    id : number ,
    adults : number,
    children : {
      id: number,
      value : number,
    }[]
  }[];
  URL: string;
}

const initialState: InitialState = {
  rooms: [{ adults: 1, children: [], id: Math.random() }],
  URL: "",
};

const reserveSlice = createSlice({
  name: "reserve",
  initialState,
  reducers: {
    addRoom(state) {
      if (state.rooms.length < 8) {
        state.rooms.push({
          adults: 1,
          children: [],
          id: Math.random(),
        });
      }
    },
    removeRoom(state , action){
      const otherRooms = state.rooms.filter( i => i.id !== action.payload)
      state.rooms = [...otherRooms]
      
    },
    addAdults(state, action) {
      const indexItem = state.rooms.findIndex(
        (i) => i.id === action.payload.id
      );
      const item = state.rooms[indexItem];

      if (action.payload.operator === "ADD" && item.adults < maxCountOfadult) {
        item.adults++;
      } else if (
        action.payload.operator === "REMOVE" &&
        item.adults > minCountOfadult
      ) {
        item.adults--;
      }
      state.rooms[indexItem] = item;
    },
    addChildren(state, action) {
      const indexItem = state.rooms.findIndex(
        (i) => i.id === action.payload.id
      );
      const item = state.rooms[indexItem];

      if (
        action.payload.operator === "ADD" &&
        item.children.length < maxCountChildren
      ) {
        item.children.push({ id: Math.random(), value: 0 });
      } else if (
        action.payload.operator === "REMOVE" &&
        item.children.length > minCountChildren
      ) {
        item.children.pop();
      }
      state.rooms[indexItem] = item;
    },
    ageChidren(state, action) {
      const roomIndex = state.rooms.findIndex(
        (i) => i.id === action.payload.parentId
      );
      const room = state.rooms[roomIndex];

      const ageIndex = room.children.findIndex(
        (i) => i.id === action.payload.id
      );
      room.children[ageIndex] = {
        value: action.payload.ageValue,
        id: action.payload.id,
      };
    },
    removeAgeChild(state, action) {
      const roomIndex = state.rooms.findIndex(
        (i) => i.id === action.payload.parentId
      );
      const room = state.rooms[roomIndex];
      const otheChildren = room.children.filter(
        (i) => i.id !== action.payload.id
      );
      room.children = [...otheChildren];
    },
    reset() {
      return initialState;
    },
    changeURL(state) {
      const rooms = state.rooms;

      let url = "";
      for (let i = 0; i < rooms.length; i++) {
        if (rooms.length > 0 && i !== 0) {
          url += "|";
        }
        url += `${rooms[i].adults}`;
        if (rooms[i].children.length !== 0) {
          url += ":";
        }
        for (let c = 0; c < rooms[i].children.length; c++) {
          if (rooms[i].children.length !== 0 && c !== 0) {
            url += ",";
          }
          url += `${rooms[i].children[c].value}`;
        }
      }
       state.URL = url

      
    },}
});

export const reserveActions = reserveSlice.actions;
export default reserveSlice;
