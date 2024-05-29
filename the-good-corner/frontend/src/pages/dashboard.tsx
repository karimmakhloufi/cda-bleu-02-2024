import { useGetAllFlaggedAdsQuery } from "@/generated/graphql-types";

const DashBoard = () => {
  const { loading, data, error } = useGetAllFlaggedAdsQuery();
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }
  if (data) {
    return data.getAllFlaggedAds.map((ad) => <p key={ad.id}>{ad.title}</p>);
  }
};

export default DashBoard;
