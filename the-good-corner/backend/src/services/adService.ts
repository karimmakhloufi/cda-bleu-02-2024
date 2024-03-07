import { Ad } from "../entities/ad";

const adService = {
  getOneAdById: async (id: number): Promise<Ad> => {
    try {
      const result = await Ad.findOneByOrFail({
        id: id,
      });
      return result;
    } catch (err) {
      console.log("err", err);
      return err;
    }
  },
};

export default adService;
