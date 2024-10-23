import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";
import bcrypt from "bcrypt"

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const hashedPassword = await bcrypt.hash(reqBody.password, 10);
    const data = await db.users.create({
      data: {
        fullName: reqBody.fullName,
        emailAddress: reqBody.emailAddress,
        phoneNumber: reqBody.phoneNumber,
        password: hashedPassword
      }
    });
    if (data) {
      return NextResponse.json({
        message: "User Created",
        data: data
      }, { status: 201 })
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}