import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import EditForm from '../components/EditForm';

class Wallet extends Component {
  render() {
    const { edit } = this.props;
    return (
      <>
        <header>
          <Header />
        </header>
        <main>
          {edit ? <EditForm /> : <WalletForm />}
          <Table />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  edit: state.wallet.editor,
});

Wallet.propTypes = {
  edit: bool,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
