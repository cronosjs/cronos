const Canvas = require("canvas");

// Register Bold font
Canvas.registerFont(`${__dirname}/../assets/fonts/theboldfont.ttf`, {
  family: "Bold",
});

module.exports.rank = require("./rank card/rank");
