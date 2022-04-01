import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.somField = this.somField.bind(this);
  }

  somField() {
    const { expenses } = this.props;
    const field = expenses.map((object) => object)
      .reduce((soma, valor) => soma + +valor.value * +(Object.values(valor.exchangeRates)
        .find((moeda) => moeda.code === valor.currency).ask), 0);
    return field.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          { email }
        </span>
        <span data-testid="total-field">
          { this.somField() }
        </span>
        <span data-testid="header-currency-field"> BRL </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(Header);
