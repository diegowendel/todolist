import React from 'react';

import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateInput = (props) => {
  return (
    <Form.Group controlId={`data-${props.label}`}>
      <Form.Label className="d-block">{props.label}</Form.Label>
      <DatePicker className={`form-control ${props.classes}`}
        selected={props.value}
        onChange={props.onChange}
        placeholderText={props.placeholder}
        dateFormat="dd/MM/yyyy"/>
    </Form.Group>
  );
};

export default DateInput;
