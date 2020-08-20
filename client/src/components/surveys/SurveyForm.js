import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        {formFields.map((field) => (
          <Field
            key={field.name}
            component={SurveyField}
            name={field.name}
            label={field.label}
            type="text"
          />
        ))}
      </div>
    );
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next<i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");
  formFields.forEach((field) => {
    if (!values[field.name]) {
      errors[field.name] = `You must provide a ${field.name}`;
    }
  });
  return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
