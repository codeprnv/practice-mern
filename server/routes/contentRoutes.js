import express from "express";
import * as controller from "../controllers/detailsController.js"

const router = express.Router();

router.get("/trending/:trendingType/:timeDuration", controller.getTrending);
router.get("/:type/now_playing", controller.getNowPlaying);
router.get("/movies/:movieType", controller.getMoviesByType);

export default router;
