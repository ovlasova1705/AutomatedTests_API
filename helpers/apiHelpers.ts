import { APIRequestContext } from "@playwright/test";
import { generatedData } from "../testData/generatedData";

// Create user
export async function createUser(apiContext: APIRequestContext) {
  const { userName, password } = generatedData();
  const response = await apiContext.post("https://demoqa.com/Account/v1/User", {
    data: {
      userName: userName,
      password: password,
    },
  });

  const responseBody = await response.json();
  return {
    status: response.status(),
    userId: responseBody.userID,
    userName,
    password,
  };
}

//Token generation
export async function generateToken(
  apiContext: APIRequestContext,
  userName: string,
  password: string
) {
  const response = await apiContext.post(
    "https://demoqa.com/Account/v1/GenerateToken",
    {
      data: {
        userName: userName,
        password: password,
      },
    }
  );
  if (response.status() !== 200) {
    throw new Error(`Failed to generate token: ${response.status()}`);
  }
  const responseBody = await response.json();
  return responseBody.token;
}
