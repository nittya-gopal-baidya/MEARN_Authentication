//check whether token is valid or not
import jwt from "jsonwebtoken"
export const verifyToken=(req,res,next)=>{
const token=req.cookies.token
if(!token)return res.status(401).json({success:false,message:"Unauthorised access:No token provided"})

    try {
       const decodedToken=jwt.verify(token,process.env.JWT_SECRET) 
       if (!decodedToken) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

		req.userId = decodedToken.userId;
		next();
    } catch (error) {
        console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	
}
}