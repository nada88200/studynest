import { connectMongoDB } from "@/lib/mongodb";
import { connect } from "mongoose";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try{
        const { name, email, password, role } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role || "user"; 
        await connectMongoDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
            { message: "Email already in use." },
            { status: 409 }
        );
    }
    

        await User.create({name, email, password : hashedPassword, role: userRole});
        return NextResponse.json({message: "User registered successfully"}, {status: 201});

    }
    catch(error){
        return NextResponse.json({message: "An error occurred"}, {status: 500});
    }
}