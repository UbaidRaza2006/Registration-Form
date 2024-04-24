import mongoose from "mongoose";


const CourseSchema = new mongoose.Schema({
    course: { type: String, unique: true, required: true },
    batch: Number,
    admission:String,
},
    {timestamps:true}
)

// Define a unique index for the "course" field
CourseSchema.index({ course: 1 }, { unique: true });

const Course = mongoose.models.Course|| mongoose.model('Course', CourseSchema )

export default Course;