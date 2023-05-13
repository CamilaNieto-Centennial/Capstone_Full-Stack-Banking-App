import connectToDatabase from '../../database';
import { createUser } from '../../dal/user-dal';

export default async (req, res) => {
    try {
        await connectToDatabase();
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the user.');
    }
};
