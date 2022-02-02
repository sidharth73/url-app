import axios from 'axios'

//const baseURL = 'http://localhost:5800'
const baseURL = 'https://url-ap.herokuapp.com'
//register request
const register = (newUser) => {
    return axios.post(`${baseURL}/register`,newUser)
    .then(response => {
        return Promise.resolve(response.data);
    })
    .catch(error => {
        return Promise.reject(error.response.data);
    })
}

const login = (userCredential) => {
    return axios.post(`${baseURL}/login`,userCredential)
    .then(response => {
        if (response.data.token) {
            console.log(response.data.token);
            localStorage.setItem('token',response.data.token);
        }
        return Promise.resolve(response.data);
    })
    .catch(error => {
        return Promise.reject(error.response.data);
    })
}

const logout = () => {
    localStorage.removeItem('token');
    return { msg: "Logout Successfully!" }
}

const addUrl = (newUrl) => {
    const auth = localStorage.getItem('token');
    
    // localStorage.setItem('auth',auth);
    return axios.post(`${baseURL}/api/createUrl`,newUrl,{
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
}

const updateUrl = (newUrl) => {
    const auth = localStorage.getItem('token');
    console.log(newUrl);
    // localStorage.setItem('auth',auth);
    return axios.put(`${baseURL}/api/editUrl/${newUrl.id}`,newUrl,{
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
}

const deleteUrl = (id) => {
    const auth = localStorage.getItem('token');
    return axios.post(`${baseURL}/api/deleteUrl`, id,{
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
}

export {
    register,
    login,
    logout,
    addUrl,
    deleteUrl,
    updateUrl
}