import { configureStore } from "@reduxjs/toolkit";
import media_slice from "./slices/media_slice";

export default configureStore({
    reducer: {
        media: media_slice 
    }
})