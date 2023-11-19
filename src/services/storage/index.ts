import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from './store';
import { rootReducer } from '../reducers';
import { TModalActions } from '../actions/modal';
import { TAuthActions } from '../actions/auth';
import { TFullCollectionActions } from '../actions/fullCollection';
import { TSelectedCollectionActions } from '../actions/selectedCollection';
import { TUtilsActions } from '../actions/utils';

export type AppActions =
    TModalActions |
    TAuthActions |
    TFullCollectionActions |
    TSelectedCollectionActions |
    TUtilsActions;


export type AppState = ReturnType<typeof rootReducer>;


export type AppDispatch = ThunkDispatch<Action<any>, RootState, AppActions>;
export type RootState = ReturnType<typeof store.getState>;



export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, AppActions>>;