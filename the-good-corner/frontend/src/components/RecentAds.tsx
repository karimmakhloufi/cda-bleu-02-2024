import { useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";

const ads: AdCardProps[] = [
  {
    imgUrl: "/images/bougie.webp",
    link: "/ads/bougie",
    price: 5,
    title: "bougie",
  },
  {
    imgUrl: "/images/dame-jeanne.webp",
    link: "/ads/dame-jeanne",
    price: 100,
    title: "Dame Jeanne",
  },
  {
    imgUrl: "/images/porte-magazine.webp",
    link: "/ads/porte-magazine",
    price: 20,
    title: "Porte Magazine",
  },
  {
    imgUrl: "/images/table.webp",
    link: "/ads/table",
    price: 50,
    title: "table",
  },
  {
    imgUrl: "/images/vaisselier.webp",
    link: "/ads/vaisselier",
    price: 55,
    title: "Vaisselier",
  },
  {
    imgUrl: "/images/vide-poche.webp",
    link: "/ads/vide-poche",
    price: 300,
    title: "Vide-Poche",
  },
];

const RecentAds = () => {
  const [total, setTotal] = useState(0);
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Cout total: {total} €</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.title}>
            <AdCard
              imgUrl={ad.imgUrl}
              link={ad.link}
              price={ad.price}
              title={ad.title}
            />
            <button
              className="button"
              onClick={() => {
                setTotal(total + ad.price);
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
