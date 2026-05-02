
USE affordmed;

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId VARCHAR(50),
  type ENUM('Placement','Event','Result'),
  message TEXT,
  isRead BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🔥 INDEX (Stage 3 solution)
CREATE INDEX idx_notifications 
ON notifications(userId, isRead, createdAt DESC);