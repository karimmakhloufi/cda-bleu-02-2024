import { AdCardProps } from "@/components/AdCard";
import { Category } from "@/components/NavBar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditAd = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [ad, setAd] = useState<AdCardProps>();
  useEffect(() => {
    const fetchAd = async () => {
      const result = await axios.get(
        "http://localhost:5000/ads/" + router.query.id
      );
      setAd(result.data);
    };
    fetchAd();
  }, [router.query.id]);
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
        axios.put(`http://localhost:5000/ads/${ad?.id}`, formJson);
      }}
    >
      <label>
        Titre de l&apos;annonce: <br />
        <input defaultValue={ad?.title} className="text-field" name="title" />
      </label>
      <br />
      <label>
        Description: <br />
        <input
          defaultValue={ad?.description}
          className="text-field"
          name="description"
        />
      </label>
      <br />
      <label>
        Vendeur: <br />
        <input defaultValue={ad?.owner} className="text-field" name="owner" />
      </label>
      <br />
      <label>
        Prix: <br />
        <input defaultValue={ad?.price} className="text-field" name="price" />
      </label>
      <br />
      <label>
        Image: <br />
        <input defaultValue={ad?.imgUrl} className="text-field" name="imgUrl" />
      </label>
      <br />
      <label>
        Ville: <br />
        <input defaultValue={ad?.ville} className="text-field" name="ville" />
      </label>
      <br />
      {ad?.title ? (
        <select defaultValue={ad.category?.id} name="category">
          {categories.map((el) => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      ) : null}
      <button className="button">Submit</button>
    </form>
  );
};

export default EditAd;
