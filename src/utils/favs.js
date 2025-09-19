const PREFIX = "rmovies_favs_";

function read(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function key(userId) {
  return `${PREFIX}${userId}`;
}

export function listFavs(userId) {
  if (!userId) return [];
  return read(key(userId), []);
}

export function setFavs(userId, ids) {
  if (!userId) return;
  write(key(userId), ids);
}

export function toggleFav(userId, movieId) {
  if (!userId) return [];
  const now = new Set(listFavs(userId));
  if (now.has(movieId)) now.delete(movieId);
  else now.add(movieId);
  const arr = Array.from(now);
  setFavs(userId, arr);
  return arr;
}
