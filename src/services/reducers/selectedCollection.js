import {
  ADD_SELECTED_INGREDIENT,
  SET_SELECTED_BUN,
  SET_TOTAL_PRICE,
  REMOVE_SELECTED_ITEM,
  INSERT_SELECTED_INGREDIENT,
  SET_INSERT_POSITION,
  UPDATE_POSITION,
  CLEAR_SELECTION,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/selectedCollection";

const selectedCollectionState = {
  collection: [],
  bunData: null,
  totalPrice: 0,
  insertPosition: -1,
  makingRequest: false,
  hasError: false,
};
export const selectedIngredientsReducer = (
  state = selectedCollectionState,
  action,
) => {
  switch (action.type) {
    case ADD_SELECTED_INGREDIENT: {
      const newElement = { data: action.data, pos: state.collection.length };
      const newCollection = [...state.collection, newElement].sort((a, b) =>
        a.pos > b.pos ? 1 : -1,
      );
      return {
        ...state,
        collection: newCollection,
        totalPrice: state.totalPrice + action.data.price,
      };
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.newPrice,
      };
    }
    case SET_SELECTED_BUN: {
      let oldBunPrice = 0;
      if (state.bunData) {
        oldBunPrice = 2 * state.bunData.price;
      }
      const deltaPrice = 2 * action.data.price - oldBunPrice;
      return {
        ...state,
        bunData: action.data,
        totalPrice: state.totalPrice + deltaPrice,
      };
    }
    case INSERT_SELECTED_INGREDIENT: {
      let newPos = state.insertPosition;
      if (newPos > state.collection.length || newPos < 0) {
        newPos = state.collection.length;
      }
      const newElement = { data: action.data, pos: newPos };
      const firstPart = state.collection.filter((x) => x.pos < newPos);
      const secondPart = state.collection
        .filter((x) => x.pos >= newPos)
        .map((item) => {
          return { data: item.data, pos: item.pos + 1 };
        });
      const newCollection = [...firstPart, newElement, ...secondPart].sort(
        (a, b) => (a.pos > b.pos ? 1 : -1),
      );
      return {
        ...state,
        collection: newCollection,
        totalPrice: state.totalPrice + action.data.price,
        insertPosition: -1,
      };
    }
    case REMOVE_SELECTED_ITEM: {
      const removedItem = state.collection.filter(
        (item) => item.pos === action.pos,
      )[0];
      const removedItemPrice = removedItem ? removedItem.data.price : 0;

      const firstPart = state.collection.filter((x) => x.pos < action.pos);
      const secondPart = state.collection
        .filter((x) => x.pos > action.pos)
        .map((item) => {
          return { data: item.data, pos: item.pos - 1 };
        });
      const newCollection = [...firstPart, ...secondPart].sort((a, b) =>
        a.pos > b.pos ? 1 : -1,
      );
      return {
        ...state,
        totalPrice: state.totalPrice - removedItemPrice,
        collection: newCollection,
      };
    }
    case SET_INSERT_POSITION: {
      let newPos = action.newPos;
      if (state.insertPosition === 0 && action.newPos === -1) {
        newPos = 0;
      }
      return {
        ...state,
        insertPosition: newPos,
      };
    }
    case UPDATE_POSITION: {
      let newPos = state.insertPosition;

      if (newPos < 0 || newPos > state.collection.length) {
        newPos = state.collection.length;
      }
      if (newPos > state.collection.length || newPos === action.data.oldPos) {
        return { ...state };
      }

      const newElement = {
        data: state.collection.filter((x) => x.pos === action.data.oldPos)[0]
          .data,
        pos: newPos,
      };
      const firstPart = state.collection.filter(
        (x) => x.pos < action.data.oldPos && x.pos < newPos,
      );
      let secondPart = [];
      let thirdPart = [];

      if (newPos < action.data.oldPos) {
        secondPart = state.collection
          .filter((x) => x.pos < action.data.oldPos && x.pos >= newPos)
          .map((item) => {
            return { data: item.data, pos: item.pos + 1 };
          });
        thirdPart = state.collection.filter((x) => x.pos > action.data.oldPos);
      } else {
        secondPart = state.collection
          .filter((x) => x.pos > action.data.oldPos && x.pos <= newPos)
          .map((item) => {
            return { data: item.data, pos: item.pos - 1 };
          });
        thirdPart = state.collection.filter((x) => x.pos > newPos);
      }
      const newCollection = [
        ...firstPart,
        newElement,
        ...secondPart,
        ...thirdPart,
      ].sort((a, b) => (a.pos > b.pos ? 1 : -1));
      return {
        ...state,
        collection: newCollection,
        insertPosition: -1,
      };
    }
    case CLEAR_SELECTION: {
      return {
        collection: [],
        bunData: null,
        totalPrice: 0,
        insertPosition: -1,
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        makingRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        makingRequest: false,
        hasError: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        makingRequest: false,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};
