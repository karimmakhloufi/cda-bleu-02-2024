import { Ad } from "../entities/ad";
import { Category } from "../entities/category";
import { Tag } from "../entities/tag";
import { User } from "../entities/user";
import { dataSource } from "../config/db";
import { Query, Resolver } from "type-graphql";
import argon2 from "argon2";

@Resolver()
class DevResolver {
  @Query(() => String)
  async resetDB() {
    await dataSource.dropDatabase();
    await dataSource.destroy();
    await dataSource.initialize();
    await Category.save({ name: "misc" });
    const vehicle = await Category.save({ name: "vehicle" });
    await Tag.save({ name: "new" });
    await Tag.save({ name: "discount" });
    const alice = await User.save({
      email: "alice@gmail.com",
      hashedPassword: await argon2.hash("test"),
      role: "USER",
    });

    await User.save({
      email: "admin@gmail.com",
      hashedPassword: await argon2.hash("test"),
      role: "ADMIN",
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

    await Ad.save({
      category: vehicle,
      owner: alice,
      description: "I sell my boat",
      title: "Boat to sell",
      price: 30000,
      imgUrl: "https://cdn.britannica.com/25/123125-050-8E6C8227/rowboat.jpg",
      ville: "Paris",
      flagged: true,
    });
    return "DB was reset";
  }
}

export default DevResolver;
