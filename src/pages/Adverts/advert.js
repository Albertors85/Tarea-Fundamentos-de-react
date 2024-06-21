import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/layout.js";
import { useEffect, useState } from "react";
import { getAdvert, deleteAdvert } from "./services.js";

function AdvertPage() {
  const [advert, setAdvert] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAdvertDetail() {
      try {
        const advert = await getAdvert(params.advertId);
        setAdvert(advert);
      } catch (error) {
        if (error.status === 404) {
          navigate("/404");
        }
      }
    }

    getAdvertDetail();
  }, [params.advertId, navigate]);

  const handleDelete = async (advertId) => {
    try {
      await deleteAdvert(advertId);
      navigate("/");
    } catch (error) {}
  };

  return (
    <Layout title={advert && advert.name}>
      <p>{advert && advert.price}</p>
      <p>{advert && advert.situation}</p>
      <p>{advert && advert.info}</p>
      <ul>
        {advert && advert.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
      <button type="button" onClick={() => handleDelete(advert.id)}>
        Delete
      </button>
    </Layout>
  );
}
export default AdvertPage;
