import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      redirect: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.validBtn = this.validBtn.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  validBtn() {
    const senhaLength = 6;
    const { email, senha } = this.state;
    const validaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validaSenha = senha.length >= senhaLength;

    return validaEmail && validaSenha;
  }

  saveEmail() {
    const { getEmail } = this.props;
    const { email } = this.state;

    getEmail(email);

    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    return (
      <>
        <form>
          <h2> Login </h2>
          <label htmlFor="email">
            E-mail:
            <input
              onChange={ this.handleInput }
              name="email"
              data-testid="email-input"
              id="email"
              type="text"
            />
          </label>
          <label htmlFor="senha">
            Senha:
            <input
              onChange={ this.handleInput }
              name="senha"
              data-testid="password-input"
              id="senha"
              type="password"
            />
          </label>
          <button
            onClick={ this.saveEmail }
            disabled={ !this.validBtn() }
            type="button"
          >
            Entrar
          </button>
        </form>
        {redirect && <Redirect to="/carteira" />}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(getUser(email)),
});

Login.propTypes = {
  getEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
