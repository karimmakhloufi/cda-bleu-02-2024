import "reflect-metadata";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./config/db";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import { Category } from "./entities/category";
import { Ad } from "./entities/ad";
import { Tag } from "./entities/tag";

const start = async () => {
  console.log("hot reload is working ?");
  await dataSource.initialize();

  // If no categories were created, create some
  const categories = await Category.find();
  if (categories.length === 0) {
    await Category.save({ name: "miscellaneous" });
    await Category.save({ name: "vehicles" });
  }

  // If no tags were created, create some
  const tags = await Tag.find();
  if (tags.length === 0) {
    await Tag.save({ name: "new" });
    await Tag.save({ name: "used" });
  }

  const vehicles = await Category.findOneByOrFail({ name: "vehicles" });

  // if no ads, create some
  const ads = await Ad.find();
  if (ads.length === 0) {
    // creating ads
    const bike = new Ad();
    bike.category = vehicles;
    bike.description = "This bike is to sell";
    bike.title = "I'm selling my bike";
    bike.owner = "bob@email.com";
    bike.imgUrl =
      "https://voltbikes.co.uk/images/e-bikes/pulse-xt-electric-bike.jpg";
    bike.price = 200;
    bike.ville = "Paris";
    bike.save();

    const car = new Ad();
    car.category = vehicles;
    car.description = "This car is to sell";
    car.title = "I'm selling my car";
    car.owner = "bob@email.com";
    car.imgUrl = "https://www.entreprendre.fr/wp-content/uploads/wx-3.jpg";
    car.price = 200;
    car.ville = "Reims";
    car.save();
  }

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
