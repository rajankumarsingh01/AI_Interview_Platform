import User from "../models/user.model.js"

export const getCurrentUser = async (req,res,next) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"user doesn't found"})

        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({message:`failed to get current user ${error}`})
    }
    
}