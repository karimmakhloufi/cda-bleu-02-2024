import { useEffect, useState } from "react";
import axios from "axios";
import AdCard, { AdCardProps } from "./AdCard";

const RecentAds = () => {
  const [total, setTotal] = useState(
    localStorage.getItem("CART_TOTAL")
      ? JSON.parse(localStorage.getItem("CART_TOTAL") as string)
      : 0
  );

  const [ads, setAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>(
          "http://localhost:5000/ads"
        );
        console.log("data from api", result.data);
        setAds(result.data);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Cout total: {total} €</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              imgUrl={ad.imgUrl}
              link={`/ad/${ad.id}`}
              price={ad.price}
              title={ad.title}
            />
            <button
              className="button"
              onClick={() => {
                setTotal(total + ad.price);
                localStorage.setItem(
                  "CART_TOTAL",
                  JSON.stringify(total + ad.price)
                );
              }}
            >
              Ajouter le prix au total
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
