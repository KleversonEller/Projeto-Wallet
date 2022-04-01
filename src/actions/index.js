// Coloque aqui suas actions
export const VALID_EMAIL = 'VALID_EMAIL';
export const CURRENCIES = 'CURRENCIES';
export const CURRENCIES_FAIL = 'CURRENCIES_FAIL';

export const getUser = (payload) => ({ type: VALID_EMAIL, payload });

const getCurrencies = (payload) => ({ type: CURRENCIES, payload });
const getCurrenciesFail = (payload) => ({ type: CURRENCIES_FAIL, payload });

export const thunkGetCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(getCurrencies(Object.keys(data)));
  } catch (error) {
    dispatch(getCurrenciesFail(error));
  }
};
