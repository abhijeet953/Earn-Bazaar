import Axios from 'axios';
const axiosBaseURL = Axios.create({
    baseURL: process.env.REACT_APP_AXIOS_BASEURL_API ||"http://localhost:5000/api"
});
axiosBaseURL.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const writePost = (FormData) => axiosBaseURL.post('/posts', FormData);

export const signIn = (FormData) => axiosBaseURL.post('/auth/login', FormData);
export const register = (FormData) => axiosBaseURL.post('/auth/register', FormData);


export default axiosBaseURL