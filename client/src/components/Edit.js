import React,{ useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from 'formik'
import { useDispatch } from "react-redux";
import { updateUrlAction } from '../container/actions';
import axios from 'axios'

const Edit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues = {
        url: ''
    }
    const [url,setUrl] = useState(initialValues);

    useEffect(() => {
        loadUrl();
    }, []);
    
    const { id } = useParams();
    const auth = localStorage.getItem('token');

    const getUrl = async (id) => {
        return await axios.get(`https://url-ap.herokuapp.com/api/getUser/${id}`,{
            headers: {
                'auth' : auth
            }
        });
    }
    
    const loadUrl = async () => {
        const response = await getUrl(id);
        setUrl(response.data.url);
    }

    const onSubmit = (values,onSubmitProps) => {
        console.log('Form Data', values);
        const newUrl = {
            url: url,
            id: id
        }

        const update = dispatch(updateUrlAction(newUrl));
        update
         .then(data => {
            navigate('/dashboard');
            console.log(data);
        })
        .catch(error => console.log(error))
        onSubmitProps.resetForm();
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })
    //const { url } = url;

    // const editUrl = async (id, url) => {
    //     return await axios.patch(`http://localhost:5800/api/editUrl/${id}`,url)
    // }

    // const editUrlDetails = async() => {
    //     console.log(id);
    //     console.log(url);
    //     const { data } = await editUrl(id,url);
        
    //     console.log(data);
    //     navigate('/dashboard');
    // }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUrl(e.target.value)
    }

  return (
  <div>
    <h2>Edit Url</h2>
    <form onSubmit={formik.handleSubmit}>
        <div className='form-control'>
            <input type='text' id='url' name='url' onBlur={formik.handleBlur} onChange={(e) => onValueChange(e)} value={url} />
            { formik.errors.url ? <div className='error'>{formik.errors.url}</div>:null }
        </div>
        <button className="btn btn-outline-primary" type='submit'>Update Url</button>
    </form>
  </div>
  );
};

export default Edit;
