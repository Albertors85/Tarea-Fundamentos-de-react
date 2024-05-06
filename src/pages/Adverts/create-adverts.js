import { useState } from "react";
import Layout from "../../components/layout/layout.js";
import { createAdvert } from "./services.js";
import { useNavigate } from "react-router-dom";

export default function NewAdvert(){
    const navigate = useNavigate();
    const [formValue, setFormValue]= useState({
        name:'',
        price:'',
        info:'',
        situation:'',
        tags:[],
        }
    );

    const handleSubmit= async (event)=>{
        event.preventDefault();
        try{
            const {name, price, info, situation,tags}= formValue;
            const newAdvert = await createAdvert({name, price, info, situation, tags});
            navigate('/')
        }catch(error){
            if(error.status=== 401){
                navigate('/login');
            }

        }
    }
    
    const handlerChange = event =>{
        setFormValue(currentFormValues=>({
            ...currentFormValues,
            [event.target.name]:event.target.value,
        }));
    };

    return (
    <Layout> Agrega tu Anuncio


        <form onSubmit={handleSubmit} > 
            <label>nombre</label>
            <input type="text" name="name"   value={formValue.name}  onChange={handlerChange} required/>
            <br></br>

            <label>Precio</label>
            <input type="text" name="price"  value={formValue.price}   onChange={handlerChange} required />

            <br></br>
            <select id="option" name="situation" value={formValue.situation} onChange={handlerChange} required >
                <option value="Venta" name="venta"  >Venta</option>
                <option  value="Compra"  >Compra</option>
            </select>
            <br></br>
            

            <label>Información sobre el producto</label>
            <input type="text" name="info" value={formValue.info} onChange={handlerChange}/>
            <br></br>

            <input type="checkbox" name="life" onChange={handlerChange}/>
            <label>Desaeas ser recordado</label>
            <br></br>
            <input type="checkbox" name="motor"  onChange={handlerChange}/>
            <label>Desaeas ser recordado</label>
            <br></br>
            <input type="checkbox" name="clothes"  onChange={handlerChange}/>
            <label>Desaeas ser recordado</label>
            <br></br>
            <input type="checkbox" name="electronic"  onChange={handlerChange}/>
            <label>Desaeas ser recordado</label>
            <br></br>

            <button type="submit">Agrega</button>

            


        </form>

    </Layout>)
}