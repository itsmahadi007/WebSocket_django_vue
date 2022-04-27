import axios from 'axios'

// const userData = JSON.parse(localStorage.getItem("userData"))


const instance = axios.create({

    // baseURL: 'http://161.97.157.117:8001/api/',
    baseURL: 'http://127.0.0.1:8000/api/',
    // headers: {'Authorization': userData ? `token ${userData.token}` : ''}
});
// const instance = axios.create({
//   baseURL: 'https://api.dreamfuturetech.com/api/',
//   headers: {'Authorization': userData ? `token ${userData.token}` : ''}
// });


export default instance
