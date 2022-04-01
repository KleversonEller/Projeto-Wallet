// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES, CURRENCIES_FAIL, EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  currenciesFail: false,
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES:
    return { ...state, currencies: action.payload.filter((key) => key !== 'USDT') };
  case CURRENCIES_FAIL:
    return { ...state, currenciesFail: action.payload };
  case EXPENSES:
    return { ...state, expenses: action.payload };
  default:
    return state;
  }
}

export default wallet;
