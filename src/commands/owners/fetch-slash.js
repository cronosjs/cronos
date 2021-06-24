module.exports = {
  name: "fetch-slash",
  description: "manage bot's slash commands",
  async execute(client, message, args, prefix) {

      const command = await client.applcation?.commands.fetch();
      console.log(command);

  },
};
