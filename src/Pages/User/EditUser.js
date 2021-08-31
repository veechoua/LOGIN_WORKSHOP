import React,{useEffect, useState} from "react";
import { useHistory } from "react-router";
import {Formik} from 'formik'
import axios from "axios";
export default function EditUser() {
  const history = useHistory();
  let api = "http://localhost:5000/we-use-router";
  const data = history?.location?.state;
  const [ddata, setDdata] = useState([])
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  // query data for eidt
  const _getUser=() =>{
    axios.get(`${api}/getuser/${data}`)
    .then(res=>{setDdata(res)})
    .catch(err=> console.log(err))
  }
    useEffect(() => {
       _getUser();
       console.log("vee:",ddata);
    }, [])
  return (
    <div>
      <div className="container">
        <br />
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              /> 
              {errors.email && touched.email && errors.email}<br />
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}

              />
              {errors.password && touched.password && errors.password}
              <br />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
