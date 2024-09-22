import mongoose from "mongoose";


const InformSchema = new mongoose.Schema({
    contact: { type: String, required: true }
},
    {timestamps:true}
)

const Inform = mongoose.models.Inform|| mongoose.model('Inform', InformSchema )

export default Inform;