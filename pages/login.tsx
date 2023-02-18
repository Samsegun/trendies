import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast } from "react-toastify";
import {
    createUserWithEmailAndPassword,
    signInWithRedirect,
    GoogleAuthProvider,
    linkWithCredential,
    EmailAuthProvider,
    linkWithRedirect,
    signInWithEmailAndPassword,
    getRedirectResult,
} from "firebase/auth";
import { useRouter } from "next/router";
import { initialize } from "@/firebase";
import { FormGroup, Label } from "@/components/UI/formComponents";
import Container from "@/components/UI/container";

export type Inputs = {
    email: string;
    password: string;
};

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const router = useRouter();
    const { auth } = initialize();

    // const testLogin = () => {
    //     Cookies.set("loggedin", "true");
    //     router.push("/");
    // };

    // useEffect(() => {
    //     signInWithGoogle();
    // }, []);

    // const signInWithGoogle = async () => {
    //     try {
    //         await getRedirectResult(auth);
    //         router.push("/");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const signInGoogle = () => {
        signInWithRedirect(auth, new GoogleAuthProvider());
    };

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data.email, data.password);

        if (!isLogin) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then(() => router.push("/"))
                .catch(error => {
                    console.log(error);
                    toast.error("An error occurred. Please try again!");
                });

            router.push("/");
        } else {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then(() => router.push("/"))
                .catch(error => {
                    console.log(error);

                    toast.error("Sign In error. Please try again!");
                });
        }
    };

    return (
        <Container>
            <section className='flex justify-center'>
                <div className='bg-[#fff] h-auto rounded-lg mt-12 p-4  w-11/12 sm:w-[55%] mx-auto'>
                    <h1 className='uppercase text-[#e33f3f] font-bold tracking-[1px] mb-4'>
                        {isLogin ? "Log In" : "Sign Up"}
                    </h1>

                    <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <div className='flex justify-between'>
                                <Label name={"email"} />
                                {errors.email && (
                                    <p
                                        role='alert'
                                        className='text-xs text-red-500'>
                                        Invalid Email!
                                    </p>
                                )}
                            </div>

                            <input
                                type='text'
                                id='email'
                                placeholder='sam@xyz.com'
                                {...register("email", {
                                    required: true,
                                    pattern:
                                        /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
                                })}
                                aria-invalid={errors.email ? "true" : "false"}
                                className={`input ${
                                    errors.email && "input-error"
                                }`}
                            />
                        </FormGroup>

                        <FormGroup>
                            <div className='flex justify-between'>
                                <Label name={"password"} />
                                {errors.password && (
                                    <p
                                        role='alert'
                                        className='text-xs text-red-500'>
                                        Enter Password!
                                    </p>
                                )}
                            </div>

                            <input
                                type='password'
                                id='password'
                                placeholder='password'
                                {...register("password", {
                                    required: true,
                                })}
                                aria-invalid={
                                    errors.password ? "true" : "false"
                                }
                                className={`input ${
                                    errors.password && "input-error"
                                }`}
                            />
                        </FormGroup>

                        <button
                            type='submit'
                            className='bg-[#cd2c2c] text-white w-full mt-8 py-4
             px-12 text-xs uppercase cursor-pointer'>
                            {isLogin ? "Log In" : "Sign Up"}
                        </button>
                    </form>

                    <button
                        className='bg-[#a7cd2c] text-white w-full mt-8 py-4
             px-12 text-xs uppercase cursor-pointer'
                        onClick={signInGoogle}>
                        continue with google
                    </button>

                    <p className='mt-4 font-light text-center'>
                        Don't have an account?{" "}
                        <button onClick={() => setIsLogin(!isLogin)}>
                            <span className='text-[#cd2c2c]'>
                                {isLogin ? "Sign Up" : "Log In"}
                            </span>
                        </button>
                    </p>
                </div>
            </section>
        </Container>
    );
};

export default Login;
