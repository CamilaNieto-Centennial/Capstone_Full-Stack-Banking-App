import User from '../models/User';

export const getUserById = async (id) => {
    return await User.findById(id);
};

export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const getAllUsers = async () => {
    return await User.find();
};

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export const updateUserById = async (id, userData) => {
    console.log(`Updating user with id ${id} and data ${JSON.stringify(userData)}`);
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};
