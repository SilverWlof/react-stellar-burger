import { combineReducers } from "redux";
import { fullCollectionReducer } from "./fullCollection";
import { modalStateReducer } from "./modal";
import { selectedIngredientsReducer } from "./selectedCollection";
import { utilsReducer } from "./utils";
import { authReducer } from "./auth";
import { wsReducer } from "./wsReducers";

export const rootReducer = combineReducers({
  user: authReducer,
  fullIngredients: fullCollectionReducer,
  selectedIngredients: selectedIngredientsReducer,
  modalState: modalStateReducer,
  utils: utilsReducer,
  wsReducer: wsReducer,
});
