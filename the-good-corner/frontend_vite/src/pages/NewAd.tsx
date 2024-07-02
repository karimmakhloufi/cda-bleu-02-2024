import { GET_ALL_ADS } from "../pages/Home";
import { gql, useMutation } from "@apollo/client";
import { useGetAllCategoriesAndTagsQuery } from "../generated/graphql-types";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";

const CREATE_NEW_AD = gql`
  mutation Mutation($data: NewAdInput!) {
    createNewAd(data: $data) {
      id
    }
  }
`;

const NewAd = () => {
  const userInfo = useContext(UserContext);
  if (userInfo.isLoggedIn === false) {
    // router.push("/login");
  }

  const [file, setFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();
  const { loading, error, data } = useGetAllCategoriesAndTagsQuery();
  const [createNewAd] = useMutation(CREATE_NEW_AD, {
    onCompleted(data) {
      console.log("mutation completed data", data);
    },
    onError(error) {
      console.log("error after executing mutation", error);
    },
    refetchQueries: [{ query: GET_ALL_ADS }],
  });
  let tagsArray: number[] = [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    console.log("data", data);
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);

          const formJson: any = Object.fromEntries(formData.entries());
          formJson.price = parseInt(formJson.price);
          formJson.tags = tagsArray;
          formJson.imgUrl = imageURL;
          console.log("formjson", formJson);
          const result = await createNewAd({
            variables: {
              data: formJson,
            },
          });
          console.log("result", result);
        }}
      >
        <div>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <button
            onClick={async (event) => {
              event.preventDefault();
              if (file) {
                const url = "/img";
                const formData = new FormData();
                formData.append("file", file, file.name);
                try {
                  const response = await axios.post(url, formData);
                  setImageURL(response.data.filename);
                } catch (err) {
                  console.log("error", err);
                }
              } else {
                alert("select a file to upload");
              }
            }}
          >
            Upload Image
          </button>
          {imageURL ? (
            <>
              <br />
              <img width={"500"} alt="uploadedImg" src={imageURL} />
              <br />
            </>
          ) : null}
          <button
            onClick={() => {
              console.log("post this to backend: " + imageURL);
            }}
          >
            Add new image
          </button>
        </div>
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
          Prix: <br />
          <input className="text-field" name="price" />
        </label>
        <br />
        <label>
          Ville: <br />
          <input className="text-field" name="ville" />
        </label>
        <br />
        <select name="category">
          {data.getAllCategories.map((el: any) => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        <legend>Tags:</legend>
        {data.getAllTags.map((el: any) => (
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
  }
};
export default NewAd;
