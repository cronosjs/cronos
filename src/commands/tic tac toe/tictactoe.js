let { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = {
  name: "tictactoe",
  aliases: ["ttt"],
  async execute(client, message, args) {
    // 2nd fighter (1st is msg author)
    let opponent =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);

    if (!opponent)
      return message.channel.send("Please provide the user to challenge!");

    // choose randomly who is going to start
    let fighters = [message.author.id, opponent.id].sort(() =>
      Math.random() > 0.5 ? 1 : -1
    );

    // options for working
    let options = {
      user: 0,
      a1: {
        style: "gray",
        label: " ",
        emoji: client.myemojis.get("invisible_for_ttt"),
        disabled: false,
      },
      a2: {
        style: "gray",
        label: " ",
        emoji: client.myemojis.get("invisible_for_ttt"),
        disabled: false,
      },
      a3: {
        style: "gray",
        label: " ",
        emoji: client.myemojis.get("invisible_for_ttt"),
        disabled: false,
      },
      b1: {
        style: "gray",
        label: " ",
        emoji: client.myemojis.get("invisible_for_ttt"),
        disabled: false,
      },
      b2: {
        style: "gray",
        label: " ",
        emoji: client.myemojis.get("invisible_for_ttt"),
        disabled: false,
      },
      b3: {
        style: "gray",
        label: " ",
        emoji: client.myemojis.get("invisible_for_ttt"),
        disabled: false,
      },
      c1: {
        style: "gray",
        label: " ",
        emoji: client.myemojis.get("invisible_for_ttt"),
        disabled: false,
      },
      c2: {
        style: "gray",
        label: " ",
        emoji: client.myemojis.get("invisible_for_ttt"),
        disabled: false,
      },
      c3: {
        style: "gray",
        label: " ",
        emoji: client.myemojis.get("invisible_for_ttt"),
        disabled: false,
      },
    };

    // main message
    let inv = client.myemojis.get("invisible");
    let msg = await message.channel.send(`${inv}${inv}**TIC TAC TOE**`);

    // main function
    async function tictactoe(m) {
      options.userid = fighters[options.user];

      // function to properly send the winner's username
      let prob = options.user === 0 ? 1 : 0;
      let winner = fighters[prob];

      // setup buttons
      let a1 = new MessageButton()
        .setStyle(options.a1.style)
        .setLabel(options.a1.label)
        .setID("a1")
        .setEmoji(options.a1.emoji)
        .setDisabled(options.a1.disabled);
      let a2 = new MessageButton()
        .setStyle(options.a2.style)
        .setLabel(options.a2.label)
        .setID("a2")
        .setEmoji(options.a2.emoji)
        .setDisabled(options.a2.disabled);
      let a3 = new MessageButton()
        .setStyle(options.a3.style)
        .setLabel(options.a3.label)
        .setID("a3")
        .setEmoji(options.a3.emoji)
        .setDisabled(options.a3.disabled);
      let b1 = new MessageButton()
        .setStyle(options.b1.style)
        .setLabel(options.b1.label)
        .setID("b1")
        .setEmoji(options.b1.emoji)
        .setDisabled(options.b1.disabled);
      let b2 = new MessageButton()
        .setStyle(options.b2.style)
        .setLabel(options.b2.label)
        .setID("b2")
        .setEmoji(options.b2.emoji)
        .setDisabled(options.b2.disabled);
      let b3 = new MessageButton()
        .setStyle(options.b3.style)
        .setLabel(options.b3.label)
        .setID("b3")
        .setEmoji(options.b3.emoji)
        .setDisabled(options.b3.disabled);
      let c1 = new MessageButton()
        .setStyle(options.c1.style)
        .setLabel(options.c1.label)
        .setID("c1")
        .setEmoji(options.c1.emoji)
        .setDisabled(options.c1.disabled);
      let c2 = new MessageButton()
        .setStyle(options.c2.style)
        .setLabel(options.c2.label)
        .setID("c2")
        .setEmoji(options.c2.emoji)
        .setDisabled(options.c2.disabled);
      let c3 = new MessageButton()
        .setStyle(options.c3.style)
        .setLabel(options.c3.label)
        .setID("c3")
        .setEmoji(options.c3.emoji)
        .setDisabled(options.c3.disabled);
      let a = new MessageActionRow().addComponents([a1, a2, a3]);
      let b = new MessageActionRow().addComponents([b1, b2, b3]);
      let c = new MessageActionRow().addComponents([c1, c2, c3]);
      let buttons = { components: [a, b, c] };

      // edit the message with bold format the user turn's username
      let edited =
        options.userid === message.author.id
          ? `**${message.author.username}** ${client.myemojis.get(
              "x"
            )} VS ${client.myemojis.get("o")} ${opponent.username}`
          : `${message.author.username} ${client.myemojis.get(
              "x"
            )} VS ${client.myemojis.get("o")} **${opponent.username}**`;

      m.edit(edited, buttons);
      const filter = (button) => button.clicker.user.id === options.userid;
      const collector = m.createButtonCollector(filter, {
        max: 1,
        time: 30000,
      });

      let won = {
        x: false,
        o: false,
      };

      // check if x scored 3
      if (
        (options.a1.emoji === client.myemojis.get("x_for_ttt") &&
          options.b1.emoji === client.myemojis.get("x_for_ttt") &&
          options.c1.emoji === client.myemojis.get("x_for_ttt")) ||
        (options.a2.emoji === client.myemojis.get("x_for_ttt") &&
          options.b2.emoji === client.myemojis.get("x_for_ttt") &&
          options.c2.emoji === client.myemojis.get("x_for_ttt")) ||
        (options.a3.emoji === client.myemojis.get("x_for_ttt") &&
          options.b3.emoji === client.myemojis.get("x_for_ttt") &&
          options.c3.emoji === client.myemojis.get("x_for_ttt")) ||
        (options.a1.emoji === client.myemojis.get("x_for_ttt") &&
          options.b2.emoji === client.myemojis.get("x_for_ttt") &&
          options.c3.emoji === client.myemojis.get("x_for_ttt")) ||
        (options.a3.emoji === client.myemojis.get("x_for_ttt") &&
          options.b2.emoji === client.myemojis.get("x_for_ttt") &&
          options.c1.emoji === client.myemojis.get("x_for_ttt")) ||
        (options.a1.emoji === client.myemojis.get("x_for_ttt") &&
          options.a2.emoji === client.myemojis.get("x_for_ttt") &&
          options.a3.emoji === client.myemojis.get("x_for_ttt")) ||
        (options.b1.emoji === client.myemojis.get("x_for_ttt") &&
          options.b2.emoji === client.myemojis.get("x_for_ttt") &&
          options.b3.emoji === client.myemojis.get("x_for_ttt")) ||
        (options.c1.emoji === client.myemojis.get("x_for_ttt") &&
          options.c2.emoji === client.myemojis.get("x_for_ttt") &&
          options.c3.emoji === client.myemojis.get("x_for_ttt"))
      )
        won["x"] = true;

      // check if o scored 3
      if (
        (options.a1.emoji === client.myemojis.get("o_for_ttt") &&
          options.b1.emoji === client.myemojis.get("o_for_ttt") &&
          options.c1.emoji === client.myemojis.get("o_for_ttt")) ||
        (options.a2.emoji === client.myemojis.get("o_for_ttt") &&
          options.b2.emoji === client.myemojis.get("o_for_ttt") &&
          options.c2.emoji === client.myemojis.get("o_for_ttt")) ||
        (options.a3.emoji === client.myemojis.get("o_for_ttt") &&
          options.b3.emoji === client.myemojis.get("o_for_ttt") &&
          options.c3.emoji === client.myemojis.get("o_for_ttt")) ||
        (options.a1.emoji === client.myemojis.get("o_for_ttt") &&
          options.b2.emoji === client.myemojis.get("o_for_ttt") &&
          options.c3.emoji === client.myemojis.get("o_for_ttt")) ||
        (options.a3.emoji === client.myemojis.get("o_for_ttt") &&
          options.b2.emoji === client.myemojis.get("o_for_ttt") &&
          options.c1.emoji === client.myemojis.get("o_for_ttt")) ||
        (options.a1.emoji === client.myemojis.get("o_for_ttt") &&
          options.a2.emoji === client.myemojis.get("o_for_ttt") &&
          options.a3.emoji === client.myemojis.get("o_for_ttt")) ||
        (options.b1.emoji === client.myemojis.get("o_for_ttt") &&
          options.b2.emoji === client.myemojis.get("o_for_ttt") &&
          options.b3.emoji === client.myemojis.get("o_for_ttt")) ||
        (options.c1.emoji === client.myemojis.get("o_for_ttt") &&
          options.c2.emoji === client.myemojis.get("o_for_ttt") &&
          options.c3.emoji === client.myemojis.get("o_for_ttt"))
      )
        won["o"] = true;

      // winner message
      let winmsg =
        winner === message.author.id
          ? `${client.myemojis.get("bad_crown")} **${
              message.author.username
            }** ${client.myemojis.get("x")} won!`
          : `${client.myemojis.get("bad_crown")} ${
              opponent.username
            } ${client.myemojis.get("o")} won!`;
      
      if (won["x"]) {
        return m.edit(winmsg, buttons);
      }
      if (won["o"]) {
        return m.edit(winmsg, buttons);
      }

      // buttons clicked collector
      collector.on("collect", (b) => {
        if (options.user == 0) {
          // edit the buttonn if x clicked it
          options.user = 1;
          options[b.id] = {
            style: "grey",
            label: "  ",
            emoji: client.myemojis.get("x_for_ttt"),
            disabled: true,
          };
        } else {
          // edit the buttonn if o clicked it
          options.user = 0;
          options[b.id] = {
            style: "grey",
            label: "  ",
            emoji: client.myemojis.get("o_for_ttt"),
            disabled: true,
          };
        }
        b.defer();

        // map for checking if none won
        const map = (obj, fun) =>
          Object.entries(obj).reduce(
            (prev, [key, value]) => ({
              ...prev,
              [key]: fun(key, value),
            }),
            {}
          );
        const objectFilter = (obj, predicate) =>
          Object.keys(obj)
            .filter((key) => predicate(obj[key]))
            .reduce((res, key) => ((res[key] = obj[key]), res), {});
        let checkTie = objectFilter(
          map(options, (_, btn) => btn.label == " "),
          (num) => num == true
        );
        if (Object.keys(checkTie).length == 0) return m.edit("It's a tie!");
        tictactoe(m);
      });

      // if user didn't press a button, end
      collector.on("end", (collected) => {
        if (collected.size == 0)
          m.edit(`<@!${options.userid}> didn\'t react in time! (30s)`);
      });
    }
    // run the function
    tictactoe(msg);
  },
};
