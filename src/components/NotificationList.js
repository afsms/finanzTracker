function NotificationList({ notifications, markNotificationAsRead }) {
      return (
        <div className="mb-4 p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Benachrichtigungen</h2>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="flex items-center justify-between py-2 border-b">
                <div>
                  <span className="font-bold">{notification.title}</span> -{' '}
                  {notification.message}
                </div>
                <button
                  onClick={() => markNotificationAsRead(notification.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Gelesen
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    export default NotificationList;
