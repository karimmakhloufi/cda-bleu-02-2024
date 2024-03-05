import { useRouter } from "next/router";

const AdDetails = () => {
  const router = useRouter();
  console.log("fetch details from ad " + router.query.id);
  return (
    <p>
      This page will display the details of the ad with id: {router.query.id}
    </p>
  );
};

export default AdDetails;
