import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    let verify = req.cookies.get("accessToken")?.value;
    let url = req.url;

    const env = process.env.NODE_ENV;

    // if (env == "development") {
    //     console.log("dev");
    // } else if (env == "production") {
    //     console.log("prod");
    // }

    if (!verify && url.includes("/checkout") && env == "development") {
        return NextResponse.redirect("http://localhost:3000/login");
    }

    if (!verify && url.includes("/checkout") && env == "production") {
        return NextResponse.redirect("https://trendies.vercel.app/login");
    }
}
