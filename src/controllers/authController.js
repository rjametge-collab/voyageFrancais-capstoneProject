const User = require("../models/User");
const bcrypt = require("bcrypt");

const formatUserResponse = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  name: `${user.firstName} ${user.lastName}`.trim(),
  email: user.email,
  languageLevel: user.languageLevel,

  completedLessons: user.completedLessons?.length || 0,
  savedTrips: user.savedTrips?.length || 0,
});


exports.register = async (req,res)=>{

  try {

    const { name, firstName, lastName, email, password } = req.body;

    const normalizedFirstName = firstName || name?.trim().split(/\s+/)[0] || "";
    const normalizedLastName =
      lastName || name?.trim().split(/\s+/).slice(1).join(" ") || "User";

    if (!email || !password || !normalizedFirstName) {
      return res.status(400).json({
        message: "firstName or name, email, and password are required",
      });
    }


    const existingUser = await User.findOne({email});


    if(existingUser){
      return res.status(400).json({
        message:"User already exists"
      });
    }


    const hashedPassword = await bcrypt.hash(password,10);


    const user = await User.create({
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      email,
      password:hashedPassword
    });


    req.session.userId = user._id;


    res.status(201).json({
      message:"Registration successful",
      user: formatUserResponse(user)
    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};




exports.login = async(req,res)=>{

try{

const {email,password}=req.body;


const user = await User.findOne({email});


if(!user){
 return res.status(400).json({
 message:"Invalid credentials"
 });
}


const match = await bcrypt.compare(
 password,
 user.password
);


if(!match){
 return res.status(400).json({
 message:"Invalid credentials"
 });
}


req.session.userId=user._id;


res.json({
message:"Login successful",
user: formatUserResponse(user)
});


}catch(error){

res.status(500).json({
message:error.message
});

}

};