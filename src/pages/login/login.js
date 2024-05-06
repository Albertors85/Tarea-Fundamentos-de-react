import { useState } from 'react';
import { login } from "./service.js";
import Layout from '../../components/layout/layout.js';
import { useAuth } from './context.js';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginUser (){
    const location = useLocation();
    const navigate = useNavigate(); 
    const {onLogin}= useAuth();
    const [isFetching, setIsFetching]= useState(false);
    const [error, setError]= useState(null);
    const [formValue, setFormValue]= useState({
        username:'',
        password:''
        }
    );
    const handlerChange = event =>{
        setFormValue(currentFormValues=>({
            ...currentFormValues,
            [event.target.name]:event.target.value,
        }));
    };

    const [memory, setMemory]=useState(false);

    const handleMemory = event =>{
        setMemory(event.target.checked)
    }

   
    const handlerSubmit = async (event)=>{
        event.preventDefault();
        try{
            setIsFetching(true)
            await login(formValue,memory);
            setIsFetching(false)
            onLogin();
            const goTo = location.state?.from || '/';
            navigate(goTo);


        }catch(error){
            setIsFetching(false)
            setError(error)
        }
        
    };

    const {username, password}=formValue;
    const buttonDisable =!username || !password || isFetching;

    return (
        <Layout title="bienvenido">
            <div>
                <h1>Log in</h1>
                <form onSubmit={handlerSubmit}>
                    <input type="text" name="username" value={username} onChange={handlerChange}/>
                    <input type="password" name="password" value={password} onChange={handlerChange}/>
                    <br></br>
                    <input type="checkbox" name="memory" checked={memory} onChange={handleMemory}/>
                    <label>Desaeas ser recordado</label>
                    <br></br>
                    <button type="submit" disabled={buttonDisable}>Log in</button>
                </form>
                {error &&  <div>{error.message}</div>}
            </div>

        </Layout>)
        
        
}

export default LoginUser