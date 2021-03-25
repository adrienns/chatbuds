const handleUser = ({ name, id, random_color }) => {
  name = name.trim().toLowerCase();
  let chatusers = [];

  let user = { id, name, random_color };
  chatusers.push(user);

  console.log(chatusers);

  return user;
};

module.exports = handleUser;
