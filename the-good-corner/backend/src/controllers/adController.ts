import adService from "../services/adService";
import { Request, Response } from "express";

const adController = {
  getOneAdById: async (req: Request, res: Response) => {
    try {
      const result = await adService.getOneAdById(
        Number.parseInt(req.params.adId)
      );
      res.send(result);
    } catch (err) {
      console.log("error", err);
      res.send("an error has occured");
    }
  },
};

export default adController;
