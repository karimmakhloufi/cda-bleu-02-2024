import styles from "../styles/navbar.module.css";
import { Fragment } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

export type Category = { id: number; name: string };

const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

const NavBar = () => {
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <nav className={styles.container}>
      {data.getAllCategories.map((el: Category, index: number) => (
        <Fragment key={el.id}>
          <Link href={`/category/${el.id}`} className={styles.link}>
            {el.name}
          </Link>
          {index < data.getAllCategories.length - 1 ? <span> • </span> : null}
        </Fragment>
      ))}
    </nav>
  );
};

export default NavBar;
