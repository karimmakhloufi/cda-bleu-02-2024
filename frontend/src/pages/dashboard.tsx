import { GET_ALL_FLAGGED_ADS } from "../graphql/queries";
import {
  useDeleteAdByIdMutation,
  useGetAllFlaggedAdsQuery,
  useUnflagAdByIdMutation,
} from "../generated/graphql-types";

const DashBoard = () => {
  const { loading, data, error } = useGetAllFlaggedAdsQuery();
  const [deleteAdById] = useDeleteAdByIdMutation();
  const [unflagAdById] = useUnflagAdByIdMutation();
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }
  if (data) {
    return data.getAllFlaggedAds.map((ad) => (
      <div key={ad.id}>
        <p>{ad.title}</p>
        <button
          onClick={() => {
            console.log("unflag ad with id", ad.id);
            unflagAdById({
              variables: { unflagAdByIdId: ad.id.toString() },
              refetchQueries: [{ query: GET_ALL_FLAGGED_ADS }],
            });
          }}
        >
          Unflag
        </button>
        <button
          onClick={() => {
            deleteAdById({
              variables: { deleteAdByIdId: ad.id.toString() },
              refetchQueries: [{ query: GET_ALL_FLAGGED_ADS }],
            });
          }}
        >
          Delete
        </button>
      </div>
    ));
  }
};

export default DashBoard;
