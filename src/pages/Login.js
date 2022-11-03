import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      email,
      password,
    } = this.state;
    const { history, user } = this.props;
    const magaicNumber = 6;
    const validPassword = password.length >= magaicNumber;
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const valid = validEmail && validPassword;

    return (
      <div>
        <h2>TrybeWallet</h2>
        <form>
          <input
            type="text"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
            name="email"
            placeholder="Digite o seu email..."
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
            name="password"
            placeholder="Digite o sua senha..."
          />
          <button
            type="button"
            disabled={ !valid }
            data-testid="login-button"
            onClick={ () => {
              history.push('/carteira');
              user(this.state);
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user: (state) => dispatch(userLogin(state)),
});

Login.propTypes = {
  user: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
