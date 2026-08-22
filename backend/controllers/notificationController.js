import { mockStore } from '../data/mockStore.js';
import Notification from '../models/Notification.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    if (getDBStatus()) {
      const notifications = await Notification.find({
        $or: [{ userId }, { userId: null }]
      }).sort({ createdAt: -1 });
      return res.json({ success: true, count: notifications.length, notifications });
    } else {
      const notifications = mockStore.notifications.filter(n => !n.userId || n.userId === userId || n.userId === 'u_demo_student_01');
      return res.json({ success: true, count: notifications.length, notifications });
    }
  } catch (error) {
    console.error('getNotifications error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving notifications' });
  }
};

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      await Notification.findByIdAndUpdate(id, { isRead: true });
      return res.json({ success: true, message: 'Notification marked as read' });
    } else {
      const notif = mockStore.notifications.find(n => n._id === id);
      if (notif) notif.isRead = true;
      return res.json({ success: true, message: 'Notification marked as read' });
    }
  } catch (error) {
    console.error('markNotificationAsRead error:', error);
    return res.status(500).json({ success: false, message: 'Error updating notification' });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    if (getDBStatus()) {
      await Notification.updateMany({ $or: [{ userId }, { userId: null }] }, { isRead: true });
      return res.json({ success: true, message: 'All notifications marked as read' });
    } else {
      mockStore.notifications.forEach(n => {
        if (!n.userId || n.userId === userId || n.userId === 'u_demo_student_01') {
          n.isRead = true;
        }
      });
      return res.json({ success: true, message: 'All notifications marked as read' });
    }
  } catch (error) {
    console.error('markAllNotificationsAsRead error:', error);
    return res.status(500).json({ success: false, message: 'Error updating notifications' });
  }
};
