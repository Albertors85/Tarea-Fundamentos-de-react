import { useEffect, useState } from "react";
import Layout from "../../components/layout/layout.js";
import { createAdvert } from "./services.js";
import { useNavigate } from "react-router-dom";

export default function NewAdvert() {
  const navigate = useNavigate();

  const [isButton, setIsButton] = useState(false);
  const [tagsValue, setTagsValue] = useState([]);
  const [formValue, setFormValue] = useState({
    name: "",
    price: "",
    info: "",
    situation: "Venta",
    tags: [],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, price, info, situation } = formValue;
      const newAdvert = await createAdvert({
        name,
        price,
        info,
        situation,
        tags: tagsValue,
      });
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const handlerChange = (event) => {
    setFormValue((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTags = (event) => {
    const { name, checked } = event.target;
    setTagsValue((curretTags) =>
      checked ? [...curretTags, name] : curretTags.filter((tag) => tag !== name)
    );
  };

  useEffect(() => {
    const { name, price, info, situation } = formValue;
    setIsButton(name && price && info && situation && tagsValue.length > 0);
  }, [formValue, tagsValue]);

  return (
    <Layout>
      {" "}
      Agrega tu Anuncio
      <form onSubmit={handleSubmit}>
        <label>nombre</label>
        <input
          type="text"
          name="name"
          value={formValue.name}
          onChange={handlerChange}
          required
        />
        <br></br>

        <label>Precio</label>
        <input
          type="text"
          name="price"
          value={formValue.price}
          onChange={handlerChange}
          required
        />

        <br></br>
        <select
          id="option"
          name="situation"
          value={formValue.situation}
          onChange={handlerChange}
          required
        >
          <option value="Venta" name="venta">
            Venta
          </option>
          <option value="Compra">Compra</option>
        </select>
        <br></br>

        <label>Información sobre el producto</label>
        <input
          type="text"
          name="info"
          value={formValue.info}
          onChange={handlerChange}
        />
        <br></br>

        <input
          type="checkbox"
          name="life"
          checked={tagsValue.includes("life")}
          onChange={handleTags}
        />
        <label>LifeStyle</label>
        <br></br>
        <input
          type="checkbox"
          name="motor"
          checked={tagsValue.includes("motor")}
          onChange={handleTags}
        />
        <label>Motor</label>
        <br></br>
        <input
          type="checkbox"
          name="movil"
          checked={tagsValue.includes("movil")}
          onChange={handleTags}
        ></input>
        <label>Movil</label>
        <br></br>
        <input
          type="checkbox"
          name="sport"
          checked={tagsValue.includes("sport")}
          onChange={handleTags}
        />
        <label>Sport</label>
        <br></br>

        <button type="submit" disabled={!isButton}>
          Agregar
        </button>
      </form>
    </Layout>
  );
}
