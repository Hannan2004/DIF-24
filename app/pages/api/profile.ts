import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/app/lib/mongodb";
import UserProfile from "@/app/models/UserProfile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'POST') {
        try {
            const { firstName, lastName, email, phone, dateOfBirth} = req.body;

            const newUserProfile = new UserProfile({
                firstName,
                lastName,
                email,
                phone,
                dateOfBirth
            });

            await newUserProfile.save();
        } catch (error) {
            res.status(405).json({ success: false, message: 'Error saving profile', error});
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}