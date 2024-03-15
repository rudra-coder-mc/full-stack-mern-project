const mongoose = require('mongoose');

const carTypeEnums = ['sedan', 'hatchback', 'suv'];

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  serviceDate: {
    type: Date,
    required: true
  },
  serviceTime: {
    type: String,
    required: true
  },
  comments: {
    type: String
  },
  carType: {
    type: String,
    enum: carTypeEnums,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
