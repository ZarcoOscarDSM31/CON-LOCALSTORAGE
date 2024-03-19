import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    humidity: Number,
    temperatureC: Number,
    waterLevel: Number,
    lightIntensity: Number,
    gasValue: Number,
    gasPPM: Number,
    gasType: String,
    timestamp: Date
});

const Data = mongoose.model('Data', dataSchema);

export default Data;
