import client from "./client";

export const signUpUser = async (
  name,
  phone_number,
  birthday,
  sex,
  email,
  password,
  nickname,
  keyword
) => {
  const res = await client.post("/users/", {
    name,
    phone_number,
    birthday,
    sex,
    email,
    password,
    nickname,
    keyword,
  });
  console.log(res);
};
