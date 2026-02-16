import React, { useState } from 'react';
import { createHearingAid } from '../../api/api';

function AdminAddItemButton({ onCreated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    color: '',
    price: '',
    stock: '',
    image: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await createHearingAid({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });
      setFormData({
        brand: '',
        model: '',
        color: '',
        price: '',
        stock: '',
        image: '',
        description: ''
      });
      setIsModalOpen(false);
      if (onCreated) {
        onCreated();
      }
    } catch (err) {
      setSubmitError(err?.response?.data?.message || 'Failed to add product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className='bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2'
      >
        <span className='text-xl'>+</span>
        Add Items
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-6 rounded-t-3xl flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Add New Hearing Aid</h2>
              <button 
                onClick={handleClose}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:rotate-90"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="font-semibold text-indigo-700 mb-2 text-sm">Brand *</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g., Phonak"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-indigo-700 mb-2 text-sm">Model *</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g., Audeo Paradise"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="font-semibold text-indigo-700 mb-2 text-sm">Color *</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="e.g., Beige, Black"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-indigo-700 mb-2 text-sm">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 89999"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="font-semibold text-indigo-700 mb-2 text-sm">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="e.g., 10"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold text-indigo-700 mb-2 text-sm">Image URL *</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col mb-6 relative">
                <label className="font-semibold text-indigo-700 mb-2 text-sm">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description (max 500 characters)"
                  rows="4"
                  maxLength="500"
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all resize-none"
                />
                <span className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                  {formData.description.length}/500
                </span>
              </div>

              {submitError && (
                <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">
                  {submitError}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button 
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg font-semibold hover:from-pink-500 hover:to-purple-500 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease;
        }
      `}</style>
    </>
  );
}

export default AdminAddItemButton;
