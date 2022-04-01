import fetchApi from '../service/fetchApi';

// Coloque aqui suas actions
export const VALID_EMAIL = 'VALID_EMAIL';
export const CURRENCIES = 'CURRENCIES';
export const CURRENCIES_FAIL = 'CURRENCIES_FAIL';
export const EXPENSES = 'EXPENSES';

export const getUser = (payload) => ({ type: VALID_EMAIL, payload });

export const getExpenses = (payload) => ({ type: EXPENSES, payload });

const getCurrencies = (payload) => ({ type: CURRENCIES, payload });
const getCurrenciesFail = (payload) => ({ type: CURRENCIES_FAIL, payload });

export const thunkGetCurrencies = () => async (dispatch) => {
  try {
    const data = await fetchApi();
    dispatch(getCurrencies(Object.keys(data)));
  } catch (error) {
    dispatch(getCurrenciesFail(error));
  }
};
