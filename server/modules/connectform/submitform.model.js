const mongoose = require('mongoose');

const connectFormSchema = new mongoose.Schema({
  service: { type: String, required: true },
  date: { type: Date, required: true },
  contactNumber: { type: String, required: true },
},{ timestamps: true });

const ConnectForm = mongoose.model('ConnectForm', connectFormSchema);

module.exports = ConnectForm;