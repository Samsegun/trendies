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
    onAuthStateChanged,
    NextOrObserver,
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
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const router = useRouter();
    const { auth } = initialize();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            const newUser: any = user;
            if (user) {
                Cookies.set("accessToken", newUser.accessToken);
                toast.success("Redirecting....");
                router.push("/");
            }
        });

        return () => setIsLoading(false);
    }, []);

    const signInGoogle = () => {
        signInWithRedirect(auth, new GoogleAuthProvider());
    };

    const onSubmit: SubmitHandler<Inputs> = data => {
        setIsLoading(true);

        if (!isLogin) {
            createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            ).catch(error => {
                console.log(error);
                toast.error("An error occurred. Please try again!");
                setIsLoading(false);
            });
        } else {
            signInWithEmailAndPassword(auth, data.email, data.password).catch(
                error => {
                    console.log(error);
                    toast.error("Sign In error. Please try again!");
                    setIsLoading(false);
                }
            );
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

                        {!isLoading && (
                            <button
                                type='submit'
                                className='bg-[#cd2c2c] text-white w-full mt-8 py-4
             px-12 text-xs uppercase cursor-pointer'>
                                {isLogin ? "Log In" : "Sign Up"}
                            </button>
                        )}

                        {isLoading && (
                            <div
                                className='bg-[#cd2c2c] flex justify-center text-white w-full mt-8 py-4
             px-12 text-xs uppercase cursor-pointer'>
                                <svg
                                    width='auto'
                                    height='36px'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 100 100'
                                    preserveAspectRatio='xMidYMid'
                                    className='uil-ring'>
                                    <rect
                                        x='0'
                                        y='0'
                                        width='100'
                                        height='100'
                                        fill='none'
                                        className='bk'></rect>
                                    <defs>
                                        <filter
                                            id='uil-ring-shadow'
                                            x='-100%'
                                            y='-100%'
                                            width='300%'
                                            height='300%'>
                                            <feOffset
                                                result='offOut'
                                                in='SourceGraphic'
                                                dx='0'
                                                dy='0'></feOffset>
                                            <feGaussianBlur
                                                result='blurOut'
                                                in='offOut'
                                                stdDeviation='0'></feGaussianBlur>
                                            <feBlend
                                                in='SourceGraphic'
                                                in2='blurOut'
                                                mode='normal'></feBlend>
                                        </filter>
                                    </defs>
                                    <path
                                        d='M10,50c0,0,0,0.5,0.1,1.4c0,0.5,0.1,1,0.2,1.7c0,0.3,0.1,0.7,0.1,1.1c0.1,0.4,0.1,0.8,0.2,1.2c0.2,0.8,0.3,1.8,0.5,2.8 c0.3,1,0.6,2.1,0.9,3.2c0.3,1.1,0.9,2.3,1.4,3.5c0.5,1.2,1.2,2.4,1.8,3.7c0.3,0.6,0.8,1.2,1.2,1.9c0.4,0.6,0.8,1.3,1.3,1.9 c1,1.2,1.9,2.6,3.1,3.7c2.2,2.5,5,4.7,7.9,6.7c3,2,6.5,3.4,10.1,4.6c3.6,1.1,7.5,1.5,11.2,1.6c4-0.1,7.7-0.6,11.3-1.6 c3.6-1.2,7-2.6,10-4.6c3-2,5.8-4.2,7.9-6.7c1.2-1.2,2.1-2.5,3.1-3.7c0.5-0.6,0.9-1.3,1.3-1.9c0.4-0.6,0.8-1.3,1.2-1.9 c0.6-1.3,1.3-2.5,1.8-3.7c0.5-1.2,1-2.4,1.4-3.5c0.3-1.1,0.6-2.2,0.9-3.2c0.2-1,0.4-1.9,0.5-2.8c0.1-0.4,0.1-0.8,0.2-1.2 c0-0.4,0.1-0.7,0.1-1.1c0.1-0.7,0.1-1.2,0.2-1.7C90,50.5,90,50,90,50s0,0.5,0,1.4c0,0.5,0,1,0,1.7c0,0.3,0,0.7,0,1.1 c0,0.4-0.1,0.8-0.1,1.2c-0.1,0.9-0.2,1.8-0.4,2.8c-0.2,1-0.5,2.1-0.7,3.3c-0.3,1.2-0.8,2.4-1.2,3.7c-0.2,0.7-0.5,1.3-0.8,1.9 c-0.3,0.7-0.6,1.3-0.9,2c-0.3,0.7-0.7,1.3-1.1,2c-0.4,0.7-0.7,1.4-1.2,2c-1,1.3-1.9,2.7-3.1,4c-2.2,2.7-5,5-8.1,7.1 c-0.8,0.5-1.6,1-2.4,1.5c-0.8,0.5-1.7,0.9-2.6,1.3L66,87.7l-1.4,0.5c-0.9,0.3-1.8,0.7-2.8,1c-3.8,1.1-7.9,1.7-11.8,1.8L47,90.8 c-1,0-2-0.2-3-0.3l-1.5-0.2l-0.7-0.1L41.1,90c-1-0.3-1.9-0.5-2.9-0.7c-0.9-0.3-1.9-0.7-2.8-1L34,87.7l-1.3-0.6 c-0.9-0.4-1.8-0.8-2.6-1.3c-0.8-0.5-1.6-1-2.4-1.5c-3.1-2.1-5.9-4.5-8.1-7.1c-1.2-1.2-2.1-2.7-3.1-4c-0.5-0.6-0.8-1.4-1.2-2 c-0.4-0.7-0.8-1.3-1.1-2c-0.3-0.7-0.6-1.3-0.9-2c-0.3-0.7-0.6-1.3-0.8-1.9c-0.4-1.3-0.9-2.5-1.2-3.7c-0.3-1.2-0.5-2.3-0.7-3.3 c-0.2-1-0.3-2-0.4-2.8c-0.1-0.4-0.1-0.8-0.1-1.2c0-0.4,0-0.7,0-1.1c0-0.7,0-1.2,0-1.7C10,50.5,10,50,10,50z'
                                        fill='#fbfdff'
                                        filter='url(#uil-ring-shadow)'>
                                        <animateTransform
                                            attributeName='transform'
                                            type='rotate'
                                            from='0 50 50'
                                            to='360 50 50'
                                            repeatCount='indefinite'
                                            dur='1s'></animateTransform>
                                    </path>
                                </svg>
                            </div>
                        )}
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
