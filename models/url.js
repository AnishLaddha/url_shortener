import mongoose from 'mongoose';
const urlSchema = new mongoose.Schema(
    {
        longUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            unique: true,
            required: true,
        },
        clicks: {
            type: Number,
            default: 0,            
        }

    },
    {timestamps: true}

);
const URL = mongoose.model('URL', urlSchema);

module.exports = User;
