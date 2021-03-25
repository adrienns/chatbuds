// const chatusers = [];

const handleUser = ({ name, id, random_color }) => {
  name = name.trim().toLowerCase();
  let chatusers = [];
  // const existingUser = chatusers.find((user) => user.name === name);

  // if (existingUser) {
  //   return { error: "Username is already taken" };
  // }
  let user = { id, name, random_color };
  chatusers.push(user);

  console.log(chatusers);

  return user;
};

// const getUser = (id) => chatusers.find((user) => user.id === id);
module.exports = handleUser;
