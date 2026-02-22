import React from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

const CartCard = ({ cartItems = [], onIncrement, onDecrement, onRemove }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">


      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🛒</span>
        <h2 className="text-xl font-bold text-gray-800">Your Items</h2>
        <span className="ml-auto bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full">
          {cartItems.length} items
        </span>
      </div>


      <div className="flex flex-col gap-4">
        {cartItems.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            Your cart is empty.
          </div>
        )}

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100"
          >

            <img
              src={item.image}
              alt={item.model}
              className="w-20 h-20 object-cover rounded-xl border border-gray-200"
            />


            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-sm">{item.brand}</h3>
              <p className="text-gray-500 text-xs">{item.model}</p>
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full mt-1 inline-block">
                {item.color}
              </span>
              <p className="text-indigo-600 font-bold text-sm mt-1">
                ₹{item.price.toLocaleString()}
              </p>
            </div>


            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-2 py-1">
                <button
                  onClick={() => onDecrement?.(item._id)}
                  className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-pink-500 transition"
                >
                  <FiMinus size={14} />
                </button>
                <span className="text-sm font-semibold w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onIncrement?.(item._id)}
                  className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-pink-500 transition"
                >
                  <FiPlus size={14} />
                </button>
              </div>
              <button
                onClick={() => onRemove?.(item._id)}
                className="text-red-400 hover:text-red-600 transition"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
        />
        <button className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition">
          Apply
        </button>
      </div>
    </div>
  );
};

export default CartCard;
