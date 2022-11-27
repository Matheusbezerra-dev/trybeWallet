/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { currencyAction, addExpenses, inEdit, handleEditor } from '../redux/actions';
import fetchCurrency from '../api/Api';
import {
  DivContainerOpacity,
  DivConatainerInput,
  InputDescription,
  SelectTag,
  InputValue,
  InputMethod,
  Selectcurrency,
} from '../style/style';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { handleCurrencyAction } = this.props;
    handleCurrencyAction();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { handleAddExpenses } = this.props;
    this.setState({
      exchangeRates: await fetchCurrency(),
    });
    handleAddExpenses(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form>
        <DivContainerOpacity>
          <DivConatainerInput>
            <label htmlFor="description">
              Descrição
              <InputDescription
                type="text"
                name="description"
                value={ description }
                data-testid="description-input"
                onChange={ this.handleChange }
                id="description"
              />
            </label>
            <label htmlFor="category-expenses">
              Categoria da despesa
              <SelectTag
                id="category-expenses"
                data-testid="tag-input"
                onChange={ this.handleChange }
                name="tag"
                value={ tag }
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </SelectTag>
            </label>
            <label htmlFor="expense">
              Valor
              <InputValue
                type="number"
                name="value"
                value={ value }
                data-testid="value-input"
                onChange={ this.handleChange }
                id="expense"
              />
            </label>

            <label htmlFor="checkout-payment">
              Forma de pagamento
              <InputMethod
                id="checkout-payment"
                data-testid="method-input"
                onChange={ this.handleChange }
                name="method"
                value={ method }
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </InputMethod>
            </label>

            <label htmlFor="currency">
              Moeda
              <Selectcurrency
                id="currency"
                data-testid="currency-input"
                onChange={ this.handleChange }
                name="currency"
                value={ currency }
              >
                {currencies.map((coin, index) => (
                  <option key={ index }>{coin}</option>
                ))}
              </Selectcurrency>
            </label>
          </DivConatainerInput>
        </DivContainerOpacity>
        <button
          type="button"
          data-testid="button-walletForm"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  handleCurrencyAction: (param) => dispatch(currencyAction(param)),
  handleAddExpenses: (param) => dispatch(addExpenses(param)),
  changeEdit: (param) => dispatch(inEdit(param)),
  changeEditor: (id) => dispatch(handleEditor(id)),
});

WalletForm.propTypes = {
  currencies: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
