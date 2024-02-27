import { prettyDate } from "./utils";
import { User } from "./user";
console.log(prettyDate(new Date()));

const getFromApi = (): any => {
  return {
    user: {
      name: "Alice",
    },
  };
};

const u2: User = { location: "Paris", name: "Karim" };

const data = getFromApi();
