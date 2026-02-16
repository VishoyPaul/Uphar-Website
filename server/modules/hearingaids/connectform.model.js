const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    // Service Type
    serviceType: {
      type: String,
      enum: ['eye-checkup', 'hearing-consultation'],
      required: true
    },

    // Personal Information
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    age: {
      type: Number,
      min: 1,
      max: 120
    },

    // Appointment Details
    preferredDate: {
      type: Date,
      required: true
    },
    timeSlot: {
      type: String,
      required: true,
      enum: [
        'morning-9',
        'morning-10',
        'morning-11',
        'afternoon-12',
        'afternoon-2',
        'evening-3',
        'evening-4',
        'evening-5'
      ]
    },

    // Visit Type
    visitType: {
      type: String,
      enum: ['in-store', 'home-visit'],
      default: 'in-store'
    },

    // Address (for home visits)
    address: {
      street: String,
      city: String,
      state: String,
      pinCode: {
        type: String,
        match: /^[0-9]{6}$/
      },
      landmark: String
    },

    // Additional Information
    reasonForVisit: {
      type: String,
      enum: [
        'first-time',
        'follow-up',
        'repair',
        'battery',
        'hearing-test',
        'purchase',
        'other',
        ''
      ]
    },
    hearingIssues: [String],
    additionalNotes: String,

    // Status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    },

    // Consent
    agreeToTerms: {
      type: Boolean,
      required: true
    },
    sendReminders: {
      type: Boolean,
      default: false
    },

    // Appointment ID
    appointmentId: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

// Generate unique appointment ID before saving
appointmentSchema.pre('save', async function() {
  if (!this.appointmentId) {
    const count = await mongoose.model('Appointment').countDocuments();
    this.appointmentId = `APT${String(count + 1).padStart(6, '0')}`;
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
