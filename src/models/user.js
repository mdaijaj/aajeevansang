import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    //user details
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob: { type: Date, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    facebookId: { type: String },
    instagramId: { type: String },
    lang: { type: String, default: "en" },

    //personal details
    profileCreatedFor: { type: String, enum: ["Self", "Relative", "Son", "Sister", "Daughter" ], required: true },
    height: { 
        feet: { type: Number, required: true },
        inches: { type: Number, required: true, min: 0, max: 11 }
    },    
    weight: { type: String},
    currentLocation: { type: String },
    diet: { type: String },
    doYouSmoke: { type: String, enum: ["Yes", "No", "Occasionally"] },
    doYouDrink: { type: String, enum: ["Yes", "No", "Occasionally"] },

    //family details
    fatherName: { type: String },
    fatherOccupation: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
    siblingName: { type: Number  },
    familyIncome: { type: String },

    //social details

    maritalStatus: { type: String, enum: ["Single", "Married", "Divorced"], required: true },
    hometown: { type: String, required: true },
    montherTongue: { type: String },
    religion: { type: String, required: true },
    caste: { type: String, required: true },
    casteStatus : { type: String, enum: [true, false], required: true },
    gotra: { type: String, required: true },
    manglik: { type: String, enum: ["Yes", "No", "Not Sure"], required: true },

    //education and Employment details
    higherEducation: { type: String, required: true },
    degree: { type: String, required: true },
    institueName: { type: String, required: true },
    jobType: { type: String, required: true },
    designation: { type: String, required: true },
    companyName: { type: String, required: true },
    annualIncome: { type: String, required: true },
    verifyProfile: { type: String, enum: ["Pan", "Aadhar", "Passport", "Driving License"], required: true },
    documentNo: { type: String, required: true },
    verificationStatus: {type: Boolean }
});

export default mongoose.model("User", UserSchema);
