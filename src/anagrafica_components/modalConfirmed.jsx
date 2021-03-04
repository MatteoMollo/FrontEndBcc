import React, { Component } from "react";

class ModalConfirmed extends Component {

  render() {
    const { customer } = this.props;

    return (
      <React.Fragment>
        <div className="modal-header">
          <h2 className="w-100">Cliente confermato</h2>
          <button type="button" className="close" data-dismiss="modal">
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="modal-body">
          <table className="table table-striped" border="0">
            <thead>
              <tr>
                <th scope="col">Attenzione</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label className="col-sm-2 m-2 text-md-center col-md-12">
                    Il Cliente selezionato è già stato confermato <br />
                    Il suo codice è: {customer.nag}
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default ModalConfirmed;
