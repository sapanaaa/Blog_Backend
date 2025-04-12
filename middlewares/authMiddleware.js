import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

export const authorize = (roles =[])=>{
    if (typeof roles === 'string')
    {
        roles= [roles];
    }
    return[ async(req, res, next) => {
            try{
                const user = await User.findById(req.user);
                if (!user) {
                    return res.status(403).json({message:"User not found!!😡"});
                }
                if (roles.length && !roles.includes(user.role)) {
                    return res.status(403).json({message:"You are not authorized user 😡"});
                }
                req.user = user;
                next();
            }
            catch (error) {
                console.error(error);
                res.status(500).json({message:"Internal server error"});
            }
        }

    ];
};


export const isAdmin = () => authorize(['admin']);
export const isSuperAdmin = () => authorize(['superadmin']);

