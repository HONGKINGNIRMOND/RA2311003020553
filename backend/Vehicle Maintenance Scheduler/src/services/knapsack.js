function knapsack(tasks, maxHours) {
  const n = tasks.length;
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(maxHours + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let h = 1; h <= maxHours; h++) {
      if (tasks[i - 1].Duration <= h) {
        dp[i][h] = Math.max(
          tasks[i - 1].Impact + dp[i - 1][h - tasks[i - 1].Duration],
          dp[i - 1][h]
        );
      } else {
        dp[i][h] = dp[i - 1][h];
      }
    }
  }

  return dp[n][maxHours];
}

module.exports = knapsack;