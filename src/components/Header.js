import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, array } from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, crr) => {
      const { value, currency, exchangeRates } = crr;
      const { ask } = exchangeRates[currency];
      return acc + (value * ask);
    }, 0);
    return (
      <div>
        <h2>Trybe Wallet</h2>
        <p data-testid="email-field">{`${email || 'Usuario()'}`}</p>
        <p data-testid="total-field">{ totalExpenses.toFixed(2) || 0 }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: string,
  expenses: array,
}.isRequired;

export default connect(mapStateToProps)(Header);
