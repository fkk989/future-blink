import mongoose from "mongoose";

export async function connectDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database connected successfully');
    } catch (e: any) {
        console.error('Database connection error:', e.message);
    }
}