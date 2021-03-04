import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class OrizzontalForm extends Form {
  state = {
    data: { filiale: "", nag: "", name: "", dataGiorno: "" },
    errors: {},
  };

  schema = {
    filiale: Joi.string().required().label("Filiale"),
    nag: Joi.number().required().label("NAG"),
    name: Joi.string().valid("").optional(),
    dataGiorno: Joi.valid("").optional(),
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleDateChange = (date) => {
    const data = { ...this.state.data };
    data["dataGiorno"] = date;

    this.setState({ data });
    console.log(data);
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    const { data } = this.state;
    this.props.getCustomers(data.filiale, data.nag, data.name);
    this.props.setTableVisible();
  };

  render() {
    this.props.componentDidMount();
    const array = [...this.props.filiali];
    const errorFil = this.state.errors.filiale;
    const errorNag = this.state.errors.nag;
    const { risposta, isConfirmedVisible } = this.props;

    return (
      <div className="m-4 pb-3">
        <h2 className="m-4">Ricerca Clienti</h2>
        <form
          className="row g-3"
          style={{ display: "flex", justifyContent: "center" }}
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label className="label label-default">Filiali</label>
            <select
              name="filiale"
              className="form-control"
              onChange={this.handleChange}
            >
              <option value="" />
              {array.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.nome}
                </option>
              ))}
            </select>
            {errorFil && <div className="alert alert-danger">{errorFil}</div>}
          </div>
          <div className="col-auto form-group">
            <label className="label label-default">NAG</label>
            <input
              type="text"
              name="nag"
              className="form-control"
              placeholder="NAG"
              onChange={this.handleChange}
            />
            {errorNag && <div className="alert alert-danger">{errorNag}</div>}
          </div>
          <div className="col-auto form-group">
            <label className="label label-default">Nome</label>
            <input
              type="text"
              name="name"
              disabled={this.validate()}
              className="form-control"
              placeholder="Nome"
              value={this.state.data.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-auto form-group">
            <label className="label label-default">Data di nascita</label>
            <div>
              <DatePicker
                className="form-control"
                selected={this.state.data.dataGiorno}
                onChange={this.handleDateChange}
                disabled={this.validate()}
                name="dataGiorno"
                dateFormat="yyyy/MM/dd"
              />
            </div>
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary form-control"
              style={{ marginTop: 32 }}
            >
              Search
            </button>
          </div>
        </form>
        {isConfirmedVisible && (
          <div className="alert alert-success">
            Conferma avvenuta con successo
            <button
              className="btn"
              onClick={() => {
                const { data } = this.state;
                this.props.getCustomers(data.filiale, data.nag, data.name);
                this.props.setConfirmed();
              }}
            >
              Chiudi
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default OrizzontalForm;
