// Store logged-in user in localStorage
export function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// Retrieve logged-in user
export function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

// Clear user on logout
export function clearSession() {
  localStorage.removeItem("currentUser");
}

