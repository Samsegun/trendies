import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@/components/UI/container";
import axios from "axios";

const EmailVerified = () => {
    const {
        query: { updateSession },
        push,
    } = useRouter();
    const [refreshed, setRefreshed] = useState(false);

    useEffect(() => {
        if (updateSession === "true") {
            axios
                .get("/api/refreshToken")
                .then(data => {
                    console.log("data", data);
                    if (data) setRefreshed(true);
                })
                .catch(err => console.log("error", err));
        }
    }, [updateSession]);

    return (
        <Container>
            <div className='flex justify-center min-h-screen mt-12'>
                <div className='text-center'>
                    <h1 className='mb-4 text-2xl'>Email verified </h1>

                    {refreshed && (
                        <button
                            className='bg-[#e33f3f] text-white uppercase
             px-12 py-4 w-full text-xs font-semibold tracking-widest
              hover:bg-[#e33f3fe5]'
                            onClick={() => push("/")}>
                            Go Home
                        </button>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default EmailVerified;
