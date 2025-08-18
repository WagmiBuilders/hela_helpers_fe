import { useEffect, useState } from "react";
import {
  createSubscribedUser,
  getSubscribedUserByPhone,
} from "../services/subscribeService";
import { getAllToPredictLocations } from "../services/toPredictLocationService";
import "./style/SubscribeUserPage.css";


interface SubscribedUser {
  name: string;
  email: string;
  phoneNumber: string;
  toPredictLocation: string;
}

interface Location {
  id: number;
  location: string;
}

function SubscribeUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    locationId: "",
  });

  const [searchPhone, setSearchPhone] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [searchedUser, setSearchedUser] = useState<SubscribedUser | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const predictedLocations = await getAllToPredictLocations();
        setLocations(predictedLocations);
      } catch (err) {
        console.error("Error loading locations:", err);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^94\d{9}$/;

    if (!phoneRegex.test(formData.phoneNumber)) {
      setResponseMessage(
        "❌ Invalid phone number. It should start with 94 and be 11 digits."
      );
      setShowModal(true);
      return;
    }

    try {
      const payload = {
        ...formData,
        locationId: parseInt(formData.locationId, 10),
      };
      const newUser = await createSubscribedUser(payload);
      setResponseMessage(
        `✅ Subscribed: ${newUser.name}. You will receive a daily message with rainfall predictions.`
      );
      setSearchedUser(null); // clear search
      setShowModal(true);
      setFormData({ name: "", phoneNumber: "", email: "", locationId: "" });
    } catch (error) {
      console.log("Error subscribing user:", error);
      setResponseMessage("❌ Failed to subscribe.");
      setSearchedUser(null);
      setShowModal(true);
    }
  };

  const handleSearch = async () => {
    try {
      const user = await getSubscribedUserByPhone(searchPhone);
      setSearchedUser(user);
      setResponseMessage("");
      setShowModal(true);
    } catch (error) {
      console.log("Error fetching user:", error);
      setSearchedUser(null);
      setResponseMessage("🔍 User not found.");
      setShowModal(true);
    }
  };

  return (
    <div className="subscribe-page-container">
      <h2>Subscribe to Updates</h2>
      <form className="subscription-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <input
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          required
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <select
          name="locationId"
          value={formData.locationId}
          onChange={handleChange}
          required
        >
          <option value="">Select District</option>
          {locations?.map((location) => (
            <option key={location.id} value={location.id}>
              {location.location}
            </option>
          ))}
        </select>
        <button type="submit">Subscribe</button>
      </form>

      <h2>Search User by Phone</h2>
      <div className="search-form">
        <input
          type="text"
          placeholder="Phone Number"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ×
            </button>
            {responseMessage && <p>{responseMessage}</p>}
            {searchedUser && (
              <div className="user-card">
                <p>
                  <strong>Name:</strong> {searchedUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {searchedUser.email}
                </p>
                <p>
                  <strong>Phone:</strong> {searchedUser.phoneNumber}
                </p>
                <p>
                  <strong>Location :</strong> {searchedUser.toPredictLocation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscribeUserPage;
