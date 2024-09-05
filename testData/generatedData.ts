import { faker } from "@faker-js/faker";

export const generatedData = () => {
  return {
    userName: faker.internet.userName(),
    password: faker.internet.password({
      length: 10,
      memorable: false,
      pattern: /[A-Za-z0-9]/,
      prefix: "!",
    }),
  };
};
