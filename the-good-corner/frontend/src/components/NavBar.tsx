import axios from "axios";
import styles from "../styles/navbar.module.css";
import { useEffect, useState, Fragment } from "react";
import Link from "next/link";

type Category = { id: number; name: string };

const NavBar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get<Category[]>(
          "http://localhost:5000/categories"
        );
        setCategories(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <nav className={styles.container}>
      {categories.map((el, index) => (
        <Fragment key={el.id}>
          <Link href={`/category/${el.id}`} className={styles.link}>
            {el.name}
          </Link>
          {index < categories.length - 1 ? <span> • </span> : null}
        </Fragment>
      ))}
    </nav>
  );
};

export default NavBar;
