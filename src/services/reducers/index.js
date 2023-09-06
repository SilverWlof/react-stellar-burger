import { combineReducers } from "redux";
import { fullCollectionReducer } from "./fullCollection";
import { modalStateReducer } from "./modal";
import { selectedIngredientsReducer } from "./selectedCollection";
import { utilsReducer } from "./utils";

export const rootReducer = combineReducers({
  fullIngredients: fullCollectionReducer,
  selectedIngredients: selectedIngredientsReducer,
  modalState: modalStateReducer,
  utils: utilsReducer,
});
