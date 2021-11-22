const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Videogames, Genres } = require("../db");
const API_KEY = require("../utils");

const apiGames = async () => {
  try {
    const first_list_games = (
      await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    ).data;
    // const second_list_games = await axios.get(first_list_games);
    // const list_games = first_list_games.results.concat(second_list_games);
    const result_games = first_list_games.results.map((el) => {
      let info = {
        id: el.id,
        name: el.name,
        img: el.background_image,
        rating: el.ratings_count,
        platforms: el.platforms
          .map((p) => p.platform.name)
          .filter((p) => p != null)
          .join(", "),
        genres: el.genres
          .map((g) => g.name)
          .filter((g) => g != null)
          .join(", "),
      };
      return info;
    });
    console.log("result_games: ", result_games);
    return result_games;
  } catch (error) {
    console.log(error);
  }
};
apiGames();
router.get("/", async (req, res) => {});

module.exports = router;
