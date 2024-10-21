const axios = require('axios');

const getSuppliers = async () => {
  const { data } = await axios.get('https://dummyjson.com/users?skip=0&limit=100');
  const users = data.users.map((user, i) => {
    return {
      name: user.company.name,
      contactName: user.firstName,
      username: user.username,
      password: 'password',
      email: user.email,
	  address: user.address.address,

    }
  })
  return users;
}
module.exports = getSuppliers;