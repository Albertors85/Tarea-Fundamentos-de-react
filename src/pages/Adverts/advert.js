import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/layout.js";
import { useState, useEffect } from "react";
import { getAdvert, deleteAdvert } from "./services.js";
import defaulr from "./defaulr.jpg";
import Modal from "../confiMessage.js";

function AdvertPage() {
  const { advertId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [advert, setAdvert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAdvert(advertId)
      .then((advert) => {
        setAdvert(advert);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        navigate("/404");
      });
  }, [advertId, navigate]);

  const handleDelete = async (advertId) => {
    try {
      await deleteAdvert(advertId);
      navigate("/");
    } catch (error) {}
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    handleDelete(advert.id);
  };
  const handleCancelDelete = () => {
    setShowModal(false);
  };

  if (isLoading) {
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
      {advert.photo ? (
        <img src={advert.photo} alt="Anuncio" style={{ maxWidth: "20%" }} />
      ) : (
        <img src={defaulr} alt="Anuncio" style={{ maxWidth: "20%" }} />
      )}

      <ul>
        {advert && advert.tags.map((tag, index) => <li key={index}>{tag}</li>)}
      </ul>
      <Modal
        isOpen={showModal}
        title="Confirmación de Borrado"
        message="¿Estás seguro de que quieres borrar este anuncio?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <button type="button" onClick={() => setShowModal(true)}>
        Delete
      </button>
    </Layout>
  );
}
export default AdvertPage;
