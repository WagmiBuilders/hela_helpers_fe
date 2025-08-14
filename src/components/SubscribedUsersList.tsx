import { useEffect, useState } from "react";
import {
  getAllSubscribedUsers,
  triggerPredictionsForAllLocations,
} from "../services/subscribeService";
import "./style/SubscribedUsersList.css";

interface SubscribedUser {
  id: number;
  name: string;
  phoneNumber: string;
  email?: string;
}

const SubscribedUsersList = () => {
  const [users, setUsers] = useState<SubscribedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllSubscribedUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setNotification({
        show: true,
        type: "error",
        message: "Failed to fetch users",
      });
    }
  };

  const handleSendPredictions = async () => {
    setLoading(true);
    try {
      const response = await triggerPredictionsForAllLocations();
      setNotification({
        show: true,
        type: "success",
        message:
          response || "Weather predictions triggered successfully",
      });
    } catch (error) {
      console.error("Error triggering predictions:", error);
      const anyErr = error as { response?: { data?: { message?: string } } };
      setNotification({
        show: true,
        type: "error",
        message:
            anyErr.response?.data?.message ?? (error instanceof Error ? error.message : 'Failed to trigger weather predictions')
      });
    }
    setLoading(false);
  };

  return (
    <div className="subscribed-users-container">
      <h2>Subscribed Users</h2>

      <div className="notification-section">
        <button
          onClick={handleSendPredictions}
          disabled={loading}
          className="send-notification-btn"
        >
          {loading ? "Processing..." : "Trigger Weather Predictions"}
        </button>
      </div>

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscribedUsersList;
