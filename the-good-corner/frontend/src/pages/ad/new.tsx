import { Category } from "@/components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

const NewAd = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get<Category[]>(
          "http://localhost:5000/categories"
        );
        setCategories(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        console.log("formdata entries", formData.entries());

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        axios.post("http://localhost:5000/ads", formJson);
      }}
    >
      <label>
        Titre de l&apos;annonce: <br />
        <input className="text-field" name="title" />
      </label>
      <br />
      <label>
        Description: <br />
        <input className="text-field" name="description" />
      </label>
      <br />
      <label>
        Vendeur: <br />
        <input className="text-field" name="owner" />
      </label>
      <br />
      <label>
        Prix: <br />
        <input className="text-field" name="price" />
      </label>
      <br />
      <label>
        Image: <br />
        <input className="text-field" name="imgUrl" />
      </label>
      <br />
      <label>
        Ville: <br />
        <input className="text-field" name="ville" />
      </label>
      <br />
      <select name="category">
        {categories.map((el) => (
          <option value={el.id} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      <button className="button">Submit</button>
    </form>
  );
};

export default NewAd;
