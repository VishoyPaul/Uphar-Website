import React, { useState } from 'react';

const BillCard = ({ subtotal = 0, shipping = 499, discount = 0 }) => {

  const [selectedPayment, setSelectedPayment] = useState('');
  const total = subtotal + shipping - discount;

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: '📱' },
    { id: 'card', label: 'Card', icon: '💳' },
    { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
    { id: 'cod', label: 'COD', icon: '💵' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 h-fit">

      
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🧾</span>
        <h2 className="text-xl font-bold text-gray-800">Bill Details</h2>
      </div>

      
      <div className="flex flex-col gap-4">

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Subtotal</span>
          <span className="text-gray-800 font-medium text-sm">₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Shipping Charges</span>
          <span className="text-gray-800 font-medium text-sm">₹{shipping.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Discount</span>
          <span className="text-green-500 font-medium text-sm">- ₹{discount.toLocaleString()}</span>
        </div>

        
        <div className="border-t-2 border-dashed border-gray-200 my-1" />

        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-bold text-lg">Total</span>
          <span className="text-indigo-600 font-bold text-lg">₹{total.toLocaleString()}</span>
        </div>

        {discount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <p className="text-green-600 text-sm font-semibold">
              🎉 You are saving ₹{discount.toLocaleString()} on this order!
            </p>
          </div>
        )}
        <div className="border-t-2 border-gray-100 my-1" />

        <p className="text-gray-700 font-semibold text-sm">Select Payment Method</p>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              className={`flex items-center gap-2 border-2 rounded-xl p-3 transition-all text-sm font-medium
                ${selectedPayment === method.id
                  ? 'border-pink-500 bg-pink-50 text-pink-600'
                  : 'border-gray-200 text-gray-700 hover:border-pink-300'
                }`}
            >
              <span>{method.icon}</span>
              <span>{method.label}</span>
            </button>
          ))}
        </div>
        <button className="w-full mt-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-2xl hover:from-pink-600 hover:to-purple-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
          Place Order →
        </button>

        <p className="text-center text-gray-400 text-xs">
          🔒 100% Secure & Encrypted Payment
        </p>
      </div>
    </div>
  );
};

export default BillCard;