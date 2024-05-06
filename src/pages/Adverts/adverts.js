import { useEffect, useState } from "react";
import { getAdverts } from "./services.js";
import { Link } from 'react-router-dom';
import Layout from "../../components/layout/layout.js";

function AdvertsPage(){
    
    const [adverts, setAdverts]= useState([]);

  
    useEffect(()=>{
        getAdverts().then(adverts => setAdverts(adverts))
    },[]);
    
    return (
       <Layout>
            <div>
                {adverts.length ? (
                    <ul>
                     {adverts.map(({id, ...advert})=> 
                     <li key={id}>
                        <Link to={`/adverts/${id}`}>
                            <h3>{advert.name}</h3>
                            <p>{advert.price}</p>
                            <p>{advert.info}</p>
                            <p>{advert.id}</p>
                            <p>{advert.situation}</p>
                        </Link>
                     </li>
                        
                        )}
                    </ul>

                ):(<h2>No anuncios</h2>)}
               
            </div>
            <form>
                   
                <input type="radio" name="destiny"/>
                <label>Venta</label>

                <input type="radio" name="destiny"/>
                <label>compra</label>

                <input type="radio" name="destiny"/>
                <label>todos</label>

                <input type="number" name="max"/>
                <input type="number" name="min"/>
                <label>Filtra por precio</label>
                    
            </form>

       </Layout>

    )

}


export default AdvertsPage;








/*
function AdvertsPage(){

    return <div>
        <ul>
            {adverts.map(advert=><li key={advert.id}>{advert.content}</li>)}
        </ul>
    </div>;
}
export default AdvertsPage;*/