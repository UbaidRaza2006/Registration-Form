import mongoose from "mongoose";

// const configOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }

const connectToDb= async () => {
    const connectionUrl = 'mongodb+srv://ubaidrazabawany13:9FRoPJ43ndISx8by@cluster0.d5kornd.mongodb.net/';

    mongoose.connect(connectionUrl).then(() => console.log("Ecommmerce Database connected Successfully!")).catch((err) => console.log(`Getting error from Db Connection ${err.message}`))
}

export default connectToDb;