import { configureStore } from '@reduxjs/toolkit';
import contactSlice from './contact-slice';

export default configureStore({
    reducer: {
        contact: contactSlice,
    }
});