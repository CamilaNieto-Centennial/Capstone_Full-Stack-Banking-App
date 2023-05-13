import connectToDatabase from '../../database';
import User from '../../models/User';

export default async (req, res) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Find all users
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while connecting to the database.');
  }
};
