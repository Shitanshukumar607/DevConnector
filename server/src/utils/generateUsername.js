import User from "../models/user.model.js";

const generateUsername = async (fullName) => {
  let base = fullName.toLowerCase().replace(/\s+/g, "");
  let username = base;
  let count = 1;

  while (await User.findOne({ username })) {
    username = `${base}${count}`;
    count++;
  }

  return username;
};

export { generateUsername };
