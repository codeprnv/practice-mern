import { clearAllRedisCache } from "../utils/redisClient.js";
import { redisController } from "./redisController.js";

export const getTrending = async (req, res) => {
	try {
		const { trendingType = "movie", timeDuration = "week" } = req.params;
		// Redis Cache Key based on request parameters
		const cacheKey = `trending:${trendingType}:${timeDuration}`;
		const data = await redisController({
			cacheKey,
			url: `/trending/${trendingType}/${timeDuration}`,
		});
		res.status(200).json(data);
	} catch (err) {
		console.error("Error fetching trending data: ", err.message || err);
		res.status(500).json({
			message: `Error fetching the trending data: ${err.message || err}`,
		});
	}
};

export const getNowPlaying = async (req, res) => {
	try {
		const { type = "movie" } = req.params;
		const cacheKey = `now_playing:${type}`;

		const data = await redisController({
			cacheKey,
			url: `/${type}/now_playing`,
			shouldShuffle: true,
		});
		res.status(200).json(data);
	} catch (err) {
		console.error(`Error fetching now playing data: ${err.message || err}`);
		res.status(500).json({
			message: `Error fetching the now playing data: ${err.message || err}`,
		});
	}
};

export const getMoviesByType = async (req, res) => {
	try {
		const {
			page = 1,
			adult = true,
			"release_date.gte": gte = "2016-01-01",
			"release_date.lte": lte = "2025-12-31",
			sortBy = "popularity.desc",
			genre = "",
			origin = "",
		} = req.query;

		const { movieType } = req.params;

		const languageMap = {
			hindi: "hi",
			marathi: "mr",
			tamil: "ta",
			telugu: "te",
			english: "en",
		};
		const language = languageMap[movieType.toLowerCase()] ?? "";

		const queryParams = [
			`include_adult=${adult}`,
			`page=${page}`,
			`sort_by=${sortBy}`,
			`release_date.gte=${gte}`,
			`release_date.lte=${lte}`,
			language ? `with_original_language=${language}` : "",
			origin ? `with_origin_country=${origin}` : "",
			genre ? `with_genres=${genre}` : "",
		]
			.filter(Boolean)
			.join("&");

		const cacheKey = `movies:${movieType}:${page}:${adult}:${gte}-${lte}:${sortBy}:${genre}:${origin}`;

		const data = await redisController({
			cacheKey,
			url: `/discover/movie?${queryParams}`,
		});

		res.status(200).json(data);
	} catch (err) {
		console.error(
			`Error fetching ${req.params.movieType} movies:`,
			err.message || err
		);
		res.status(500).json({
			message: `Error fetching ${req.params.movieType} movies: ${
				err.message || err
			}`,
		});
	}
};
