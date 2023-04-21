import { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { NextPageWithLayout } from "./_app";
import { ModalContext } from "@/context/ModalCtx";
import Layout from "@/components/layout";
import { onAuthStateChanged } from "firebase/auth";
import { initialize } from "@/firebase";
import { toast } from "react-toastify";
import FormSummary from "@/components/formSummary";
import Container from "@/components/UI/container";
import { FormGroup, Label } from "@/components/UI/formComponents";
import { useCartStore } from "@/store/cart";
import { countries } from "@/utils/countries";
import { PaystackButton } from "react-paystack";

export type Inputs = {
    name: string;
    email: string;
    phone: string;
    address: string;
    zip: string;
    city: string;
    country: string;
};

const Checkout: NextPageWithLayout = () => {
    const [formData, setFormData] = useState<Inputs>({
        name: "",
        email: "",
        phone: "",
        address: "",
        zip: "",
        city: "",
        country: "",
    });
    const { handleModal, confirmation } = useContext(ModalContext);

    const { back } = useRouter();
    const { cart, totals } = useCartStore();
    const { auth } = initialize();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    // useEffect(() => {
    //     onAuthStateChanged(auth, user => {
    //         if (!user) {
    //             back();
    //         }
    //     });
    // }, []);

    // paystack
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUB_KEY;
    const amount = totals.cartTotals * 100;
    const email = formData.email;

    const onSuccess = (reference: any) => {
        // Handle successful payments here
        toast.success(reference.message);
    };

    const onClose = () => {
        // Handle cancelled payments here
        toast.error("Payment Cancelled");
    };

    const config = {
        email,
        amount,
        publicKey: publicKey!,
    };

    const onSubmit: SubmitHandler<Inputs> = data => {
        if (!cart.length) {
            toast.error("Can't checkout with empty cart!");
            return;
        }
        setFormData(data);
        handleModal("confirmation");
    };

    return (
        <Container>
            <div className='w-11/12 mx-auto my-4'>
                <button
                    className='bg-[#f2f2f2] p-2 rounded-2xl'
                    onClick={() => back()}>
                    Go Back
                </button>

                <p className='text-[#cd2c2c] italic text-xl my-4'>
                    *Please fill all input fields!
                </p>

                <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
                    <div className='items-start gap-8 xl:flex'>
                        <div className='bg-[#fff] h-auto rounded-lg p-4 basis-3/4'>
                            <h1 className='uppercase font-bold tracking-[1px] mb-4'>
                                checkout
                            </h1>

                            {/* billing details */}
                            <div>
                                <h2 className='text-xs font-bold uppercase tracking-[1px] text-[#e33f3f]'>
                                    billing details
                                </h2>

                                <div className='grid-cols-2 md:grid md:gap-4'>
                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"name"} />
                                            {errors.name && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Maximum of 10 chars!
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type='text'
                                            id='name'
                                            placeholder='sam'
                                            {...register("name", {
                                                required: true,
                                                maxLength: 10,
                                            })}
                                            aria-invalid={
                                                errors.name ? "true" : "false"
                                            }
                                            className={`input ${
                                                errors.name && "input-error"
                                            }`}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"email address"} />
                                            {errors.email && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Inavlid format!
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type='email'
                                            id='email address'
                                            placeholder='sam@xyz.com'
                                            {...register("email", {
                                                required: true,
                                                pattern:
                                                    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
                                            })}
                                            aria-invalid={
                                                errors.name ? "true" : "false"
                                            }
                                            className={`input ${
                                                errors.email && "input-error"
                                            }`}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"phone number"} />
                                            {errors.phone && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Enter phone number!
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type='tel'
                                            id='phone number'
                                            placeholder='+123-456-789'
                                            {...register("phone", {
                                                required: true,
                                            })}
                                            className={`input ${
                                                errors.phone && "input-error"
                                            }`}
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
                                        <div className='flex justify-between'>
                                            <Label name={"your address"} />
                                            {errors.address && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Enter address!
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type='text'
                                            id='your address'
                                            placeholder='113 williams avenue'
                                            {...register("address", {
                                                required: true,
                                            })}
                                            className={`input ${
                                                errors.address && "input-error"
                                            }`}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"zip code"} />
                                            {errors.zip && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Enter valid zip code!
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type='number'
                                            id='zip code'
                                            placeholder='100001'
                                            {...register("zip", {
                                                required: true,
                                            })}
                                            className={`input ${
                                                errors.zip && "input-error"
                                            }`}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"city"} />
                                            {errors.city && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Select city!
                                                </p>
                                            )}
                                        </div>

                                        <input
                                            type='text'
                                            id='city'
                                            placeholder='lagos'
                                            {...register("city", {
                                                required: true,
                                            })}
                                            className={`input ${
                                                errors.city && "input-error"
                                            }`}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <div className='flex justify-between'>
                                            <Label name={"country"} />
                                            {errors.country && (
                                                <p
                                                    role='alert'
                                                    className='text-xs text-red-500'>
                                                    Enter country!
                                                </p>
                                            )}
                                        </div>
                                        <select
                                            id='country'
                                            {...register("country", {
                                                required: true,
                                            })}
                                            className={`input ${
                                                errors.country && "input-error"
                                            }`}>
                                            <option value=''>
                                                --Select country--
                                            </option>
                                            {countries.map(country => (
                                                <option
                                                    key={country.code}
                                                    value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>

                        <FormSummary confirmation={confirmation} />
                    </div>
                </form>

                {confirmation && (
                    <div className='fixed z-40 w-4/5 h-48 max-w-md uppercase -translate-x-1/2 bg-white rounded-lg md:w-1/2 top-1/4 left-1/2'>
                        <div className='flex flex-col items-center justify-center h-full gap-4 md:flex-row'>
                            <div
                                className='w-1/2'
                                onClick={() => handleModal("close")}>
                                <PaystackButton
                                    className='bg-[#cd2c2c] text-white w-full py-4
             px-12 text-xs uppercase cursor-pointer'
                                    reference={new Date().getTime().toString()}
                                    text='make payment'
                                    onSuccess={onSuccess}
                                    onClose={onClose}
                                    {...config}
                                />
                            </div>

                            <button
                                className='bg-[#e97a7a] py-4 px-12 text-xs text-white w-1/5'
                                onClick={handleModal.bind(null, "close")}>
                                No
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

Checkout.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Checkout;
