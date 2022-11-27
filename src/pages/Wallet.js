import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import EditForm from '../components/EditForm';
import { DivHeader } from '../style/style';

class Wallet extends Component {
  render() {
    const { edit } = this.props;
    return (
      <>
        <DivHeader>
          <Header />
          {edit ? <EditForm /> : <WalletForm />}
        </DivHeader>
        <main>
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
