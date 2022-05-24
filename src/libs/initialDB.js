const Role = require('../models/role');
const User = require('../models/user');

const createRoles = async () => {
  try {

    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;


    const values = await Promise.all([
      new Role({ name: "Super Administrador" }).save(),
      new Role({ name: "Administrador" }).save(),
      new Role({ name: "Usuario App" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

const createUsers = async () => {
  try {

    const count = await User.estimatedDocumentCount();

    if (count > 0) return;


    const values = await Promise.all([
      new User({
        profile: {
          name: "Luis Eduardo",
          surnames: "Negron Chan",
          email: "eduardo-negron@live.com",
          cell_number: 9971210804,
          password: "$2a$10$HIfNkb0Epj6BHh4pkxykiuzSkhoLp9I4wkU.omxRbV6I5Knf4QTUS",
          specific_dates: {
            profile_photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          },
          rol: "62714c2b9e0bb25e00e351f6",
        },
        status: true
      }).save(),
      new User({
        profile: {
          name: "Pedro Miguel",
          surnames: "Pérez Morales",
          email: "pedro-morales@hotmail.com",
          cell_number: 9970065432,
          password: "$2a$10$HIfNkb0Epj6BHh4pkxykiuzSkhoLp9I4wkU.omxRbV6I5Knf4QTUS",
          specific_dates: {
            profile_photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          },
          rol: "62714c2b9e0bb25e00e351f7",
        },
        status: true
      }).save(),
      new User({
        profile: {
          name: "José Antonio",
          surnames: "Gonzáles Millan",
          email: "jose-millan@hotmail.com",
          cell_number: 9997865432,
          password: "$2a$10$HIfNkb0Epj6BHh4pkxykiuzSkhoLp9I4wkU.omxRbV6I5Knf4QTUS",
          specific_dates: {
            profile_photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          },
          rol: "62714c2b9e0bb25e00e351f8",
        },
        status: true
      }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};



module.exports = {
  createRoles,
  createUsers
};
