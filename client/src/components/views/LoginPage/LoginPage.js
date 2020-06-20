//Component for Login Page
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
//import AdminPage from './views/AdminPage/AdminPage';


const { Title } = Typography;

function LoginPage(props) {
  
  const dispatch = useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState('')

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}

      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email Id is invalid')
          .required('Email Id is required'),

        password: Yup.string()
          .min(6, 'Password must have at least 6 characters')
          .required('Password is required'),

      })}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          //in redux, dispatch is an action used to change the state
          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.successLogin) {
                //window.localStorage.setItem('userId', response.payload.userId);
                //history.push. , it pushes a new entry into the history stack
                // - means redirecting the user to home route.
                //if its admin redirect to admin page
              //  if (response.payload.isAdmin) {
                if (response.payload.role === 1) {
                  props.history.push("/admin");
              } 
              else if (response.payload.role === 2) {
                props.history.push("/StoreManager");
              }
              else{
                props.history.push("/");
              }
              
              //if fail to login
             } else {
                setFormErrorMessage('Fail to login, Check out The Email or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Fail to login, Check out The Email or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;


        return (
          
          <div className="app">

            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} style={{ width: '500px' }}>

              <Form.Item required>
                <Input
                  id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter  email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in
                </Button>
                </div>
                Or <a href="/register">register now!</a>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                  Forgot Password
                  </a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


