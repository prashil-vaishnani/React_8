import {
  createSlice,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const initialAuthState = {
  isAuthenticated: false,
  userDetails: {
    userAvatar: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userPassword: "",
  },
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login: (
      state: {
        isAuthenticated: boolean;
        userDetails: {
          userAvatar: string;
          userName: string;
          userEmail: string;
          userPhone: string;
          userPassword: string;
        };
      },
      action
    ) => {
      
      (state.isAuthenticated = true);
        (state.userDetails = {
          userAvatar: action.payload.profilePic,
          userName: action.payload.name,
          userEmail: action.payload.email,
          userPhone: action.payload.phoneNo,
          userPassword: action.payload.password,
        });
    },
    logout: (state: {
      isAuthenticated: boolean;
      userDetails: {
        userAvatar: string;
        userName: string;
        userEmail: string;
        userPhone: string;
        userPassword: string;
      };
    }) => {
      state.isAuthenticated = false;
      state.userDetails = {
        userAvatar: "",
        userName: "",
        userEmail: "",
        userPhone: "",
        userPassword: "",
      };
    },
  },
});

const store = configureStore({
  reducer: authSlice.reducer,
});

export const authActions = authSlice.actions;

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
