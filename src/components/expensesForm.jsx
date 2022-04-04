import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi from '../service/fetchApi';
import { getExpenses } from '../actions';
import './expensesForm.css';

const valorTag = 'Alimentação';

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: valorTag,
      exchangeRates: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.addExchange = this.addExchange.bind(this);
  }

  componentDidMount() {
    const { idEdit, editar, despesas } = this.props;
    const despesaEditar = despesas.find((despesa) => despesa.id === +idEdit);

    return editar && this.setState({
      id: despesaEditar.id,
      value: despesaEditar.value,
      description: despesaEditar.description,
      currency: despesaEditar.currency,
      method: despesaEditar.method,
      tag: despesaEditar.tag,
      exchangeRates: despesaEditar.exchangeRates,
    });
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async addExchange() {
    const getApi = await fetchApi();
    const { saveExpenses, editar, func } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    saveExpenses({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: editar ? exchangeRates : getApi,
    });
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: valorTag,
    }));
    return editar && func();
  }

  render() {
    const { moedas, editar } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="expense-form-container">
        <label htmlFor="valor">
          Valor da despesa:
          <br />
          <input
            onChange={ this.handleInput }
            name="value"
            data-testid="value-input"
            id="valor"
            type="text"
            value={ value }
          />
        </label>
        <label htmlFor="descricao">
          Descrição da despesa:
          <br />
          <input
            onChange={ this.handleInput }
            name="description"
            data-testid="description-input"
            id="descricao"
            type="text"
            value={ description }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <br />
          <select
            onChange={ this.handleInput }
            data-testid="currency-input"
            name="currency"
            id="moeda"
            value={ currency }
          >
            {moedas.map((moeda) => (
              <option
                key={ moeda }
                value={ moeda }
              >
                {moeda}
              </option>))}
          </select>
        </label>
        <label
          htmlFor="pagamento"
        >
          Método de pagamento:
          <br />
          <select
            onChange={ this.handleInput }
            data-testid="method-input"
            name="method"
            id="pagamento"
            value={ method }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria:
          <br />
          <select
            onChange={ this.handleInput }
            data-testid="tag-input"
            name="tag"
            id="categoria"
            value={ tag }
          >
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
        </label>
        {editar
          ? (
            <button
              className="edit-btn"
              data-testid="edit-btn"
              onClick={ this.addExchange }
              type="button"
            >
              Editar despesa
            </button>)
          : (
            <button
              className="expense-btn"
              onClick={ this.addExchange }
              type="button"
            >
              Adicionar despesa
            </button>)}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
  despesas: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (array) => dispatch(getExpenses(array)),
});

Expenses.propTypes = {
  moedas: PropTypes.arrayOf(PropTypes.string),
  saveExpenses: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
