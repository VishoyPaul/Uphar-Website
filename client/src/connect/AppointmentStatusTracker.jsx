import React, { useState } from 'react';
import { getMyAppointments } from '../api/api';

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString();
};

function AppointmentStatusTracker() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleCheckStatus = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await getMyAppointments(email, phone);
      setAppointments(response?.data || []);
    } catch (err) {
      setAppointments([]);
      setError(err?.response?.data?.message || 'Failed to fetch appointment status.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto mt-8 mb-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Appointment Status</h2>
        <p className="text-sm text-gray-600 mb-5">
          Enter same email and phone used during booking.
        </p>

        <form onSubmit={handleCheckStatus} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-400"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit Phone"
            pattern="[0-9]{10}"
            maxLength="10"
            className="px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-400"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-3 hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isLoading ? 'Checking...' : 'Check'}
          </button>
        </form>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">
            {error}
          </div>
        )}

        {!isLoading && !error && appointments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 text-sm">Appointment ID</th>
                  <th className="text-left px-3 py-2 text-sm">Date</th>
                  <th className="text-left px-3 py-2 text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => (
                  <tr key={item._id} className="border-t border-gray-100">
                    <td className="px-3 py-2 text-sm">{item.appointmentId || item._id}</td>
                    <td className="px-3 py-2 text-sm">{formatDate(item.preferredDate)}</td>
                    <td className="px-3 py-2 text-sm capitalize font-semibold">
                      {item.status || 'pending'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {hasSearched && !isLoading && !error && appointments.length === 0 && (
          <p className="text-sm text-gray-500">No appointments found yet.</p>
        )}
      </div>
    </section>
  );
}

export default AppointmentStatusTracker;
