import React, { Component } from "react";
import ModalDetails from "./modalDetails";

export default class ListaClienti extends Component {
  state = {
    showDettaglio: true,
    customer: {},
  };

  selezionaCliente = (customer) => {
    this.setState({ showDettaglio: true, customer });
    console.log(customer.confermato);
  };

  refresh = () => {
    this.render();
  };

  variazioneCliente = (markAsEdited) => {
    this.props.setVariazioneClienti(markAsEdited);
  };

  updateComponent = () => {
    this.forceUpdate();
  };

  renderTable = (customers, tableClass) => {
    return (
      <table className={tableClass}>
        <thead>
          <tr>
            <th scope="col">Filiale</th>
            <th scope="col">CAB</th>
            <th scope="col">NAG</th>
            <th scope="col">Nome</th>
            <th scope="col">Data di Nascita</th>
            <th scope="col">Dettagli</th>
          </tr>
        </thead>
        <tbody>
          {customers.slice(0, 5).map((customer) => (
            <tr key={customer.id} value={customer.id}>
              <td scope="row">{customer.filiali.nome}</td>
              <td>{customer.cab}</td>
              <td>{customer.nag}</td>
              <td>{customer.nome}</td>
              <td>{customer.dataNascita}</td>
              <td>
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#myModal"
                  data-backdrop="static"
                  data-keyboard="false"
                  onClick={() => this.selezionaCliente(customer)}
                >
                  {customer.confermato ? (
                    <i class="fa fa-check" aria-hidden="true"></i>
                  ) : (
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    const {
      customers,
      tableClass,
      setConfirmed,
      handleEnded
    } = this.props;

    return (
      <div>
        {this.state.showDettaglio ? (
          <ModalDetails
            updateComponent={this.updateComponent}
            customer={this.state.customer}
            variazioneClienti={this.variazioneCliente}
            setConfirmed={setConfirmed}
            handleEnded={handleEnded}
          />
        ) : (
          ""
        )}
        {this.renderTable(customers, tableClass)}
      </div>
    );
  }
}
