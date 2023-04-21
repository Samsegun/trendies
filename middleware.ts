import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    let verify = req.cookies.get("accessToken")?.value;
    let url = req.url;

    // use this if statement when running in dev enviroment
    // if (!verify && url.includes("/checkout")) {
    //     return NextResponse.redirect("http://localhost:3000/login");
    // }

    // // use this if statement when running in prod enviroment
    // if (!verify && url.includes("/checkout")) {
    //     return NextResponse.redirect("https://trendies.vercel.app/login");
    // }

    // if (!verify) {
    //     return NextResponse.redirect("http://localhost:3000/");
    // }
}
