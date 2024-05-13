import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

// const configOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }

const connectToDb= async () => {
    const connectionUrl = process.env.MONGO_URL;

    mongoose.connect(connectionUrl).then(() => console.log("Ecommmerce Database connected Successfully!")).catch((err) => console.log(`Getting error from Db Connection ${err.message}`))
}

export default connectToDb;