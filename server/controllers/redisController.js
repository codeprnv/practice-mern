import redisClient from "../utils/redisClient.js";
import { tmdb } from "../api/tmdb.js";
import { enrichWithOmdb } from "../utils/enrichWithOmdb.js";
import {
	shuffleAndFilterUniqueContent,
	getUniqueAndFilteredContent,
} from "../utils/utils.js";

export const redisController = async ({
	cacheKey,
	url,
	shouldShuffle = false,
	shouldFilter = true,
}) => {
	try {
		const cachedData = await redisClient.get(cacheKey);
		if (cachedData) {
			return JSON.parse(cachedData);
		}

		const tmdbResponse = await tmdb.get(url, { params: tmdb.defaults.params });
		const tmdbResults = tmdbResponse?.data?.results || [];

		const enrichedResults = await enrichWithOmdb(tmdbResults);
		const finalResults = shouldShuffle
			? shuffleAndFilterUniqueContent(enrichedResults)
			: shouldFilter
			? getUniqueAndFilteredContent(enrichedResults)
			: enrichedResults;

		await redisClient.setEx(
			cacheKey,
			3600, // 1 hour
			JSON.stringify({ results: finalResults })
		);

		return { results: finalResults };
	} catch (err) {
		console.error(`Error in redisController: ${err.message || err}`);
		throw new Error(`Redis controller error: ${err.message || err}`);
	}
};
