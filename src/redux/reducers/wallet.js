import {
  RECEIVED_CURRENCIES,
  REQUEST_CURRENCY,
  FAILED_CURRENCY,
  ADD_EXPENSES,
  DELETE_ID,
  INEDIT,
  EDITOR_ITEM,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  idToEdit: 0,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY: return {
    ...state,
  };
  case FAILED_CURRENCY: return {
    ...state,
    error: action.payload.error,
  };
  case RECEIVED_CURRENCIES: return {
    ...state,
    currencies: Object.keys(action.currencies).filter((coin) => coin !== 'USDT'),
  };
  case ADD_EXPENSES: return {
    ...state,
    expenses: [...state.expenses.filter((object) => object.currency !== ''),
      { id: state.expenses.length, ...action.expenses }],
  };
  case EDITOR_ITEM: return {
    ...state,
    editor: true,
    idToEdit: Number(action.id),
  };
  case INEDIT: return {
    ...state,
    expenses: [...state.expenses.map((expense) => {
      if (expense.id === state.idToEdit) {
        return { ...expense, ...action.param };
      }
      return expense;
    })],
    editor: false,
    idToEdit: 0,
  };
  case DELETE_ID: return {
    ...state,
    expenses: [...state.expenses.filter((obj) => obj.id !== Number(action.expense))],
  };
  default: return state;
  }
};

export default wallet;
