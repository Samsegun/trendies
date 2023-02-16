import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Link from "next/link";
import Container from "@/components/UI/container";
import { FormGroup, Label } from "@/components/UI/formComponents";
import { useRouter } from "next/router";

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

    const testLogin = () => {
        Cookies.set("loggedin", "true");
        router.push("/");
    };

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
        // console.log({ ...data, id: user && user.sid });
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

                    <button onClick={testLogin}>log in</button>

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
