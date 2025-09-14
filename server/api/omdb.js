import axios_retry from 'axios-retry';
import axios from 'axios';

const omdb = axios.create({
   baseURL: 'http://www.omdbapi.com',
   timeout: 20000,
});

// Interceptor to inject API key + region into every request
omdb.interceptors.request.use((config) => {
   config.params = {
      ...(config.params || {}),
      apikey: process.env.OMDB_API_KEY,
   };
   return config;
});

// Apply the retry logic to the TMDB Instance
axios_retry(omdb, {
   retries: 20,
   retryDelay: (retryCount) => {
      const delay = Math.pow(2, retryCount) * 100 + Math.random() * 100;
      return Math.min(delay, 5000); // Max 5 seconds
   },
   retryCondition: (error) => {
      return (
         (axios_retry.isNetworkError(error) ||
            axios_retry.isRetryableError(error) ||
            axios_retry.isNetworkOrIdempotentRequestError(error) ||
            error.code === 'ECONNRESET') &&
         error.response?.status !== 401 &&
         error.response?.status !== 403
      );
   },
   onRetry: (retryCount, error, requestConfig) => {
      console.warn(
         `Retry attempt(omdb) #${retryCount} for: ${requestConfig?.url}: ${error}`
      );
   },
});

export { omdb };
