import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GarageLoading from '../components/GarageLoading';


const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        vehicleType: '',
        year: new Date(),
        problemType: '',
        otherIssue: '',
        dateTime: new Date(),
        location: '',
        status: 'Pending',
        userId: '', // Required for backend
    });
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch user info on component load to get userId
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/me`, {
            credentials: 'include', // Send cookies with request
        })
            .then((res) => res.json())
            .then((data) => {
                if (data._id) {
                    setFormData((prev) => ({ ...prev, userId: data._id }));
                }
            })
            .catch((err) => {
                console.error('Failed to fetch user:', err);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const cleanedData = {
            ...formData,
            vehicleModel: formData.year.getFullYear(), // send year as vehicleModel
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/service-request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Important: send cookie with JWT
                body: JSON.stringify(cleanedData),
            });

            const result = await response.json();

            if (response.ok) {
                setShowPopup(true);
                setErrorMessage('');
            } else {
                setShowPopup(false);
                setErrorMessage(result.message || 'Submission failed.');
            }
        } catch (err) {
            setShowPopup(false);
            setErrorMessage('Server error. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen  p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">Book a Service</h2>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />

                <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />

                <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                    className="w-1/2 p-3 border border-gray-300 rounded-lg"
                >
                    <option value="">Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="truck">Truck</option>
                    <option value="bus">Bus</option>
                </select>

                <div>
                    <label className="block mb-1 font-semibold">Select Vehicle Model (Year)</label>
                    <DatePicker
                        selected={formData.year}
                        onChange={(date) => setFormData({ ...formData, year: date })}
                        showYearPicker
                        dateFormat="yyyy"
                        className="w-full p-3 border border-gray-300 rounded-lg text-center"
                    />
                </div>

                <select
                    name="problemType"
                    value={formData.problemType}
                    onChange={handleChange}
                    required
                    className="w-1/2 p-3 border border-gray-300 rounded-lg"
                >
                    <option value="">Select Problem</option>
                    <option value="engine">Engine Issue</option>
                    <option value="battery">Battery Problem</option>
                    <option value="brake">Brake Issue</option>
                    <option value="service">Oil Change / Service</option>
                    <option value="tire">Tire / Puncture Repair</option>
                    <option value="electrical">Electrical Issue</option>
                    <option value="body">Body Repair / Paint</option>
                    <option value="ac">AC/Heating Issue</option>
                    <option value="other">Other</option>
                </select>

                {formData.problemType === 'other' && (
                    <textarea
                        name="otherIssue"
                        value={formData.otherIssue}
                        onChange={handleChange}
                        placeholder="Describe Issue"
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24"
                    />
                )}

                <div>
                    <label className="block mb-1 font-semibold">Select Booking Date</label>
                    <DatePicker
                        selected={formData.dateTime}
                        onChange={(date) => setFormData({ ...formData, dateTime: date })}
                        showTimeSelect
                        dateFormat="dd/MM/yyyy h:mm aa"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter city or street name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full p-3 bg-yellow-400 text-white rounded-lg font-semibold hover:bg-blue-400"
                >
                    Submit
                </button>
            </form>

            {/* Success Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
                        <h2 className="text-xl font-bold mb-2 text-green-600">Form Submitted!</h2>
                        <p className="mb-4 text-gray-700">Thank you for booking your service.</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Error Popup */}
            {errorMessage && !showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
                        <h2 className="text-xl font-bold mb-2 text-red-600">Form not Submitted!</h2>
                        <p className="mb-4 text-gray-700">{errorMessage}</p>
                        <button
                            onClick={() => setErrorMessage('')}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
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

export default Form;
