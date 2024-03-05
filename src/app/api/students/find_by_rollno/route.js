
import connectToDb from "../../../../database";
import Register from "../../../../models/registration";

 // Assuming you have a Register model defined

 export async function GET(req, res) {
    try {
        await connectToDb();
        
        const { rollNo } = req.query; // Destructure rollNo from the query object
        console.log("Roll number:", rollNo); // Add this line to check if rollNo is retrieved correctly
        
        let query = {}; // Empty query object to fetch all users if no rollNo is provided
        if (rollNo) {
            query = { rollNo }; // If rollNo is provided, filter by rollNo
        }
        
        const results = await Register.find(query);
        
        if (results.length > 0) {
            res.status(200).json({ success: true, data: results });
        } else {
            res.status(404).json({ success: false, message: 'No users found' });
        }
    } catch (error) {
        console.error("Error finding users:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


// export async function PUT(req, res) {
    


//         try {
//             await connectToDb();
            
//             const rollNo = req.query.rollNo;
//             const filter = { rollNo };
//             const payload = req.body;
//             const result = await Register.findOneAndUpdate(filter, payload, { new: true });
            
//             if (result) {
//                 res.status(200).json({ success: true, data: result });
//             } else {
//                 res.status(404).json({ success: false, message: 'User not found' });
//             }
//         } catch (error) {
//             console.error("Error updating user by roll number:", error);
//             res.status(500).json({ success: false, message: "Internal Server Error" });
//         }
   
// }