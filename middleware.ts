import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    let verify = req.cookies.get("loggedin")?.value;
    let url = req.url;

    // if (!verify && url.includes("/checkout")) {
    //     return NextResponse.redirect("http://localhost:3000/login");
    // }

    // if (!verify) {
    //     return NextResponse.redirect("http://localhost:3000/");
    // }

    // if (verify) {
    //     return NextResponse.redirect("http://localhost:3000");
    // }
}

// export const config = {
//     matcher: '/checkout',
//   }
