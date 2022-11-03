import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeId, handleEditor } from '../redux/actions';

class Table extends Component {
  handleEdit = ({ target }) => {
    const { HANDLEEDITOR } = this.props;
    const { id } = target;
    HANDLEEDITOR(id);
  };

  handleClick = ({ target }) => {
    const { dispatchRemoveId } = this.props;
    const { id } = target;
    dispatchRemoveId(id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {
                  Number(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)
                }
              </td>
              <td>BRL</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  id={ expense.id }
                  onClick={ this.handleClick }
                >
                  Excluir
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  id={ expense.id }
                  onClick={ this.handleEdit }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveId: (id) => dispatch(removeId(id)),
  HANDLEEDITOR: (id) => dispatch(handleEditor(id)),
});

Table.propTypes = {
  id: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
