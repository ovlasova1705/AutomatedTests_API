import { test, expect, request, APIRequestContext } from "@playwright/test";
import { createUser, generateToken } from "../helpers/apiHelpers";

let apiContext: APIRequestContext;

test.beforeAll(async ({}) => {
  apiContext = await request.newContext();
});

test("POST: Should create a new user", async () => {
  const { status, userId, userName, password } = await createUser(apiContext);
  expect(status).toBe(201);
  expect(userId).toBeDefined();
  expect(userName).toBeDefined();
  expect(password).toBeDefined();
});

test("POST: Should authenticate user", async () => {
  const { userName, password } = await createUser(apiContext);
  const token = await generateToken(apiContext, userName, password);
  expect(token).toBeTruthy();
});

test("DELETE: Should delete a user", async () => {
  const { userId, userName, password } = await createUser(apiContext);
  const token = await generateToken(apiContext, userName, password);

  const deleteResponse = await apiContext.delete(
    `https://demoqa.com/Account/v1/User/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  expect(deleteResponse.status()).toBe(204);
});
