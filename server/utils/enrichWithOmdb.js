import { omdb } from "../api/omdb.js";

export const enrichWithOmdb = async (tmdbResults) => {
	const omdbPromises = tmdbResults.map(async (tmdbItem) => {
		const title = tmdbItem.title || tmdbItem.name;
		try {
			const omdbResponse = await omdb.get("/", {
				params: { t: title },
			});
			return {
				...tmdbItem,
				omdb: omdbResponse.data,
			};
		} catch (err) {
			console.error(
				`Error fetching OMDB data for "${title}": ${err.message || err}`
			);
			return {
				...tmdbItem,
				omdb: { error: err.message || "Failed to fetch from OMDB" },
			};
		}
	});

	return await Promise.all(omdbPromises);
};
