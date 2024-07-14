import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/layout.js";
import { advertsLoad } from "../../store/actions.js";

import { useEffect} from "react";

import { getAdverts, deleteAdvert } from "./services.js";
import { useSelector, useDispatch } from "react-redux";
import { getAdvertId } from "../../store/selectors.js";
import defaulr from "./defaulr.jpg"


function AdvertPage() {

  
  const dispatch = useDispatch();
  const {advertId} = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    getAdverts().then((adverts) => {
      dispatch(advertsLoad(adverts));
    
    });
  }, [dispatch]);

  


  const advert = useSelector((state) => getAdvertId(state, advertId));

  const handleDelete = async (advertId) => {
    try {
      await deleteAdvert(advertId);
      navigate("/");
    } catch (error) {}
  };

  
  if (!advert ) {
    return (
      <Layout title={advert && advert.name}>
        <p>Loading...</p>
      </Layout>
    );
  }
 
  return (
    <Layout title={advert && advert.name}>
      <p>{advert && advert.price}</p>
      <p>{advert && advert.situation}</p>
      <p>{advert && advert.info}</p>
      {advert.photo ?( <img
        src={advert.photo} 
        alt="Anuncio"
        style={{ maxWidth: "20%" }}
      />

      ):(
        <img
        src={defaulr}
        alt="Anuncio"
        style={{ maxWidth: "20%" }}
      />

      )}
     
      <ul>
        {advert && advert.tags.map((tag, index) => <li key={index}>{tag}</li>)}
      </ul>
      
      <button type="button" onClick={() => handleDelete(advert.id)}>
        Delete
      </button>
    </Layout>
  );
}
export default AdvertPage;
