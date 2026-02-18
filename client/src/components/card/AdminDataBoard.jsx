import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteHearingAid, getHearingAids } from '../../api/api';

const AdminDataBoard = ({ refreshKey = 0, onChanged }) => {
  const [hearingAids, setHearingAids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchHearingAids = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await getHearingAids();
        if (isMounted) {
          setHearingAids(response?.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.message || 'Failed to load hearing aids.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchHearingAids();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Delete this item?');
    if (!confirmDelete) return;

    try {
      await deleteHearingAid(id);
      setHearingAids((prev) => prev.filter((item) => item._id !== id));
      if (onChanged) {
        onChanged();
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete hearing aid.');
    }
  };

  return (
    <StyledWrapper>
      <div className="databoard-container">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Color</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="8" className="state-cell">Loading hearing aids...</td>
                </tr>
              )}
              {!isLoading && error && (
                <tr>
                  <td colSpan="8" className="state-cell error">{error}</td>
                </tr>
              )}
              {!isLoading && !error && hearingAids.length === 0 && (
                <tr>
                  <td colSpan="8" className="state-cell">No hearing aids found.</td>
                </tr>
              )}
              {!isLoading && !error && hearingAids.map((device) => {
                const isLowStock = device.stock < 10;
                
                return (
                  <tr key={device._id}>
                    <td className="image-cell">
                      <img src={device.image} alt={device.model} />
                    </td>
                    <td className="brand-cell">{device.brand}</td>
                    <td>{device.model}</td>
                    <td>
                      <span className="color-badge">{device.color}</span>
                    </td>
                    <td className="price-cell">₹{device.price.toLocaleString()}</td>
                    <td className="stock-cell">
                      <span className={`stock-badge ${isLowStock ? 'low-stock' : ''}`}>
                        {device.stock}
                      </span>
                    </td>
                    <td className="description-cell">{device.description}</td>
                    <td className="actions-cell">
                      <button className="btn-icon" title="Edit">✏️</button>
                      <button className="btn-icon" title="View">👁️</button>
                      <button
                        className="btn-icon delete"
                        title="Delete"
                        onClick={() => handleDelete(device._id)}
                      >
                        🗑️
                      </button>
                    </td>
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
  }

  .table-wrapper {
    overflow-x: auto;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  .data-table thead {
    background: linear-gradient(135deg, #FCA1E8, #EBE0FA);
    color: white;
  }

  .data-table th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    white-space: nowrap;
  }

  .data-table tbody tr {
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.2s;
  }

  .data-table tbody tr:hover {
    background: #f9f9f9;
    transform: scale(1.01);
  }

  .data-table td {
    padding: 1rem;
    color: #333;
  }

  .image-cell img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #f0f0f0;
  }

  .brand-cell {
    font-weight: 600;
    color: #434DA6;
  }

  .color-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    background: #EBE0FA;
    color: #434DA6;
    display: inline-block;
  }

  .price-cell {
    font-weight: 600;
    color: #2d9f5d;
    font-size: 0.95rem;
  }

  .stock-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-weight: 600;
    background: #d4edda;
    color: #155724;
    display: inline-block;
  }

  .stock-badge.low-stock {
    background: #f8d7da;
    color: #721c24;
  }

  .description-cell {
    max-width: 300px;
    font-size: 0.85rem;
    color: #555;
    line-height: 1.4;
  }

  .actions-cell {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
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

  .btn-icon {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    transition: transform 0.2s;
    padding: 0.25rem;
  }

  .btn-icon:hover {
    transform: scale(1.2);
  }

  .btn-icon.delete:hover {
    filter: brightness(0.8);
  }

  @media (max-width: 1024px) {
    .table-wrapper {
      overflow-x: scroll;
    }

    .data-table {
      min-width: 1000px;
    }

    .description-cell {
      max-width: 200px;
    }
  }
`;

export default AdminDataBoard;
