import fetchCurrency from '../../api/Api';

export const USER_ACTION = 'USER_ACTION';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVED_CURRENCIES = 'RECEIVED_CURRENCIES';
export const FAILED_CURRENCY = 'FAILED_CURRENCY';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_ID = 'DELETE_ID';
export const INEDIT = 'INEDIT';
export const EDITOR_ITEM = 'EDITOR_ITEM';

export const userLogin = (state) => ({
  type: USER_ACTION,
  state,
});

export const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

export const receivedCurrency = (currencies) => ({
  type: RECEIVED_CURRENCIES,
  currencies,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const removeId = (expense) => ({
  type: DELETE_ID,
  expense,
});

export const inEdit = (param) => ({
  type: INEDIT,
  param,
});

export const handleEditor = (id) => ({
  type: EDITOR_ITEM,
  id,
});

export const failedCurrency = (error) => ({
  type: FAILED_CURRENCY,
  payload: { error },
});

export const currencyAction = () => async (dispatch) => {
  dispatch(requestCurrency());
  try {
    const response = await fetchCurrency();
    dispatch(receivedCurrency(response));
  } catch (error) {
    dispatch(failedCurrency(error));
  }
};
