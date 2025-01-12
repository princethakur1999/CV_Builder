import User from "../models/user.js";
import UserData from "../models/userData.js";
import { v2 as cloudinary } from "cloudinary";

export const savePhoto = async (req, res) => {
  try {
    const userId = req.user.userId;
    const photo = req.files?.photo; // Using optional chaining for safety

    if (!photo) {
      return res.status(400).json({
        success: false,
        message: "No photo uploaded",
      });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log(user);
    console.log(photo);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      public_id: `CV_Builder/${user.firstName}/${photo.name}`,
      resource_type: "image",
    });

    // Update user data with the Cloudinary URL
    const existingserData = await UserData.findOneAndUpdate(
      { userId },
      {
        $set: { photo: result.secure_url },
      },
      { new: true }
    );
    let newUserData;

    if (!existingserData) {
      newUserData = await UserData.create({
        userId,
        photo: result.secure_url,
      });
      await newUserData.save();
    } else {
      newUserData = existingserData;
    }

    // Insert newUserData._id into the user's resumeData field
    await User.findByIdAndUpdate(
      userId,
      {
        $set: { resumeData: newUserData._id }, // Insert the _id of newUserData
      },
      { new: true }
    );

    // Return response
    return res.status(200).json({
      success: true,
      message: "Photo uploaded successfully",
      photo: newUserData.photo,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Error saving photo",
    });
  }
};

export const savePersonalDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userData = req.body;
    console.log(userData);

    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "Please provide user data",
      });
    }

    // Find and update user
    const existingUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        },
      },
      { new: true }
    );

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find or create user data
    const existingUserData = await UserData.findOneAndUpdate(
      { userId },
      {
        $set: {
          phone: userData.phone,
          country: userData.country,
          state: userData.state,
          linkedin: userData.linkedin,
          github: userData.github,
          dob: userData.dob,
          gender: userData.gender,
        },
      },
      { new: true }
    );

    // If user data doesn't exist, create it
    let newUserData;
    if (!existingUserData) {
      newUserData = new UserData({
        userId,
        phone: userData.phone,
        country: userData.country,
        state: userData.state,
        linkedin: userData.linkedin,
        github: userData.github,
        dob: userData.dob,
        gender: userData.gender,
      });
      await newUserData.save(); // Save new user data
    } else {
      newUserData = existingUserData; // Use existing user data
    }

    const responseData = {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      phone: newUserData.phone,
      country: newUserData.country,
      state: newUserData.state,
      linkedin: newUserData.linkedin,
      github: newUserData.github,
      dob: newUserData.dob,
      gender: newUserData.gender,
    };

    // Insert newUserData._id into the user's resumeData field
    await User.findByIdAndUpdate(
      userId,
      {
        $set: { resumeData: newUserData._id }, // Insert the _id of newUserData
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "User data updated successfully",
      data: responseData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error saving personal details",
    });
  }
};

export const saveEducationDetails = async (req, res) => {
  try {
    const userId = req.user?.userId; // Added optional chaining for safety
    const education = req.body;

    console.log(education);
    console.log(userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not provided",
      });
    }

    if (!Array.isArray(education) || education.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid input: Education details must be a non-empty array",
      });
    }

    const existingUserData = await UserData.findOneAndUpdate(
      {
        userId,
      },
      {
        $set: {
          education: education,
        },
      },
      { new: true } // Ensures the updated document is returned
    );

    let newUserData;
    if (!existingUserData) {
      newUserData = new UserData({
        userId: userId,
        education: education,
      });

      await newUserData.save();
    } else {
      newUserData = existingUserData;
    }
    // Insert newUserData._id into the user's resumeData field
    await User.findByIdAndUpdate(
      userId,
      {
        $set: { resumeData: newUserData._id }, // Insert the _id of newUserData
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Education details saved successfully",
      education: newUserData.education,
    });
  } catch (error) {
    console.error("Error saving education details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while saving education details",
    });
  }
};

export const saveSkills = async (req, res) => {
  try {
    const userId = req.user.userId;
    const skills = req.body;

    console.log(skills);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    // if (!Array.isArray(skills) || skills.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid input: Skills must be a non-empty array",
    //   });
    // }

    const existingUserData = await UserData.findOneAndUpdate(
      { userId },
      {
        $set: {
          skills: skills,
        },
      },
      { new: true }
    );

    let newUserData;

    if (!existingUserData) {
      newUserData = await UserData.create({
        userId,
        skills: skills,
      });
      await newUserData.save();
    } else {
      newUserData = existingUserData;
    }

    // Insert newUserData._id into the user's resumeData field
    await User.findByIdAndUpdate(
      userId,
      {
        $set: { resumeData: newUserData._id }, // Insert the _id of newUserData
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Skills saved successfully",
      skills: newUserData.skills,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error saving skills",
    });
  }
};

export const saveProjects = async (req, res) => {
  try {
    const userId = req.user.userId;
    const projects = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // if (!Array.isArray(projects) || projects.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Projects are required",
    //   });
    // }

    const existingUserData = await UserData.findOneAndUpdate(
      { userId },
      {
        $set: {
          projects: projects,
        },
      },
      { new: true }
    );

    let newUserData;
    if (!existingUserData) {
      newUserData = await UserData.create({
        userId,
        projects: projects,
      });
      await newUserData.save();
    } else {
      newUserData = existingUserData;
    }

    // Insert newUserData._id into the user's resumeData field
    await User.findByIdAndUpdate(
      userId,
      {
        $set: { resumeData: newUserData._id }, // Insert the _id of newUserData
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Projects saved successfully",
      projects: newUserData.projects,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error saving projects",
    });
  }
};

export const saveLanguages = async (req, res) => {
  try {
    const userId = req.user.userId;
    const languages = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // if (!languages) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Languages are required",
    //   });
    // }

    console.log(languages);

    const existingUserData = await UserData.findOneAndUpdate(
      { userId },
      {
        $set: {
          languages: languages,
        },
      },
      { new: true }
    );

    let newUserData;
    if (!existingUserData) {
      newUserData = new UserData({
        languages: languages,
      });
      newUserData.save();
    } else {
      newUserData = existingUserData;
    }

    // Insert newUserData._id into the user's resumeData field
    await User.findByIdAndUpdate(
      userId,
      {
        $set: { resumeData: newUserData._id }, // Insert the _id of newUserData
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Language saved successfully",
      languages: newUserData.languages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error saving language",
    });
  }
};

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({ _id: userId }).populate({
      path: "resumeData",
      model: "UserData",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Convert the user document to a plain object
    const userObject = user.toObject();

    delete userObject.password; // Remove the password field
    delete userObject.__v; // Remove the version field
    delete userObject._id; // Remove the _id field

    console.log(userObject);

    return res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      user: userObject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving user data",
    });
  }
};
