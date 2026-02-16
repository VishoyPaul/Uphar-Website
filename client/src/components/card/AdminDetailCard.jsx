import React from 'react';
import styled from 'styled-components';

const AdminDetailCard = ({details, title, color = '#fff480', icon}) => {
  return (
    <StyledWrapper color={color}>
      <div className="card">
        <div className="card-content">
          <div className="card-top">
            <span className="card-title">{title}</span>
          </div>
          <div className="card-bottom">
            <p className="card-details">{details}</p>
          </div>
        </div>
        <div className="card-image">
          {icon && <span className="card-icon">{icon}</span>}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    min-width: 250px;
    background: ${props => props.color || '#fff480'};
    color: black;
    position: relative;
    border-radius: 2.5em;
    padding: 2em;
    transition: transform 0.4s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .card .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2em;
    height: 100%;
    transition: transform 0.4s ease;
    position: relative;
    z-index: 1;
  }

  .card .card-top, .card .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card .card-top p, .card .card-top .card-title, .card .card-bottom p, .card .card-bottom .card-title {
    margin: 0;
  }

  .card .card-title {
    font-weight: 600;
    font-size: 0.95rem;
    opacity: 0.9;
  }

  .card .card-details {
    font-weight: bold;
    font-size: 2rem;
    color: #333;
  }

  .card .card-bottom {
    align-items: flex-end;
  }

  .card .card-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    pointer-events: none;
    opacity: 0.15;
  }

  .card .card-icon {
    font-size: 5em;
    transition: transform 0.4s ease;
  }

  .card:hover {
    cursor: pointer;
    transform: scale(0.97);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  .card:hover .card-content {
    transform: scale(0.96);
  }

  .card:hover .card-icon {
    transform: scale(1.1) rotate(5deg);
  }

  .card:active {
    transform: scale(0.93);
  }
`;

export default AdminDetailCard;