import { Booking } from '@/app/booking/domain/booking';

export const BOOKINGS: Booking[] = [
  {
    id: 1,
    userId: 1,
    sessionId: 1,
    timeBook: [
      {
        dayOfWeek: 'Monday',
        startTime: '09:00',
        endTime: '10:00',
        fullDate: new Date(2023, 0, 2).getTime(),
        availablePlace: 10,
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    sessionId: 2,
    timeBook: [
      {
        dayOfWeek: 'Tuesday',
        startTime: '10:00',
        endTime: '11:00',
        fullDate: new Date(2023, 0, 3).getTime(),
        availablePlace: 8,
      },
    ],
  },
  {
    id: 3,
    userId: 3,
    sessionId: 3,
    timeBook: [
      {
        dayOfWeek: 'Wednesday',
        startTime: '11:00',
        endTime: '12:00',
        fullDate: new Date(2023, 0, 4).getTime(),
        availablePlace: 6,
      },
    ],
  },
  {
    id: 4,
    userId: 1,
    sessionId: 1,
    timeBook: [
      {
        dayOfWeek: 'Thursday',
        startTime: '12:00',
        endTime: '13:00',
        fullDate: new Date(2023, 0, 5).getTime(),
        availablePlace: 4,
      },
    ],
  },
  {
    id: 5,
    userId: 2,
    sessionId: 2,
    timeBook: [
      {
        dayOfWeek: 'Friday',
        startTime: '13:00',
        endTime: '14:00',
        fullDate: new Date(2023, 0, 6).getTime(),
        availablePlace: 2,
      },
    ],
  },
  {
    id: 6,
    userId: 3,
    sessionId: 3,
    timeBook: [
      {
        dayOfWeek: 'Saturday',
        startTime: '14:00',
        endTime: '15:00',
        fullDate: new Date(2023, 0, 7).getTime(),
        availablePlace: 0,
      },
    ],
  },
];
