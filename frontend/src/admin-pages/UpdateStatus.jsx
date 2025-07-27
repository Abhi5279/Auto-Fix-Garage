import React, { useEffect, useState } from 'react';
import GarageLoading from '../components/GarageLoading';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const UpdateStatus = () => {
  const [requests, setRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deletePopup, setShowDeletePopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/service-request`, {
        credentials: 'include',
      });
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error('Error fetching status:', err);
    }finally{
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/service-request/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );
        setShowPopup(true);
        setDeleteStatus(true);
        setTimeout(() => setShowPopup(false), 2000);
      } else {
        console.error('Failed to update status:', result.message);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }finally{
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/service-request/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setShowDeletePopup(true);
        setTimeout(() => setShowDeletePopup(false), 2000);
        setRequests((prev) => prev.filter((req) => req._id !== id));
      } else {
        console.error('Failed to delete request');
      }
    } catch (err) {
      console.error('Error deleting request:', err);
    }finally{
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen p-6 ">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Update Service Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="bg-gray-200 p-4 rounded-xl shadow flex justify-between items-start relative mb-4"
          >
            <div className="space-y-1">
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Contact:</strong> {req.contact}</p>
              <p><strong>Problem:</strong> {req.problemType === 'other' ? req.otherIssue : req.problemType}</p>
              <p><strong>Vehicle:</strong> {req.vehicleType} - {req.vehicleModel}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Booked On:</strong> {new Date(req.dateTime).toLocaleString()}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`font-semibold ${req.status === 'Accepted'
                  ? 'text-green-600'
                  : req.status === 'Rejected'
                    ? 'text-red-600'
                    : 'text-yellow-400'
                  }`}>
                  {req.status}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 ">
              <button
                onClick={() => {
                  handleStatusUpdate(req._id, 'Accepted')
                }}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate(req._id, 'Rejected')}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                Reject
              </button>
              {req.status === 'Rejected' && (
                <button
                  onClick={() => handleDelete(req._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
            <h2 className="text-xl font-semibold m-2 text-green-600">Status Updated!</h2>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {deletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
            <h2 className="text-xl font-semibold m-2 text-red-600">Deleted Succesfully!</h2>
            <button
              onClick={() => setShowDeletePopup(false)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Close
            </button>
          </div>
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

export default UpdateStatus;
