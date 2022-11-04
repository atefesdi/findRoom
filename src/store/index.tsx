import { configureStore } from "@reduxjs/toolkit";
import reserveSlice from './reserve-reducer';


 const store = configureStore({reducer: reserveSlice.reducer});
 export default store;