module.exports = {
  name: "slash",
  description: "manage bot's slash commands",
  async execute(client, message, args, prefix) {
    if (
      message.author.id === "310576888772820992" ||
      "355121277046095872" ||
      "521311050193436682" ||
      "488225580156715008"
    ) {
      //slash cmd template
      const data = {
        name: "name",
        description: "description",
        options: [
          {
            name: "name",
            type: Number, // check the bottom of this file
            description: "description",
            required: true, // set to false if optional
            choices: [
              {
                name: "name",
                value: "value",
              },
            ],
            options: [
              {
                // ....
              },
            ],
          },
        ],
      };

      const command = await client.application?.commands.create(data);
      console.log(command);
    }
  },
};

/**
 * 1 SUB_COMMAND sets the option to be a sub-command
 * 2 SUB_COMMAND_GROUP sets the option to be a sub-command-group
 * 3 STRING sets the option to require a string value
 * 4 INTEGER sets the option to require an integer value
 * 5 BOOLEAN sets the option to require a boolean value
 * 6 USER sets the option to require a user or snowflake as value
 * 7 CHANNEL sets the option to require a channel or snowflake as value
 * 8 ROLE sets the option to require a role or snowflake as value
 * 9 MENTIONABLE sets the option to require a user, role or snowflake as value
 */
