
const WL_PREFIX = "rmovies_watch_";    
const RT_PREFIX = "rmovies_ratings_";    
const HS_PREFIX = "rmovies_hist_";      

// helpers genéricos
function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function write(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// Watchlist 
function wlKey(userId) { return `${WL_PREFIX}${userId}`; }
export function listWatch(userId) { return userId ? read(wlKey(userId), []) : []; }
export function setWatch(userId, ids) { if (userId) write(wlKey(userId), ids); }
export function toggleWatch(userId, movieId) {
  if (!userId) return [];
  const now = new Set(listWatch(userId));
  if (now.has(movieId)) now.delete(movieId); else now.add(movieId);
  const arr = Array.from(now);
  setWatch(userId, arr);
  return arr;
}

// Ratings (1..5)
function rtKey(userId) { return `${RT_PREFIX}${userId}`; }
export function getRatings(userId) { return userId ? read(rtKey(userId), {}) : {}; }
export function setRating(userId, movieId, value) {
  if (!userId) return {};
  const r = getRatings(userId);
  if (!value) delete r[movieId]; else r[movieId] = value; // value null/0: quita
  write(rtKey(userId), r);
  return r;
}

// Historial de búsqueda (últimos 10, únicos, recientes primero) ---
function hsKey(userId) { return `${HS_PREFIX}${userId || "anon"}`; }
export function getHistory(userId) { return read(hsKey(userId), []); }
export function pushHistory(userId, term, limit = 10) {
  const t = (term || "").trim();
  if (!t) return getHistory(userId);
  let arr = getHistory(userId).filter(x => x.toLowerCase() !== t.toLowerCase());
  arr.unshift(t);
  if (arr.length > limit) arr = arr.slice(0, limit);
  write(hsKey(userId), arr);
  return arr;
}
export function clearHistory(userId) { localStorage.removeItem(hsKey(userId)); }
