import { GET_ALL_ADS } from "../../components/RecentAds";
import { gql, useMutation } from "@apollo/client";
import { useGetAllCategoriesAndTagsQuery } from "../../generated/graphql-types";

const CREATE_NEW_AD = gql`
  mutation Mutation($data: NewAdInput!) {
    createNewAd(data: $data) {
      id
    }
  }
`;

const NewAd = () => {
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
          if (formJson.imgUrl.length === 0) {
            delete formJson.imgUrl;
          }
          console.log("formjson", formJson);
          const result = await createNewAd({
            variables: {
              data: formJson,
            },
          });
          console.log("result", result);
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
