const LS_USERS = "rmovies_users"; // [{ id, email, name, password }]
const LS_SESSION = "rmovies_session";
const LS_FAVS_PREFIX = "rmovies_favs_";

function read(key, fallback = null) {
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

// Users
export function listUsers() {
  return read(LS_USERS, []);
}

export function saveUsers(users) {
  write(LS_USERS, users);
}

export function createUser({ email, name, password }) {
const users = listUsers();
if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
throw new Error("Ya existe un usuario con ese correo");
}
const id = crypto.randomUUID();
const user = { id, email, name: name || "", password };
users.push(user);
saveUsers(users);
return user;
}


export function findUserByEmail(email) {
return listUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
} 

export function updateUser(id, patch) {
const users = listUsers();
const i = users.findIndex((u) => u.id === id);
if (i === -1) throw new Error("Usuario no encontrado");
users[i] = { ...users[i], ...patch };
saveUsers(users);
return users[i];
}


// Session
export function getSession() {
return read(LS_SESSION, null);
}


export function setSession(userId) {
write(LS_SESSION, { userId });
}


export function clearSession() {
localStorage.removeItem(LS_SESSION);
}


// Favorites
function favsKey(userId) {
return `${LS_FAVS_PREFIX}${userId}`;
}


export function listFavs(userId) {
return read(favsKey(userId), []);
}


export function setFavs(userId, ids) {
write(favsKey(userId), ids);
}


export function toggleFav(userId, movieId) {
const ids = new Set(listFavs(userId));
if (ids.has(movieId)) ids.delete(movieId); else ids.add(movieId);
const arr = Array.from(ids);
setFavs(userId, arr);
return arr;
}
