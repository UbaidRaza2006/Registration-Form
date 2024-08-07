import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import connectToDb from '../../../database';
import Register from '../../../models/registration';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

const RegistrationSchema = Joi.object({
    fullName: Joi.string().required(),
    fatherName: Joi.string().required(),
    email: Joi.string().required(),
    course: Joi.string().required(),
    batch: Joi.number().required(),
    rollNo: Joi.string().required(),
    payment: Joi.string().required(),
    paymentImg: Joi.string().required(),
    status: Joi.string().required(),
    city: Joi.string().required(),
    cnic: Joi.string().required(),
    phone: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    gender: Joi.string().required(),
    qualification: Joi.string().required(),
    address: Joi.string().required(),
    imageUrl: Joi.string().required()
});

export const dynamic = 'force-dynamic';

export async function POST(req) {
    await connectToDb();  // Ensure DB connection before starting the session
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();

        const extractData = await req.json();
        const {
            fullName,
            fatherName,
            email,
            course,
            batch,
            payment,
            paymentImg,
            status,
            city,
            cnic,
            phone,
            dateOfBirth,
            gender,
            qualification,
            address,
            imageUrl
        } = extractData;

        // Get the highest roll number and increment it
        const highestRollNo = await Register.findOne().sort({ rollNo: -1 }).session(session).exec();
        const lastRollNo = highestRollNo ? highestRollNo.rollNo : 0;
        const rollNo = (+lastRollNo + 1).toString();

        const { error } = RegistrationSchema.validate({
            fullName,
            fatherName,
            email,
            course,
            batch,
            payment,
            paymentImg,
            status,
            city,
            cnic,
            phone,
            dateOfBirth,
            gender,
            qualification,
            address,
            imageUrl,
            rollNo
        });

        if (error) {
            await session.abortTransaction();
            return NextResponse.json({
                success: false,
                message: error.details[0].message,
            });
        }

        const newlyRegisteredUser = await Register.create([{
            fullName,
            fatherName,
            email,
            course,
            batch,
            payment,
            paymentImg,
            status,
            city,
            cnic,
            phone,
            dateOfBirth,
            gender,
            qualification,
            address,
            imageUrl,
            rollNo
        }], { session });

        await session.commitTransaction();

        return NextResponse.json({
            success: true,
            user: newlyRegisteredUser[0],
            message: 'Registered Successfully!',
        });

    } catch (error) {
        await session.abortTransaction();
        console.log('Error in adding new user-->', error);

        return NextResponse.json({
            success: false,
            message: 'Something went wrong, please try again later!'
        });

    } finally {
        session.endSession(); // Ensure session is ended
    }
}
