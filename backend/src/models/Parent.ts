import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        fatherName: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        fatherPhone: {
            type: String,
            required: true,
        },
        motherPhone: {
            type: String,
        },
        fatherOccupation: String,
        motherOccupation: String,
        primaryEmail: {
            type: String,
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
        },
        children: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }]
    },
    { timestamps: true }
);

export const Parent = mongoose.model('Parent', parentSchema);
