import { LocalNotifications } from '@capacitor/local-notifications';

export const scheduleDailyNotifications = async () => {
  try {
    // Request permission for notifications
    const permStatus = await LocalNotifications.requestPermissions();
    if (permStatus.display !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    // Define notification times
    const times = [
      { hour: 12, minute: 0 }, // 12 PM
      { hour: 18, minute: 0 }, // 6 PM
      { hour: 21, minute: 0 }, // 9 PM
      { hour: 0, minute: 0 },
      { hour: 1, minute: 30 }   // 12 AM
    ];

    // Schedule notifications for each time
    const notifications = times.map((time, index) => ({
      id: index + 1,
      title: 'New Quiz Available!',
      body: 'A new quiz is live! Play now and earn lucky coupons 🎉',
      schedule: { at: new Date(new Date().setHours(time.hour, time.minute, 0, 0)) },
      sound: 'default',
      smallIcon: 'icon',
      largeIcon: 'icon',
      importance: 5
    }));

    await LocalNotifications.schedule({ notifications });

    console.log('Daily notifications scheduled!');

  } catch (error) {
    console.error('Error scheduling notifications:', error);
  }
};
