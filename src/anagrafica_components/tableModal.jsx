import React, { Component } from "react";

class TableModal extends Component {
  state = {
    isConfermato: false,
    isChecked: false,
    inv: "btn btn-primary invisible",
    vis: "btn btn-primary btn-block",
    footer: "modal-footer",
    invfooter: "modal-footer invisible",
  };

  setConfermato = () => {
    this.setState({ isConfermato: !this.state.isConfermato });
  };

  controlloModifica = (markAsEdited) => {
    if (markAsEdited.id === null) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { customer, handleChange, setConfirmed } = this.props;
    const { isConfermato, inv, vis, footer, invfooter } = this.state;
    const markAsEdited = { ...this.props.markAsEdited };

    return (
      <React.Fragment>
        <div className="modal-header modale-testa">
          <h2 className="w-100">{customer.nome}</h2>
          <button type="button" className="close" data-dismiss="modal">
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="modal-body mb-0 pb-0">
          {isConfermato && (
            <div className="alert alert-warning">
              Sicuro di voler confermare?
              <button
                className="btn"
                data-dismiss="modal"
                onClick={() => {
                  this.props.variazioneClienti(markAsEdited);
                  this.setConfermato();
                  setConfirmed();
                }}
              >
                Conferma
              </button>
              <button className="btn" onClick={() => this.setConfermato()}>
                Annulla
              </button>
            </div>
          )}
          <table className="table table-sm">
            <tbody>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    NAG
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.nag}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    Data di nascita
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.dataNascita}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    Numero di telefono
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.telefono}
                  </label>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="telefono"
                    disabled={isConfermato}
                    id={customer.id}
                    defaultChecked={markAsEdited.telefono}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    Email
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.email}
                  </label>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="email"
                    disabled={isConfermato}
                    id={customer.id}
                    defaultChecked={markAsEdited.email}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    Privacy 1:
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.p1 ? "Sì" : "No"}
                  </label>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    disabled={isConfermato}
                    id={customer.id}
                    name="p1"
                    defaultChecked={markAsEdited.p1}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    Privacy 2:
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.p2 ? "Sì" : "No"}
                  </label>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={customer.id}
                    disabled={isConfermato}
                    name="p2"
                    defaultChecked={markAsEdited.p2}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    Privacy 3:
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.p3 ? "Sì" : "No"}
                  </label>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={customer.id}
                    disabled={isConfermato}
                    name="p3"
                    defaultChecked={markAsEdited.p3}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    Privacy 4:
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.p4 ? "Sì" : "No"}
                  </label>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={customer.id}
                    disabled={isConfermato}
                    name="p4"
                    defaultChecked={markAsEdited.p4}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    Privacy 5:
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.p5 ? "Sì" : "No"}
                  </label>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={customer.id}
                    disabled={isConfermato}
                    name="p5"
                    defaultChecked={markAsEdited.p5}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    Privacy 6:
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.p6 ? "Sì" : "No"}
                  </label>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={customer.id}
                    disabled={isConfermato}
                    name="p6"
                    defaultChecked={markAsEdited.p6}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    Firma grafometrica:
                  </label>
                </td>
                <td>
                  <label className="col-sm-2 m-2 text-md-left col-md-12">
                    {customer.firma ? "Sì" : "No"}
                  </label>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={customer.id}
                    disabled={isConfermato}
                    name="firma"
                    defaultChecked={markAsEdited.firma}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={isConfermato ? invfooter : footer}>
          <button
            type="button"
            className={isConfermato ? inv : vis}
            onClick={() => {
              this.controlloModifica(markAsEdited)
                ? this.setConfermato()
                : this.setState({ isErrore: true });
            }}
          >
            Conferma
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default TableModal;
