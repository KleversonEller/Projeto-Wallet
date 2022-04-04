import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkGetCurrencies } from '../actions';
import Header from '../components/header';
import Table from '../components/expensesTable';
import Expenses from '../components/expensesForm';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      editar: false,
      id: '',
    };
    this.editClick = this.editClick.bind(this);
    this.editClickForm = this.editClickForm.bind(this);
  }

  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
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
    const { id, editar } = this.state;
    return (
      <div>
        {editar
          ? (
            <>
              <header>
                <Header />
              </header>
              <Expenses idEdit={ id } func={ this.editClickForm } editar={ editar } />
            </>
          )
          : (
            <>
              <header>
                <Header />
              </header>
              <article>
                <Expenses />
                <Table func={ this.editClick } />
              </article>
            </>
          )}
      </div>
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
