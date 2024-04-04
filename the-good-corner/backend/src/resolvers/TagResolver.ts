import { Tag } from "../entities/tag";
import { Query, Resolver } from "type-graphql";

@Resolver(Tag)
class TagResolver {
  @Query(() => [Tag])
  async getAllTags() {
    return await Tag.find();
  }
}

export default TagResolver;
