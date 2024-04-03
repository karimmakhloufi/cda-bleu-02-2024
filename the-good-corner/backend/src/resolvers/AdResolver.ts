import { Ad } from "../entities/ad";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class NewAdInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  ville: string;
}

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    const ads = await Ad.find({ relations: { category: true } });
    return ads;
  }

  @Mutation(() => Ad)
  async createNewAd(@Arg("data") newAdData: NewAdInput) {
    console.log("new ad data", newAdData);
    const result = await Ad.save({ ...newAdData });
    return result;
  }
}

export default AdResolver;
