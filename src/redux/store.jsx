import { configureStore } from "@reduxjs/toolkit";
import archive_slice from "./slices/archive_slice";
import art_slice from "./slices/art_slice";

export default configureStore({
    reducer: {
        art: art_slice,
        archive: archive_slice
    }
})