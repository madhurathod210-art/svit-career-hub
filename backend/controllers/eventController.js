import { mockStore } from '../data/mockStore.js';
import Event from '../models/Event.js';
import { getDBStatus } from '../config/db.js';

// @desc    Get all events with category & search filter
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const { category, search } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { organizer: { $regex: search, $options: 'i' } }
        ];
      }
      const events = await Event.find(query);
      return res.json({ success: true, count: events.length, events });
    } else {
      const events = mockStore.getEvents({ category, search });
      return res.json({ success: true, count: events.length, events });
    }
  } catch (error) {
    console.error('getEvents error:', error);
    return res.status(500).json({ success: false, message: 'Error retrieving events' });
  }
};

// @desc    Admin: Create new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req, res) => {
  try {
    const data = req.body;
    if (getDBStatus()) {
      const event = await Event.create(data);
      return res.status(201).json({ success: true, event });
    } else {
      const event = mockStore.addEvent(data);
      return res.status(201).json({ success: true, event });
    }
  } catch (error) {
    console.error('createEvent error:', error);
    return res.status(500).json({ success: false, message: 'Error creating event' });
  }
};

// @desc    Admin: Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (getDBStatus()) {
      const event = await Event.findByIdAndUpdate(id, data, { new: true });
      return res.json({ success: true, event });
    } else {
      const event = mockStore.updateEvent(id, data);
      return res.json({ success: true, event });
    }
  } catch (error) {
    console.error('updateEvent error:', error);
    return res.status(500).json({ success: false, message: 'Error updating event' });
  }
};

// @desc    Admin: Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      await Event.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Event deleted successfully' });
    } else {
      mockStore.deleteEvent(id);
      return res.json({ success: true, message: 'Event deleted successfully' });
    }
  } catch (error) {
    console.error('deleteEvent error:', error);
    return res.status(500).json({ success: false, message: 'Error deleting event' });
  }
};
