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
  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <AdCard
            key={ad.title}
            imgUrl={ad.imgUrl}
            link={ad.link}
            price={ad.price}
            title={ad.title}
          />
        ))}
      </section>
    </main>
  );
};

export default RecentAds;
