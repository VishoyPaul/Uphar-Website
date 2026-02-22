import React, { useState } from 'react';
import { createAppointment } from '../api/api';
import useAlert from '../hooks/useAlert';

function Connectform() {
  const [formData, setFormData] = useState({
    serviceType: '',
    fullName: '',
    phone: '',
    email: '',
    age: '',
    preferredDate: '',
    timeSlot: '',
    visitType: 'in-store',
    streetAddress: '',
    city: '',
    state: '',
    pinCode: '',
    landmark: '',
    reasonForVisit: '',
    hearingIssues: [],
    additionalNotes: '',
    agreeToTerms: false,
    sendReminders: false
  });

  const [showAddress, setShowAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { showAlert } = useAlert();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'hearingIssues') {
      const updatedIssues = checked
        ? [...formData.hearingIssues, value]
        : formData.hearingIssues.filter(issue => issue !== value);
      
      setFormData({ ...formData, hearingIssues: updatedIssues });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Show/hide address fields based on visit type
    if (name === 'visitType') {
      setShowAddress(value === 'home-visit');
    }

    // Show/hide address for hearing consultation only
    if (name === 'serviceType') {
      if (value !== 'hearing-consultation') {
        setShowAddress(false);
        setFormData(prev => ({ ...prev, visitType: 'in-store' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await createAppointment(formData);
      if (response?.success) {
        setShowSuccess(true);
        showAlert({
          type: 'success',
          title: 'Appointment booked',
          message: 'Your appointment request has been submitted.',
        });
        // Reset form
        setFormData({
          serviceType: '',
          fullName: '',
          phone: '',
          email: '',
          age: '',
          preferredDate: '',
          timeSlot: '',
          visitType: 'in-store',
          streetAddress: '',
          city: '',
          state: '',
          pinCode: '',
          landmark: '',
          reasonForVisit: '',
          hearingIssues: [],
          additionalNotes: '',
          agreeToTerms: false,
          sendReminders: false
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        const message = 'Failed to book appointment. Please try again.';
        setSubmitError(message);
        showAlert({
          type: 'error',
          title: 'Booking failed',
          message,
        });
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to book appointment. Please try again.';
      setSubmitError(message);
      showAlert({
        type: 'error',
        title: 'Booking failed',
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
            Book Your Appointment
          </h1>
          <p className="text-gray-600">Schedule your hearing aid consultation</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg animate-slideDown">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <p className="font-bold">Appointment Booked Successfully!</p>
                <p className="text-sm">We've sent a confirmation email to your address.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8">
          {submitError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg animate-slideDown">
              <div className="flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <p className="font-bold">Booking failed</p>
                  <p className="text-sm">{submitError}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Service Type */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">Select Service Type *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <label className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${formData.serviceType === 'eye-checkup' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}>
                <input
                  type="radio"
                  name="serviceType"
                  value="eye-checkup"
                  checked={formData.serviceType === 'eye-checkup'}
                  onChange={handleChange}
                  className="mr-3"
                  required
                />
                <span className="font-medium">👁️ Eye Check-up</span>
                <p className="text-xs text-gray-500 ml-6">In-store only</p>
              </label> */}

              <label className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${formData.serviceType === 'hearing-consultation' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                <input
                  type="radio"
                  name="serviceType"
                  value="hearing-consultation"
                  checked={formData.serviceType === 'hearing-consultation'}
                  onChange={handleChange}
                  className="mr-3"
                  required
                />
                <span className="font-medium">🎧 Hearing Aid Consultation</span>
                <p className="text-xs text-gray-500 ml-6">In-store or Home visit</p>
              </label>
            </div>
          </div>

          {/* Personal Information */}
          <div className="border-t-2 border-gray-100 pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Your age"
                  min="1"
                  max="120"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="border-t-2 border-gray-100 pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Preferred Date *</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={getTodayDate()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Time Slot *</label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                  required
                >
                  <option value="">Select time slot</option>
                  <option value="morning-9">9:00 AM - 10:00 AM</option>
                  <option value="morning-10">10:00 AM - 11:00 AM</option>
                  <option value="morning-11">11:00 AM - 12:00 PM</option>
                  <option value="afternoon-12">12:00 PM - 1:00 PM</option>
                  <option value="afternoon-2">2:00 PM - 3:00 PM</option>
                  <option value="evening-3">3:00 PM - 4:00 PM</option>
                  <option value="evening-4">4:00 PM - 5:00 PM</option>
                  <option value="evening-5">5:00 PM - 6:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Visit Type - Only for Hearing Consultation */}
          {formData.serviceType === 'hearing-consultation' && (
            <div className="border-t-2 border-gray-100 pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Visit Type</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${formData.visitType === 'in-store' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                  <input
                    type="radio"
                    name="visitType"
                    value="in-store"
                    checked={formData.visitType === 'in-store'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span className="font-medium">🏢 In-Store Visit</span>
                  <p className="text-xs text-gray-500 ml-6">Free consultation</p>
                </label>

                <label className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${formData.visitType === 'home-visit' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                  <input
                    type="radio"
                    name="visitType"
                    value="home-visit"
                    checked={formData.visitType === 'home-visit'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <span className="font-medium">🏠 Home Visit</span>
                  <p className="text-xs text-gray-500 ml-6">₹500 charges apply</p>
                </label>
              </div>
            </div>
          )}

          {/* Address - Only for Home Visit */}
          {showAddress && formData.visitType === 'home-visit' && (
            <div className="border-t-2 border-gray-100 pt-6 mb-6 animate-slideDown">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Details</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Street Address *</label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="House/Flat No, Street Name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                  required={showAddress}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    required={showAddress}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    required={showAddress}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">PIN Code *</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="6-digit PIN"
                    pattern="[0-9]{6}"
                    maxLength="6"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                    required={showAddress}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Nearby landmark (optional)"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="border-t-2 border-gray-100 pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Reason for Visit</label>
              <select
                name="reasonForVisit"
                value={formData.reasonForVisit}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
              >
                <option value="">Select reason</option>
                <option value="first-time">First time consultation</option>
                <option value="follow-up">Follow-up appointment</option>
                <option value="repair">Hearing aid repair/service</option>
                <option value="battery">Battery replacement</option>
                <option value="hearing-test">Hearing test</option>
                <option value="purchase">Purchase consultation</option>
                <option value="other">Other</option>
              </select>
            </div>

            {formData.serviceType === 'hearing-consultation' && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-3">Current Hearing Issues</label>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="hearingIssues"
                      value="difficulty-conversations"
                      checked={formData.hearingIssues.includes('difficulty-conversations')}
                      onChange={handleChange}
                      className="mr-3 w-5 h-5 text-pink-500 rounded focus:ring-2 focus:ring-pink-400"
                    />
                    <span>Difficulty hearing in conversations</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="hearingIssues"
                      value="tinnitus"
                      checked={formData.hearingIssues.includes('tinnitus')}
                      onChange={handleChange}
                      className="mr-3 w-5 h-5 text-pink-500 rounded focus:ring-2 focus:ring-pink-400"
                    />
                    <span>Ringing in ears (Tinnitus)</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="hearingIssues"
                      value="already-using"
                      checked={formData.hearingIssues.includes('already-using')}
                      onChange={handleChange}
                      className="mr-3 w-5 h-5 text-pink-500 rounded focus:ring-2 focus:ring-pink-400"
                    />
                    <span>Already using hearing aid</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="hearingIssues"
                      value="ear-pain"
                      checked={formData.hearingIssues.includes('ear-pain')}
                      onChange={handleChange}
                      className="mr-3 w-5 h-5 text-pink-500 rounded focus:ring-2 focus:ring-pink-400"
                    />
                    <span>Ear pain or discomfort</span>
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">Additional Notes/Comments</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any specific requirements or questions..."
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t-2 border-gray-100 pt-6 mb-6">
            <label className="flex items-start cursor-pointer mb-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mr-3 mt-1 w-5 h-5 text-pink-500 rounded focus:ring-2 focus:ring-pink-400"
                required
              />
              <span className="text-gray-700">
                I agree to the <a href="#" className="text-pink-500 hover:underline">terms and conditions</a> and <a href="#" className="text-pink-500 hover:underline">privacy policy</a> *
              </span>
            </label>

            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                name="sendReminders"
                checked={formData.sendReminders}
                onChange={handleChange}
                className="mr-3 mt-1 w-5 h-5 text-pink-500 rounded focus:ring-2 focus:ring-pink-400"
              />
              <span className="text-gray-700">
                Send me appointment reminders via SMS/Email
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Booking...
              </span>
            ) : (
              'Book Appointment'
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default Connectform;
