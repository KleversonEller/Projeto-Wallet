import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Expenses extends React.Component {
  render() {
    const { moedas } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor da despesa:
          <input
            // onChange={ this.handleInput }
            name="valor"
            data-testid="value-input"
            id="valor"
            type="number"
          />
        </label>
        <label htmlFor="descricao">
          Descrição da despesa:
          <input
            // onChange={ this.handleInput }
            name="descricao"
            data-testid="description-input"
            id="descricao"
            type="text"
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            name="moeda"
            id="moeda"
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
          Método de pagamento
          <select
            data-testid="method-input"
            name="pagamento"
            id="pagamento"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cardC">Cartão de crédito</option>
            <option value="cardD">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria
          <select
            data-testid="tag-input"
            name="categoria"
            id="categoria"
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        {/* <button
          onClick={ this.saveEmail }
          disabled={ !this.validBtn() }
          type="button"
        >
          Entrar
        </button> */}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
});

Expenses.propTypes = {
  moedas: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(Expenses);
