import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

export default function ProtectedRoute({children}){
    const{token}=useSelector(state=>state.auth);
    const defState=useSelector(state=>state)
    // console.log('From Protected comp',defState)
    return token ? children : <Navigate to='/' replace />;
}