import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { currencyAction, addExpenses, inEdit, handleEditor } from '../redux/actions';

class EditForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
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
    const { edit } = this.props;
    edit(this.state);
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
        <label htmlFor="expense">
          Despesas
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
            id="expense"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
            id="description"
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            name="currency"
            value={ currency }
          >
            {currencies.map((coin, index) => (
              <option key={ index }>{coin}</option>
            ))}
          </select>
        </label>
        <label htmlFor="checkout-payment">
          Forma de pagamento
          <select
            id="checkout-payment"
            data-testid="method-input"
            onChange={ this.handleChange }
            name="method"
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category-expenses">
          Categoria
          <select
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
          </select>
        </label>
        <button
          type="button"
          data-testid="button-handleEdit"
          onClick={ this.handleClick }
        >
          Editar Despesas
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
  edit: (param) => dispatch(inEdit(param)),
  handleEditor: (id) => dispatch(handleEditor(id)),
});

EditForm.propTypes = {
  currencies: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
