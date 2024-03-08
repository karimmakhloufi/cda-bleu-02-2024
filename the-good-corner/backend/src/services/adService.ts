import { Ad } from "../entities/ad";

const adService = {
  getOneAdById: async (id: number): Promise<Ad> => {
    try {
      const result = await Ad.find({
        where: { id: id },
        relations: { category: true, tags: true },
      });
      console.log("result from getOneAdById", result);
      return result[0];
    } catch (err) {
      console.log("err", err);
      return err;
    }
  },
};

export default adService;
