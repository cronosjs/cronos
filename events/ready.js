const chalk = require("chalk");
const mongoose = require("mongoose");

module.exports = (client) => {
  client.user.setActivity("c/help", { type: "WATCHING" });

  console.log(
    chalk.bgYellowBright.black(
      ` ${client.user.username} woke up and watching ${client.guilds.cache.size} servers `
    )
  );

  mongoose
    .connect(process.env.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(
      console.log(
        chalk
          .bgRgb(253, 168, 52)
          .black(` ${client.user.username} connecting to Mongo DB `)
      )
    )
    .catch((err) =>
      console.log(
        chalk
          .bgRgb(252, 111, 3)
          .black(` ${client.user.username} could not connect to mongo DB `)
      )
    );

};
