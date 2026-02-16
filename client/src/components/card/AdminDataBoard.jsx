import React from 'react';
import styled from 'styled-components';

const AdminDataBoard = () => {
  // Dummy data
  const products = [
    {
      _id: '1',
      brand: 'Ray-Ban',
      model: 'Aviator Classic',
      gender: 'Unisex',
      shape: 'Aviator',
      material: 'Metal',
      weight: 45,
      variants: [
        { color: 'Gold', price: 2499, stock: 25 },
        { color: 'Silver', price: 2299, stock: 15 }
      ]
    },
    {
      _id: '2',
      brand: 'Oakley',
      model: 'Holbrook',
      gender: 'Male',
      shape: 'Square',
      material: 'Plastic',
      weight: 38,
      variants: [
        { color: 'Black', price: 3999, stock: 10 },
        { color: 'Blue', price: 3999, stock: 8 }
      ]
    },
    {
      _id: '3',
      brand: 'Prada',
      model: 'Cat Eye PR12',
      gender: 'Female',
      shape: 'Cat Eye',
      material: 'Acetate',
      weight: 32,
      variants: [
        { color: 'Pink', price: 5499, stock: 5 },
        { color: 'Tortoise', price: 5499, stock: 12 }
      ]
    },
    {
      _id: '4',
      brand: 'Gucci',
      model: 'GG0061S',
      gender: 'Female',
      shape: 'Round',
      material: 'Metal',
      weight: 40,
      variants: [
        { color: 'Rose Gold', price: 6999, stock: 20 },
        { color: 'Black', price: 6999, stock: 15 }
      ]
    },
    {
      _id: '5',
      brand: 'Persol',
      model: 'Steve McQueen',
      gender: 'Male',
      shape: 'Square',
      material: 'Acetate',
      weight: 42,
      variants: [
        { color: 'Havana', price: 4599, stock: 7 },
        { color: 'Black', price: 4599, stock: 9 }
      ]
    },
    {
      _id: '6',
      brand: 'Tom Ford',
      model: 'Whitney',
      gender: 'Unisex',
      shape: 'Butterfly',
      material: 'Acetate',
      weight: 35,
      variants: [
        { color: 'Tortoise', price: 7999, stock: 12 },
        { color: 'Brown', price: 7999, stock: 18 }
      ]
    },
    {
      _id: '7',
      brand: 'Warby Parker',
      model: 'Haskell',
      gender: 'Unisex',
      shape: 'Round',
      material: 'Acetate',
      weight: 30,
      variants: [
        { color: 'Whiskey Tortoise', price: 1999, stock: 30 },
        { color: 'Crystal', price: 1999, stock: 25 }
      ]
    },
    {
      _id: '8',
      brand: 'Carrera',
      model: 'Champion',
      gender: 'Male',
      shape: 'Aviator',
      material: 'Metal',
      weight: 48,
      variants: [
        { color: 'Gold Black', price: 3499, stock: 4 },
        { color: 'Ruthenium', price: 3499, stock: 6 }
      ]
    }
  ];

  // Calculate total stock for all variants
  const getTotalStock = (variants) => {
    return variants.reduce((sum, v) => sum + v.stock, 0);
  };

  // Get price range
  const getPriceRange = (variants) => {
    const prices = variants.map(v => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹${min}` : `₹${min} - ₹${max}`;
  };

  // Get all colors
  const getColors = (variants) => {
    return variants.map(v => v.color).join(', ');
  };

  return (
    <StyledWrapper>
      <div className="databoard-container">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Gender</th>
                <th>Shape</th>
                <th>Material</th>
                <th>Weight</th>
                <th>Colors</th>
                <th>Price Range</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const totalStock = getTotalStock(product.variants);
                const isLowStock = totalStock < 10;
                
                return (
                  <tr key={product._id}>
                    <td className="brand-cell">{product.brand}</td>
                    <td>{product.model}</td>
                    <td>
                      <span className={`gender-badge ${product.gender.toLowerCase()}`}>
                        {product.gender}
                      </span>
                    </td>
                    <td>{product.shape}</td>
                    <td>{product.material}</td>
                    <td className="weight-cell">{product.weight}g</td>
                    <td className="colors-cell">{getColors(product.variants)}</td>
                    <td className="price-cell">{getPriceRange(product.variants)}</td>
                    <td className="stock-cell">
                      <span className={`stock-badge ${isLowStock ? 'low-stock' : ''}`}>
                        {totalStock}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="btn-icon" title="Edit">✏️</button>
                      <button className="btn-icon" title="View">👁️</button>
                      <button className="btn-icon delete" title="Delete">🗑️</button>
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

  .brand-cell {
    font-weight: 600;
    color: #434DA6;
  }

  .gender-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-block;
  }

  .gender-badge.male {
    background: #83C0EE20;
    color: #83C0EE;
  }

  .gender-badge.female {
    background: #FCA1E820;
    color: #FCA1E8;
  }

  .gender-badge.unisex {
    background: #EBE0FA;
    color: #434DA6;
  }

  .weight-cell {
    color: #666;
    font-family: monospace;
  }

  .colors-cell {
    color: #555;
    font-size: 0.85rem;
    max-width: 200px;
  }

  .price-cell {
    font-weight: 600;
    color: #2d9f5d;
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

  .actions-cell {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
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
  }
`;

export default AdminDataBoard;