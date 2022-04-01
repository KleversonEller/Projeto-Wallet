import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkGetCurrencies } from '../actions';
import Header from '../components/header';
import Table from '../components/expensesTable';
import Expenses from '../components/expensesForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
  }

  render() {
    return (
      <>
        <header>
          <Header />
        </header>
        <article>
          <Expenses />
          <Table />
        </article>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(thunkGetCurrencies()),
});

Wallet.propTypes = {
  fetchApi: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Wallet);
