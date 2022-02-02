import React,{ useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from '../container/actions';
import * as yup from 'yup'
import axios from 'axios'

import Logout from './Logout';
import { addUrlAction } from '../container/actions';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState();
    const [urls, setUrls] = useState([]);
    const [id, setId] = useState('');
    const [users,setUser] = useState([]);

    const initialValues = {
        url: ''
    }
    
    const auth = localStorage.getItem('token');
    const getUserData = async () => {
        await axios.get('https://url-ap.herokuapp.com/api/urlist',{
            headers: {
                'auth' : auth
            }
        })
        .then(res => {
            setUsername(res.data.username);
            setUrls(res.data.urls);
            setId(res.data._id);
            setUser(res.data);
        })
    }

    
    const deleteUrl = async (id) => {
        console.log(id);
        await axios.delete(`https://url-ap.herokuapp.com/api/deleteUrl/${id}`,{
            headers: {
                'auth' : auth
            }
        })
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        })

        getUserData();
    }

    const onSubmit = (values,onSubmitProps) => {
        console.log('Form Data', values);
        const newUrl = {
            url: values.url
        }

        const add = dispatch(addUrlAction(newUrl));
        add
         .then(data => {
            navigate('/dashboard');
        })
        .catch(error => console.log(error))
        onSubmitProps.resetForm();
    }

    const validationSchema = yup.object({
        url: yup.string().required('Required!'),
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    const logout = () => {
        dispatch(logoutAction())
    }

    const user = useSelector(state => state.isLogedIn); 

    const route = () => {
        const token = localStorage.getItem('token')
        return token ? true:false
    }

    useEffect(() => {
        if (!route()) {
            navigate('/login');
        }
        getUserData();
    },[route,navigate,getUserData]);

    return (
        <div>
            <Logout onLogout={logout}></Logout>
            <h2>Hello {username}</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                <input type='text' id='url' name='url' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.url} placeholder='Enter Url to be added...' />
                { formik.errors.url ? <div className='error'>{formik.errors.url}</div>:null }
                </div>
                <button className="btn btn-outline-primary" type='submit'>Add Url</button>
            </form>
            <table>
                <tr>
                    <th>URL</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {urls.map((url)=>(
                <tr>
                    <td><a href={url.url} target='_blank'>{url.url}</a></td>
                    <td>
                        <button className="btn btn-outline-primary" onClick={() => navigate(`/edit/${url._id}`)}>Edit</button>
                    </td>
                    <td>
                        <button className="btn btn-outline-primary" type='submit' onClick={() => deleteUrl(url._id)}>Delete</button>
                    </td>
                </tr>
              ))}
            </table>
        </div>
    )
}

export default Dashboard