import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Delete from './deleteBtn';
import Expenses from './expensesForm';
import './expensesTable.css';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      editar: false,
      id: '',
    };
    this.editClick = this.editClick.bind(this);
    this.editClickForm = this.editClickForm.bind(this);
  }

  editClick({ target }) {
    const { name } = target;
    this.setState((prev) => ({
      editar: !prev.editar,
      id: name,
    }));
  }

  editClickForm() {
    this.setState((prev) => ({
      editar: !prev.editar,
    }));
  }

  render() {
    const { expenses } = this.props;
    const { editar, id } = this.state;
    return (
      <div>
        {editar ? <Expenses idEdit={ id } func={ this.editClickForm } editar={ editar } />
          : (
            <table>
              <thead>
                <tr>
                  <th> Descrição </th>
                  <th> Tag </th>
                  <th> Método de pagamento </th>
                  <th> Valor </th>
                  <th> Moeda </th>
                  <th> Câmbio utilizado </th>
                  <th> Valor convertido </th>
                  <th> Moeda de conversão </th>
                  <th> Editar/Excluir </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((objeto) => (
                  <tr key={ objeto.id }>
                    <td>
                      { objeto.description }
                    </td>
                    <td>
                      { objeto.tag }
                    </td>
                    <td>
                      { objeto.method }
                    </td>
                    <td>
                      { `${objeto.value}.00` }
                    </td>
                    <td>
                      { Object.values(objeto.exchangeRates)
                        .find((moeda) => moeda.code === objeto.currency).name
                        .split('/')[0] }
                    </td>
                    <td>
                      {+(+(Object.values(objeto.exchangeRates)
                        .find((moeda) => moeda.code === objeto.currency).ask)).toFixed(2)}
                    </td>
                    <td>
                      { +(+objeto.value * +(Object.values(objeto.exchangeRates)
                        .find((moeda) => moeda.code === objeto.currency).ask))
                        .toFixed(2) }
                    </td>
                    <td>
                      Real
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        data-testid="edit-btn"
                        onClick={ this.editClick }
                        name={ objeto.id }
                        type="button"
                      >
                        Editar despesa
                      </button>
                      <Delete id={ objeto.id } />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(Table);
