import { connectMongoDB } from "@/lib/mongodb";
import { connect } from "mongoose";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try{
        const {name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({name, email, password : hashedPassword});
        return NextResponse.json({message: "User registered successfully"}, {status: 201});

    }
    catch(error){
        return NextResponse.json({message: "An error occurred"}, {status: 500});
    }
}