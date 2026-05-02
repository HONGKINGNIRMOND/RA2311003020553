const api = require("../config/api");
const { getTopNotifications } = require("../services/priority.service");

exports.getNotifications = async (req, res) => {
  try {
    const response = await api.get("/notifications");

    const data = response.data.notifications;

    // ✅ FORMAT OUTPUT
    const formatted = data.map(item => ({
      ID: item.ID,
      Type: item.Type,
      Message: item.Message,
      Timestamp: item.Timestamp
    }));

    res.json({
      notifications: formatted
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};