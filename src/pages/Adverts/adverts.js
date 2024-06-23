import { useEffect, useState } from "react";
import { getAdverts } from "./services.js";
import { Link, NavLink } from "react-router-dom";
import Layout from "../../components/layout/layout.js";
import { useDispatch, useSelector } from "react-redux";
import { advertsLoad } from "../../store/actions.js";
import { getAdvertsR } from "../../store/selectors.js";

function AdvertsPage() {
  
  //const [adverts, setAdverts] = useState([]);
  
  const dispatch = useDispatch();
  const adverts = useSelector(getAdvertsR);
  const [maxMin, setMaxMin] = useState({
    max: "",
    min: "",
  });
  const [situation, setSituation] = useState("");

  const { max, min } = maxMin;

  useEffect(() => {
    getAdverts().then((adverts) => {
      dispatch(advertsLoad(adverts));
    });
  }, [dispatch]);

  const handlerChangePrice = (event) => {
    setMaxMin((newPriceValue) => ({
      ...newPriceValue,
      [event.target.name]: event.target.value,
    }));
  };

  const hadleSituation = (event) => {
    const { value } = event.target;
    const pre = situation;
    if (pre === value) {
      setSituation("");
    } else {
      setSituation(value);
    }
  };

  const advertVisible = (advertPrice, minPrice, maxPrice) => {
    const price = parseFloat(advertPrice);
    const visible =
      (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    return visible;
  };

  const visibleAdverts = adverts.filter((advert) =>
    advertVisible(advert.price, min, max)
  );

  return (
    <Layout>
      <div>
        {visibleAdverts.length ? (
          <ul>
            {visibleAdverts.map((advert) => {
              return (
                <li
                  key={advert.id}
                  name={advert.name}
                  style={{
                    display:
                      advert.situation === situation || !situation
                        ? "block"
                        : "none",
                  }}
                >
                  <Link to={`/adverts/${advert.id}`}>
                    <h3>{advert.name}</h3>
                    <p>{advert.price}</p>
                    <p>{advert.info}</p>
                    <p>{advert.situation}</p>

                    <ul>
                      {advert.tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                      ))}
                    </ul>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <NavLink to="/adverts/new" end>
            <p>No hay anuncios, se el p!!</p>
          </NavLink>
        )}
      </div>
      <form>
        <h4>Filtros:</h4>
        <input
          type="checkbox"
          name="destiny"
          value={"Venta"}
          checked={situation === "Venta"}
          onChange={hadleSituation}
        />
        <label>Venta</label>

        <input
          type="checkbox"
          name="destiny"
          value={"Compra"}
          checked={situation === "Compra"}
          onChange={hadleSituation}
        />
        <label>compra</label>

        <br></br>
        <br></br>
        <label>precio</label>
        <br></br>
        <label>max</label>
        <input
          type="number"
          name="max"
          value={max}
          onChange={handlerChangePrice}
        />
        <br></br>
        <label>minim</label>
        <input
          type="number"
          name="min"
          value={min}
          onChange={handlerChangePrice}
        />
      </form>
    </Layout>
  );
}

export default AdvertsPage;
