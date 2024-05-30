import { Category } from "../entities/category";
import { Ad } from "../entities/ad";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Tag } from "../entities/tag";
import { User } from "../entities/user";

@InputType()
class NewAdInput implements Partial<Ad> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => String, { nullable: true })
  imgUrl?: string | undefined;

  @Field()
  ville: string;

  @Field(() => ID)
  category: Category;

  @Field(() => [ID])
  tags?: Tag[] | undefined;
}

@Resolver(Ad)
class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    const ads = await Ad.find({ relations: { category: true } });
    return ads;
  }

  @Authorized("ADMIN")
  @Query(() => [Ad])
  async getAllFlaggedAds() {
    const ads = await Ad.find({
      where: { flagged: true },
      relations: { category: true },
    });
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("adId") adId: string) {
    const ad = await Ad.findOneByOrFail({ id: Number.parseInt(adId) });
    return ad;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createNewAd(@Ctx() context: any, @Arg("data") newAdData: NewAdInput) {
    const userFromDB = await User.findOneByOrFail({ email: context.email });
    const resultFromSave = await Ad.save({
      ...newAdData,
      owner: { id: userFromDB.id },
    });
    const resultForApi = await Ad.find({
      relations: { category: true },
      where: { id: resultFromSave.id },
    });
    return resultForApi[0];
  }

  @Authorized(["ADMIN", "SUPERADMIN"])
  @Mutation(() => String)
  async deleteAdById(@Arg("id") idToDelete: string) {
    await Ad.delete(idToDelete);
    return "Ad was deleted";
  }

  @Mutation(() => String)
  async flagAdById(@Arg("id") idToFlag: string) {
    await Ad.save({ id: Number.parseInt(idToFlag), flagged: true });
    return "Ad has been flagged";
  }

  @Mutation(() => String)
  async unflagAdById(@Arg("id") idToUnFlag: string) {
    await Ad.save({ id: Number.parseInt(idToUnFlag), flagged: false });
    return "Ad has been unflagged";
  }
}

export default AdResolver;
