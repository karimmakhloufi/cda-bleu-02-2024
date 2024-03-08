import { Category } from "@/components/NavBar";
import axios, { formToJSON } from "axios";
import { useEffect, useState } from "react";

type Tag = {
  id: number;
  name: string;
};

const NewAd = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  let tagsArray: number[] = [];
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
    const fetchTags = async () => {
      try {
        const result = await axios.get<Tag[]>("http://localhost:5000/tags");
        setTags(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchTags();
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        // console.log("formdata entries", formData.entries());

        const formJson: any = Object.fromEntries(formData.entries());
        formJson.tags = tagsArray;
        console.log("formjson", formJson);
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
      <legend>Tags:</legend>
      {tags.map((el) => (
        <div key={el.id}>
          <input
            type="checkbox"
            onChange={(e) => {
              console.log(el.name + " " + e.target.checked);
              if (e.target.checked) {
                tagsArray.push(el.id);
              } else {
                tagsArray = tagsArray.filter((tag) => tag !== el.id);
              }
              console.log(tagsArray);
            }}
          />
          <label>{el.name}</label>
        </div>
      ))}
      <button className="button">Submit</button>
    </form>
  );
};

export default NewAd;
