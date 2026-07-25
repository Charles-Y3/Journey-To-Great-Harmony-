import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReminderState {
  morningTime: string; // "HH:MM", 24-hour, local time
  eveningTime: string;
  /** True after the user taps “Add to Calendar” for that reminder (downloads .ics). */
  morningCalendarAdded: boolean;
  eveningCalendarAdded: boolean;
  setMorningTime: (time: string) => void;
  setEveningTime: (time: string) => void;
  markMorningCalendarAdded: () => void;
  markEveningCalendarAdded: () => void;
}

// Persisted separately from journey progress and locale, since these are
// device-level calendar preferences, not app progress. Replaces the old
// in-app browser-Notification reminder (journey-notifications): that only
// ever fired while the tab happened to be open nearby the reminder time,
// with no way to notify a closed app or a locked phone. These times now
// only feed a downloadable .ics calendar event (see engine/calendarReminder.ts)
// — real OS-level reminders via the phone's own calendar app, no backend.
export const useReminders = create<ReminderState>()(
  persist(
    (set) => ({
      morningTime: '08:00',
      eveningTime: '19:00',
      morningCalendarAdded: false,
      eveningCalendarAdded: false,
      setMorningTime: (morningTime) => set({ morningTime }),
      setEveningTime: (eveningTime) => set({ eveningTime }),
      markMorningCalendarAdded: () => set({ morningCalendarAdded: true }),
      markEveningCalendarAdded: () => set({ eveningCalendarAdded: true }),
    }),
    {
      name: 'journey-reminders',
      version: 2,
      migrate: (persisted) => {
        const p = persisted as Partial<ReminderState>;
        return {
          morningTime: p.morningTime ?? '08:00',
          eveningTime: p.eveningTime ?? '19:00',
          morningCalendarAdded: p.morningCalendarAdded ?? false,
          eveningCalendarAdded: p.eveningCalendarAdded ?? false,
        };
      },
    },
  ),
);
