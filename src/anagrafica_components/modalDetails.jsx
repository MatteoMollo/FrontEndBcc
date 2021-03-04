import React, { Component } from "react";
import Input from "./common/input";
import config from "../config.json";
import { axios } from "axios";
import TableModal from "./tableModal";
import ModalConfirmed from "./modalConfirmed";

class ModalDetails extends Component {
  state = {
    markAsEdited: {
      id: null,
      telefono: false,
      email: false,
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
      firma: false,
    },
    small: "modal-dialog modal-md",
    big: "modal-dialog modal-lg",
  };

  handleChange = (event) => {
    const markAsEdited = { ...this.state.markAsEdited };
    markAsEdited.id = event.target.id;
    markAsEdited[event.target.name] = !this.state.markAsEdited[
      event.target.name
    ];
    this.setState({ markAsEdited, isChecked: true });
    console.log(markAsEdited);
  };

  render() {
    const { customer, setConfirmed } = this.props;
    const { small, big } = this.state;

    return (
      <div
        className="modal fade"
        id="myModal"
        role="dialog"
        onEnded={this.props.handleEnded}
      >
        <div className={customer.confermato ? small : big}>
          <div className="modal-content">
            {customer.confermato ? (
              <ModalConfirmed customer={customer} />
            ) : (
              <TableModal
                setConfirmed={setConfirmed}
                customer={customer}
                handleChange={this.handleChange}
                markAsEdited={this.state.markAsEdited}
                variazioneClienti={this.props.variazioneClienti}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalDetails;
