export const selectUser = (state) => state.user.user;

export const selectUserInitials = (state) => {
  const name = state.user.user?.name || "";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join("")
};
