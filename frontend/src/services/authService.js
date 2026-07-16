import axios from 'axios'

const API_URL = 'http://localhost:5000/auth';

export const loginUser = async(data)=>{
    const{email,password}=data;
    const response = await axios.post(`${API_URL}/login`,data);
    console.log('authService Response',response)
    if(response.data.token){
        localStorage.setItem('token',response.data.token)
        return response.data.token;
    }else{
        return response.data.message;
    }
}
