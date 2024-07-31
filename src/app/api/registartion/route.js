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
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await connectToDb();

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

        const lastRegisteredUser = await Register.findOne().sort({ rollNo: -1 }).session(session);
        const lastRollNo = lastRegisteredUser ? parseInt(lastRegisteredUser.rollNo) : 0;
        const nextRollNo = lastRollNo + 1;
        const generatedRollNo = nextRollNo.toString().padStart(5, '0');

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
            rollNo: generatedRollNo
        });

        if (error) {
            await session.abortTransaction();
            session.endSession();
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
            rollNo: generatedRollNo
        }], { session });

        await session.commitTransaction();
        session.endSession();

        if (newlyRegisteredUser) {
            return NextResponse.json({
                success: true,
                user: newlyRegisteredUser[0],
                message: 'Registered Successfully!',
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Failed to register. Please try again!',
            });
        }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log('Error in adding new user-->', error);

        return NextResponse.json({
            success: false,
            message: 'Something went wrong, please try again later!'
        });
    }
}
