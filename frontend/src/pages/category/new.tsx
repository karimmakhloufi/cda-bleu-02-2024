import axios from "axios";
import { useEffect, useState } from "react";

const NewCategory = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        console.log("formdata entries", formData.entries());

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        axios.post("http://localhost:5000/categories", formJson);
      }}
    >
      <label>
        Nom de la catégorie: <br />
        <input className="text-field" name="name" />
      </label>
      <br />
      <button className="button">Submit</button>
    </form>
  );
};

export default NewCategory;
