import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/layout.js";
import { useEffect, useState } from "react";
import { getAdvert } from "./services.js";

function AdvertPage(){
    const params = useParams();
    const [advert, setAdvert]= useState(null);
    const navigate = useNavigate ();
  

    useEffect(()=>{

        async function getAdvertDetail(){

            try{
                const advert = await getAdvert(params.advertId);
                setAdvert(advert)

            }catch(error){
                if(error.status === 404){
                    navigate('/404')// cambiar a notFondPage
                }
            }
             
        };

       getAdvertDetail();
       
    },[params.advertId,navigate])
    
   console.log(advert)
    return <Layout title='diosss'>
        <h2>{advert && advert.name}</h2>
        <p>{advert && advert.price}</p>
        <p>{advert && advert.situation}</p>
        <p>{advert && advert.info}</p>
    </Layout>
    

  
};
export default AdvertPage;

