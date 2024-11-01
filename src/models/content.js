// import { number } from "joi";
// import mongoose from "mongoose";

import mongoose from "mongoose";


const ContentSchema = new mongoose.Schema({
    contentImage: String,
},
    {timestamps:true}
)

const Content = mongoose.models.Content|| mongoose.model('Content', ContentSchema )

export default Content;