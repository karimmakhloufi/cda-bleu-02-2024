import { Ad } from "../entities/ad";
import { Query, Resolver } from "type-graphql";

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    const ads = await Ad.find();
    return ads;
  }
}

export default AdResolver;
