import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAppointments } from '../../api/api';

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString();
};

const formatTimeSlot = (value) => {
  if (!value) return '-';
  return value
    .replace('morning-', 'Morning ')
    .replace('afternoon-', 'Afternoon ')
    .replace('evening-', 'Evening ');
};

const AdminAppointmentsBoard = ({ refreshKey = 0 }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchAppointments = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await getAppointments();
        if (isMounted) {
          setAppointments(response?.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.message || 'Failed to load appointments.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAppointments();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  return (
    <StyledWrapper>
      <div className="databoard-container">
        <div className="table-header">
          <h3>Appointments</h3>
          <span className="count-badge">{appointments.length}</span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Visit Type</th>
                <th>Status</th>
                <th>Address</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="10" className="state-cell">Loading appointments...</td>
                </tr>
              )}
              {!isLoading && error && (
                <tr>
                  <td colSpan="10" className="state-cell error">{error}</td>
                </tr>
              )}
              {!isLoading && !error && appointments.length === 0 && (
                <tr>
                  <td colSpan="10" className="state-cell">No appointments found.</td>
                </tr>
              )}
              {!isLoading && !error && appointments.map((appt) => {
                const address = appt?.address
                  ? [appt.address.street, appt.address.city, appt.address.state, appt.address.pinCode]
                      .filter(Boolean)
                      .join(', ')
                  : '-';
                return (
                  <tr key={appt._id}>
                    <td className="strong">{appt.fullName}</td>
                    <td>{appt.phone}</td>
                    <td>{appt.email}</td>
                    <td>{appt.serviceType === 'eye-checkup' ? 'Eye Check-up' : 'Hearing Consultation'}</td>
                    <td>{formatDate(appt.preferredDate)}</td>
                    <td>{formatTimeSlot(appt.timeSlot)}</td>
                    <td>{appt.visitType === 'home-visit' ? 'Home Visit' : 'In-store'}</td>
                    <td>
                      <span className={`status-badge status-${appt.status || 'pending'}`}>
                        {appt.status || 'pending'}
                      </span>
                    </td>
                    <td className="muted">{address}</td>
                    <td className="muted">{appt.additionalNotes || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .databoard-container {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-top: 1.5rem;
  }

  .table-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .table-header h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2f2f2f;
  }

  .count-badge {
    background: #eaf2ff;
    color: #1d4ed8;
    font-weight: 700;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.85rem;
  }

  .table-wrapper {
    overflow-x: auto;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88rem;
  }

  .data-table thead {
    background: linear-gradient(135deg, #85b6ff, #d9e7ff);
    color: #1f2b50;
  }

  .data-table th {
    padding: 0.85rem;
    text-align: left;
    font-weight: 700;
    white-space: nowrap;
  }

  .data-table tbody tr {
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.2s;
  }

  .data-table tbody tr:hover {
    background: #f8fbff;
  }

  .data-table td {
    padding: 0.85rem;
    color: #333;
    vertical-align: top;
  }

  .strong {
    font-weight: 700;
    color: #1f2937;
  }

  .muted {
    color: #6b7280;
    max-width: 220px;
  }

  .status-badge {
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.78rem;
    text-transform: capitalize;
    display: inline-block;
  }

  .status-pending {
    background: #fff3cd;
    color: #8a6d3b;
  }

  .status-confirmed {
    background: #d1e7dd;
    color: #0f5132;
  }

  .status-completed {
    background: #e2e3e5;
    color: #41464b;
  }

  .status-cancelled {
    background: #f8d7da;
    color: #842029;
  }

  .state-cell {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-weight: 600;
  }

  .state-cell.error {
    color: #a11f1f;
  }

  @media (max-width: 1024px) {
    .data-table {
      min-width: 1100px;
    }
  }
`;

export default AdminAppointmentsBoard;
