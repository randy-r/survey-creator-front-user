import React, { Component } from 'react';
import { Form, Icon, Input, Button, Select, InputNumber } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class _BeginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  validadeEmail = (rule, value, callback) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value) {
      callback('Please insert email!');
      return;
    }
    const test = re.test(value.toLowerCase());
    if(!test)  {
      callback('Please insert a valid email!');
    }
    callback();
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const firstNameError = isFieldTouched('firstName') && getFieldError('firstName');
    const lastNameError = isFieldTouched('lastName') && getFieldError('lastName');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const genderError = isFieldTouched('gender') && getFieldError('gender');
    const educationLevelError = isFieldTouched('educationLevel') && getFieldError('educationLevel');
    const ageError = isFieldTouched('age') && getFieldError('age');
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={firstNameError ? 'error' : ''}
          help={firstNameError || ''}
        >
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your first name!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
            )}
        </FormItem>
        <FormItem
          validateStatus={lastNameError ? 'error' : ''}
          help={lastNameError || ''}
        >
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your last name!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
            )}
        </FormItem>
        <FormItem
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}
        >
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                validator: this.validadeEmail
              }
            ],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-Mail" />
            )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          validateStatus={genderError ? 'error' : ''}
          help={genderError || ''}
        >
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Gender"
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
            )}
        </FormItem>
        <FormItem
          validateStatus={ageError ? 'error' : ''}
          help={ageError || ''}
        >
          {getFieldDecorator('age', {
            rules: [{ required: true, message: 'Please input your age!' }],
          })(
            <InputNumber placeholder="Age" min={18} max={90} />
            )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          validateStatus={educationLevelError ? 'error' : ''}
          help={educationLevelError || ''}
        >
          {getFieldDecorator('educationLevel', {
            rules: [{ required: true, message: 'Please select your education level!' }],
          })(
            <Select
              placeholder="Education Level"
            >
              <Option value="school">School</Option>
              <Option value="highschool">High School</Option>
              <Option value="bachelor">Bachelor's</Option>
              <Option value="master">Master's</Option>
              <Option value="phd">PhD</Option>
            </Select>
            )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            START
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const BeginForm = Form.create()(_BeginForm);

export { BeginForm }