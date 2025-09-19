const API_KEY =
  import.meta.env.VITE_TMDB_KEY || "2a3fbca916b45b243f331a7185a02206";
const BASE_URL = "https://api.themoviedb.org/3";

function buildUrl(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "es-ES");
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });
  return url.toString();
}

async function fetchFromApi(endpoint, params = {}) {
  const response = await fetch(buildUrl(endpoint, params));
  if (!response.ok) throw new Error("Error en la solicitud a la API");
  return await response.json();
}

export async function getPopularMovies(page = 1) {
  return fetchFromApi("/movie/popular", { page });
}

export async function getMovieDetails(id) {
  return fetchFromApi(`/movie/${id}`);
}

export async function getMovieVideos(id) {
  return fetchFromApi(`/movie/${id}/videos`, { include_video_language: "es,en" });
}

// Películas por género
export async function getMoviesByGenre(genreId, page = 1, year) {
  return fetchFromApi("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
    ...(year ? { primary_release_year: year } : {})
  });
}

// Buscar películas por nombre
export async function searchMovies(query, page = 1) {
  const q = query.trim();
  if (!q) return { results: [], page: 1, total_page: 0, total_results: 0 };
  return fetchFromApi("/search/movie", { query: q, page, include_adult: false });
}