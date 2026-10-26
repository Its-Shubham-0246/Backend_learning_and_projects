const jwt=require("jsonwebtoken")
require('dotenv').config(({path:path.join(__dirname,'.env')}))
const generateTokenAccess=(user)=>{
    jwt.sign(
        {
            role:user.role,
            id:user._id
        },
    process.env.SECRET_KEY_ACCESS,
    {
        expiresIn:"15m"
    }
    )
}
const generateTokenRefresh=(user)=>{
    jwt.sign(
        {
           
            id:user._id
        },
    process.env.SECRET_KEY_REFRESH,
    {
        expiresIn:"3h"
    }
    )
}


module.exports = {
  generateTokenAccess,
  generateTokenRefresh
}