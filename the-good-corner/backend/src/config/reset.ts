import argon2 from "argon2";
import { Tag } from "../entities/tag";
import { Category } from "../entities/category";
import { dataSource } from "./db";
import { User } from "../entities/user";
import { Ad } from "../entities/ad";

const resetDB = async () => {
  console.log("db will be reset");
  await dataSource.initialize();
  await dataSource.dropDatabase();
  await dataSource.destroy();
  await Category.save({ name: "misc" });
  const vehicle = await Category.save({ name: "vehicle" });
  await Tag.save({ name: "new" });
  await Tag.save({ name: "discount" });
  const alice = await User.save({
    email: "alice@gmail.com",
    hashedPassword: await argon2.hash("test"),
    role: "USER",
  });

  await Ad.save({
    category: vehicle,
    owner: alice,
    description: "I sell my bike",
    title: "Bike to sell",
    price: 150,
    imgUrl:
      "https://www.statebicycle.com/cdn/shop/products/6061-eBikeCommuter-MatteBlack_1.jpg?v=1684443969",
    ville: "Paris",
  });
  await Ad.save({
    category: vehicle,
    owner: alice,
    description: "I sell my car",
    title: "Car to sell",
    price: 3000,
    imgUrl:
      "https://images.caradisiac.com/images/2/0/6/7/172067/S0-la-peugeot-206-en-occasion-les-meilleures-et-les-pires-versions-572179.jpg",
    ville: "Paris",
  });
};

export default resetDB;
