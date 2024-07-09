import { Category } from "../entities/category";
import { Query, Resolver } from "type-graphql";

@Resolver(Category)
class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories() {
    return await Category.find();
  }
}

export default CategoryResolver;
