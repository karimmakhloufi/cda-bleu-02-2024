import AdCard from "../components/AdCard";
import { useGetAllAdsQuery } from "../generated/graphql-types";

const HomePage = () => {
  const { loading, error, data } = useGetAllAdsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("graphql data", data);
  if (data) {
    return (
      <>
        <h2>Annonces récentes</h2>
        <section className="recent-ads">
          {data.getAllAds.map((ad: any) => (
            <div key={ad.id}>
              <AdCard
                imgUrl={ad.imgUrl}
                link={`/ad/${ad.id}`}
                price={ad.price}
                title={ad.title}
              />
              <button className="button">Delete</button>
            </div>
          ))}
        </section>
      </>
    );
  }
};

export default HomePage;
