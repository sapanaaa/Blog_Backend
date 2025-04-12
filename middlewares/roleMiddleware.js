import User from '../models/User.js';

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