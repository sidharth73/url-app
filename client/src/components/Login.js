import React,{ useState } from 'react'
import { useFormik } from 'formik'
//import axios from 'axios'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useStore } from 'react-redux'
import ErrorAlter from "./ErrorAlter";

import { loginAction } from '../container/actions';


const Login = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = useStore();
    // const [username, setUsername] = useState("")
    const [errorMessage, setError] = useState("");

    const initialValues = {
        email: '',
        password: ''
    }
    const onSubmit = (values,onSubmitProps) => {
        console.log('Form Data', values);
        const userCredential = {
            email: values.email,
            password: values.password
        }
        const login = dispatch(loginAction(userCredential));
        login
          .then((data) => {
              navigate('/dashboard');
              console.log(data);
            //   setUsername(data.username)
          })
          .catch((error) => {
              setError(error.err)
              // console.log(error.err);
          })
        console.log(store.getState()); 
        onSubmitProps.resetForm();
    }
    
    const validationSchema = yup.object({
        email: yup.string().email('Enter a valid email').required('Required!'),
        password: yup.string().required('Required!')
    })
    
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <div>
            <h1>Sign into your account</h1>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                    { formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div>:null }
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                    { formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div>:null }
                </div>
                {
                    errorMessage && <ErrorAlter errorMessage={errorMessage}></ErrorAlter>
                }
                <button className="btn btn-outline-primary" type='submit'>Login</button>
                <h3>Don't Have Account? Click here to</h3>
                <button className="btn btn-outline-primary" type='button' onClick={() => navigate('/')}>Register</button>
                {/* <nav>
                    <Link to='/'>Register</Link>
                </nav> */}
            </form>
        </div>
    )
}

export default Login