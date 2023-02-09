import FormSummary from "@/components/formSummary";
import Container from "@/components/UI/container";
import { FormGroup, Label } from "@/components/UI/formComponents";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

export type Inputs = {
    name: string;
    email: string;
    phone: string;
    address: string;
    zip: string;
    city: string;
    country: string;
};

const Checkout = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    return (
        <Container>
            <div className='w-11/12 mx-auto my-4'>
                <button
                    className='bg-[#f2f2f2] p-2 rounded-2xl'
                    onClick={() => router.back()}>
                    Go Back
                </button>

                <p className='text-[#cd2c2c] italic text-xl my-4'>
                    *Please fill all input fields!
                </p>

                <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
                    <div className='items-start gap-8 xl:flex'>
                        <div className='bg-[#fff] h-auto rounded-lg p-4 basis-3/4'>
                            <h1 className='uppercase font-bold tracking-[1px] mb-4'>
                                checkout{" "}
                            </h1>

                            {/* billing details */}
                            <div>
                                <h2 className='text-xs font-bold uppercase tracking-[1px] text-[#e33f3f]'>
                                    billing details
                                </h2>

                                <div className='grid-cols-2 md:grid md:gap-4'>
                                    <FormGroup>
                                        <Label name={"name"} />
                                        <input
                                            type='text'
                                            id='name'
                                            placeholder='sam'
                                            {...register("name", {
                                                maxLength: 10,
                                            })}
                                            aria-invalid={
                                                errors.name ? "true" : "false"
                                            }
                                            className='input'
                                        />
                                        {errors.name && (
                                            <p role='alert'>Name is required</p>
                                        )}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label name={"email address"} />
                                        <input
                                            type='email'
                                            id='email address'
                                            placeholder='sam@xyz.com'
                                            {...register("email", {
                                                required: true,
                                            })}
                                            className='input'
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label name={"phone number"} />
                                        <input
                                            type='tel'
                                            id='phone number'
                                            placeholder='+123-456-789'
                                            {...register("phone", {
                                                required: true,
                                            })}
                                            className='input'
                                        />
                                    </FormGroup>
                                </div>
                            </div>

                            {/* shipping info */}
                            <div className='mt-8'>
                                <h2 className='text-xs font-bold uppercase tracking-[1px] text-[#e33f3f]'>
                                    shipping info
                                </h2>

                                <div className='grid-cols-2 md:grid md:gap-4'>
                                    <FormGroup>
                                        <Label name={"your address"} />
                                        <input
                                            type='text'
                                            id='your address'
                                            placeholder='113 williams avenue'
                                            {...register("address", {
                                                required: true,
                                            })}
                                            className='input'
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label name={"zip code"} />
                                        <input
                                            type='number'
                                            id='zip code'
                                            placeholder='100001'
                                            {...register("zip", {
                                                required: true,
                                            })}
                                            className='input'
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label name={"city"} />
                                        <input
                                            type='text'
                                            id='city'
                                            placeholder='lagos'
                                            {...register("city", {
                                                required: true,
                                            })}
                                            className='input'
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label name={"country"} />
                                        <input
                                            type='text'
                                            id='country'
                                            placeholder='Nigeria'
                                            {...register("country", {
                                                required: true,
                                            })}
                                            className='input'
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                        </div>

                        <FormSummary />
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default Checkout;
