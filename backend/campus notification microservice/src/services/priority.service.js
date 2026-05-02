function getPriority(type) {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
}

function getTopNotifications(data) {
  return data
    .sort((a, b) => {
      if (getPriority(b.type) !== getPriority(a.type)) {
        return getPriority(b.type) - getPriority(a.type);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 10);
}

module.exports = { getTopNotifications };