import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import mockData from './mockData';
import INITIAL_STATE from './inicial_mock';
import renderWithRouterAndRedux from './renderWith';

const EMAIL = 'alguem@alguem.com';
const EMAIL_INPUT = 'email-input';
const PASSOWORD_INPUT = 'password-input';

describe('Verificando se a aplicação está funcionando corretamente.', () => {
  it('Verificando o login', () => {
    renderWithRouterAndRedux(<App />);
    const about = screen.getByRole('heading', { name: /TrybeWallet/i }, { level: 2 });
    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSOWORD_INPUT);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(about).toBeInTheDocument();
  });

  it('Testando o login', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSOWORD_INPUT);
    const btn = screen.getByTestId('login-button');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);

    expect(email).toHaveValue('');
    expect(password).toHaveValue('');

    userEvent.type(email, EMAIL);
    userEvent.type(password, '123456');
    expect(email).toHaveValue(EMAIL);
    expect(password).toHaveValue('123456');

    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');

    const { user } = store.getState();
    expect(user.email).toBe(EMAIL);
  });

  it('vertificando o componente walletForm', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSOWORD_INPUT);
    const btn = screen.getByTestId('login-button');

    userEvent.type(email, EMAIL);
    userEvent.type(password, '123456');

    expect(email).toHaveValue(EMAIL);
    expect(password).toHaveValue('123456');

    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const btnWalley = screen.getByTestId('button-walletForm');

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(btnWalley).toBeInTheDocument();
  });

  it('Verificando se a função handleChange altera o valor do estado ao digitar no campo correspondente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSOWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/carteira');

    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '100');
    expect(valueInput).toBeInTheDocument();
  });

  it('Verificando se é possivel editar despesas', () => {
    renderWithRouterAndRedux(<App />, { initialState: INITIAL_STATE, initialEntries: ['/carteira'] });

    const editBtn = screen.getAllByRole('button', { name: /editar/i });
    expect(editBtn).toHaveLength(2);
    userEvent.click(editBtn[1]);

    const expenseValue = screen.getByLabelText(/despesa/i);
    const expenseDescription = screen.getByLabelText(/descrição/i);
    const expenseCoin = screen.getByLabelText(/moeda/i);
    const expenseMethod = screen.getByLabelText(/forma de pagamento/i);
    const expenseTagSelect = screen.getByLabelText(/categoria/i);
    const editExpenseButton = screen.getAllByRole('button', { name: /editar despesa/i });

    userEvent.type(expenseValue, '100');
    userEvent.type(expenseDescription, 'Restaurante');

    userEvent.selectOptions(expenseCoin, 'CAD');

    userEvent.selectOptions(expenseMethod, 'Dinheiro');
    userEvent.selectOptions(expenseTagSelect, 'Alimentação');
    userEvent.click(editExpenseButton[0]);

    expect(screen.getByText('100.00')).toBeInTheDocument();
    expect(screen.getByText('Restaurante')).toBeInTheDocument();
  });

  it('Verificando se a despesa é adicionada na tabela', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSOWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/carteira');

    const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(addExpenseBtn);

    const { wallet: { editor } } = store.getState();
    expect(editor).toBeFalsy();
    expect(typeof (editor)).toBe('boolean');

    const deleteBtn = await screen.findByRole('button', { name: /Excluir/i });
    expect(deleteBtn).toBeInTheDocument();
    const editBtn = await screen.findByRole('button', { name: /Editar/i });
    expect(editBtn).toBeInTheDocument();
  });

  it('verificando se a despesa é excluída da tabela ao clicar no botão Excluir', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSOWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/carteira');

    const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(addExpenseBtn);

    const { wallet: { editor } } = store.getState();
    expect(editor).toBeFalsy();
    expect(typeof (editor)).toBe('boolean');

    const deleteBtn = await screen.findByRole('button', { name: /Excluir/i });
    expect(deleteBtn).toBeInTheDocument();
    const editBtn = await screen.findByRole('button', { name: /Editar/i });
    expect(editBtn).toBeInTheDocument();
    userEvent.click(deleteBtn);
    expect(deleteBtn).not.toBeInTheDocument();
  });

  it('verificando se é possível editar e salvar a alteração da despesa', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSOWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/carteira');

    const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(addExpenseBtn);

    const editBtn = await screen.findByRole('button', { name: /Editar/i });
    userEvent.click(editBtn);
    const { wallet: { editor } } = store.getState();
    expect(editor).toBeTruthy();
    expect(typeof (editor)).toBe('boolean');

    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'combustível');

    const saveEditExpenseBtn = screen.getByRole('button', { name: /Editar despesa/i });
    expect(saveEditExpenseBtn).toBeInTheDocument();
    userEvent.click(saveEditExpenseBtn);
    expect(descriptionInput).toHaveProperty('value', 'combustível');
  });

  it('Verificando se a API foi chamada', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    const { history, store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSOWORD_INPUT);
    const loginBtn = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/carteira');

    const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(addExpenseBtn);
    expect(global.fetch).toBeCalledTimes(2);

    const { wallet: { editor } } = store.getState();
    expect(editor).toBeFalsy();
    expect(typeof (editor)).toBe('boolean');
  });
});
