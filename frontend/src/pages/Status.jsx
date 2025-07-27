import React, { useState, useEffect } from 'react';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
import GarageLoading from '../components/GarageLoading';



const Status = () => {
  const [requests, setRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get user ID from auth

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/api/auth/me`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          setUserId(data._id);
        }
      })
      .catch((err) => console.error('Error fetching user:', err));
  }, []);

  // Fetch user's requests once userId is available
  useEffect(() => {
    if (!userId) return;

    fetch(`${BASE_URL}/api/service-request/user/${userId}`, {
      credentials: 'include',
    })

      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error('Error fetching requests:', err));
    setLoading(false);
  }, [userId]);

  // Delete handler
  const handleDelete = async (idToDelete, indexToDelete) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/service-request/${idToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const result = await res.json();

      if (result.status === 'success') {
        setRequests((prev) => prev.filter((_, index) => index !== indexToDelete));
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1500);
      } else {
        console.error('Delete failed:', result.message);
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen p-6 ">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Your Service Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 ">No requests found.</p>
      ) : (
        <div className="grid gap-4 max-w-2xl mx-auto">
          {requests.map((req, index) => (
            <div key={req._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-start relative">
              <div className="space-y-1">
                <p><strong>Name:</strong> {req.name}</p>
                <p><strong>Contact:</strong> {req.contact}</p>
                <p><strong>Problem:</strong> {req.problemType === 'other' ? req.otherIssue : req.problemType}</p>
                <p><strong>Vehicle:</strong> {req.vehicleType} - {req.vehicleModel}</p>
                <p><strong>Location:</strong> {req.location}</p>
                <p><strong>Booked On:</strong> {new Date(req.dateTime).toLocaleString()}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${req.status === 'Pending'
                    ? 'bg-yellow-500'
                    : req.status === 'Accepted'
                      ? 'bg-green-500'
                      : req.status === 'Rejected'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                >
                  {req.status || 'Pending'}
                </span>

                <button
                  onClick={() => handleDelete(req._id, index)}
                  className="px-3 py-1 rounded-full text-white text-sm font-semibold bg-red-500 hover:bg-red-600 transition-colors">
                  Cancel Booking
                </button>
              </div>
              {showPopup && (
                <div className="fixed inset-0  bg-black bg-opacity-20 flex items-center justify-center p-4">
                  <div className="bg-white px-8 py-5  rounded-2xl shadow-2xl text-center flex flex-col justify-between">
                    <h2 className="text-2xl font-bold text-red-600">Booking Cancelled!</h2>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <GarageLoading />
        </div>
      )}
    </div>
  );
};

export default Status;
