import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

export const syncWithGoogleCalendar = async (task) => {
  const calendar = google.calendar({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY,
  });

  const event = {
    summary: task.title,
    description: task.description,
    start: { dateTime: task.dueDate, timeZone: "UTC" },
    end: { dateTime: task.dueDate, timeZone: "UTC" },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    return response.data;
  } catch (error) {
    throw new Error("Google Calendar sync failed: " + error.message);
  }
};
