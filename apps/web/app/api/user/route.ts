import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if(session){
      return NextResponse.json({
        session
      })
    }
  } catch (error) {
    return NextResponse.json({
      message: "you are not logged in"
    },{
      status: 403
    })
  }
  return NextResponse.json({
    message: "you are not logged in"
  },{
    status: 403
  })
}