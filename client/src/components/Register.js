import React,{ useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import zxcvbn from "zxcvbn";

import { registerAction } from '../container/actions';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pass, setPass] = useState('');

    const initialValues = {
        username: '',
        email: '',
        password: '',
        passwordCheck: ''
    }
    
    const testResult = zxcvbn(pass);
    const num = testResult.score * 100/4;

    const onSubmit = (values,onSubmitProps) => {
        console.log('Form Data', values)
        const newUser = {
            username: values.username,
            email: values.email,
            password: pass,
            passwordCheck: values.passwordCheck
        }
        
        const validate = dispatch(registerAction(newUser));
        validate
         .then(data => {
            navigate('/login');
        })
        .catch(error => console.log(error))
        onSubmitProps.resetForm();
    }
    
    const validationSchema = yup.object({
        username: yup.string().required('Required!'),
        email: yup.string().email('Enter a valid email').required('Required!'),
        passwordCheck: yup.string().required('Required!')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    
    // const [username,setUsername] = useState("");
    // const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");
    // const [passwordCheck,setPasswordCheck] = useState("");

    // function submitHandller(event) {
    //     event.preventDefault();
        // const newUser = {
        //     username,
        //     email,
        //     password,
        //     passwordCheck
        // }
        // axios.post('http://localhost:5800/create',newUser)
        // .then(response => {
        //     console.log(response.data);
        // })
        // //onSubmitProps.resetForm();
        // .catch(error => {
        //     console.error('There was an error!', error);
        // })

        // console.log(newUser);
    // }

    const onValueChange = (e) => {
        setPass(e.target.value)
    }

    const funcProgressColor = () => {
        switch (testResult.score) {
            case 0:
                return '#828282';

            case 1:
                return '#EA1111';
            
            case 2:
                return '#FFAD00';

            case 3:
                return '#9bc158';

            case 4:
                return '#00b500';

            default:
                return 'none';
        }
    }
    const changePasswordColor = () => ({ 
        width: `${num}%`, 
        background: funcProgressColor(),
        height: '7px' 
    })
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className='form-control'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' name='username' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} placeholder='Enter username' />
                    { formik.touched.username && formik.errors.username ? <div className='error'>{formik.errors.username}</div>:null }
                </div>

                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} placeholder='Enter email' />
                    { formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div>:null }
                </div>

                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' onBlur={formik.handleBlur} onChange={(e) => onValueChange(e)} value={pass} placeholder='Enter password' />
                    <div className='progress mt-2' style={{height: '7px'}}>
                        <div className='progress-bar' style={changePasswordColor()}></div>
                    </div>
                    { formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div>:null }
                </div>

                <div className='form-control'>
                    <label htmlFor='passwordCheck'>Re Enter Password</label>
                    <input type='password' id='passwordCheck' name='passwordCheck' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.passwordCheck} placeholder='Renter password' />
                    { formik.touched.passwordCheck && formik.errors.passwordCheck ? <div className='error'>{formik.errors.passwordCheck}</div>:null }
                </div>
                
                <button className="btn btn-outline-primary" type='submit'>Register</button>
                <h3>Already Have Account? Click here to</h3>
                <button className="btn btn-outline-primary" type='button' onClick={() => navigate('/login')}>Login</button>
                {/* <nav>
                    <Link to='/login'>Login</Link>
                </nav> */}
            </form>
        </div>
    )
}

export default Register