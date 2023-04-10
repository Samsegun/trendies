import Image from "next/image";
import { FC, useContext } from "react";
import { useCartStore } from "@/store/cart";
import { PaystackButton } from "react-paystack";
import { Inputs } from "@/pages/checkout";
import { ModalContext } from "@/context/ModalCtx";

const FormSummary = ({ formData }: { formData: Inputs }) => {
    const modal = useContext(ModalContext);
    const { cart, totals } = useCartStore();

    // paystack
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUB_KEY;
    const amount = totals.cartTotals * 100;
    const email = formData.email;

    const onSuccess = (reference: any) => {
        // Handle successful payments here
        console.log(reference);
    };

    const onClose = () => {
        // Handle cancelled payments here
    };

    const config = {
        email,
        amount,
        publicKey: publicKey!,
    };

    return (
        <section className='bg-[#fff] h-auto rounded-lg p-4 mt-8 xl:mt-0 xl:basis-1/4'>
            <h2 className='mb-4 text-2xl font-semibold uppercase'>summary</h2>

            {cart.map((item, idx) => {
                return (
                    <div
                        key={idx}
                        className='flex items-center justify-between mt-8 mb-6'>
                        <div className='flex items-center flex-auto'>
                            <div className='relative w-[70px] h-[60px]'>
                                <Image
                                    src={item.image}
                                    alt='product'
                                    fill={true}
                                    sizes='(max-width: 768px) 100%,
                        (max-width: 1280px) 100%,
                             100%'
                                />
                            </div>

                            <div
                                className='basis-1/2 ml-2 text-[0.6rem] text-xs
                     font-bold uppercase opacity-70'>
                                <p>{item.name}</p>
                                <span className='text-sm tracking-wider'>
                                    ${item.price}
                                </span>
                            </div>
                        </div>

                        <span className='text-xs font-semibold md:text-base opacity-70'>
                            x{item.qty}
                        </span>
                    </div>
                );
            })}

            <div className='flex flex-col gap-4 mt-4 mb-8 uppercase'>
                <p className='flex items-center justify-between'>
                    <span className='opacity-50'>total</span>
                    <span className='text-lg font-semibold'>
                        ${totals.cartTotals.toLocaleString()}
                    </span>
                </p>
                <p className='flex items-center justify-between'>
                    <span className='opacity-50'>shipping</span>
                    <span className='text-lg font-semibold'>free</span>
                </p>
                <p className='flex items-center justify-between'>
                    <span className='opacity-50'>vat (included)</span>
                    <span className='text-lg font-semibold'>$20</span>
                </p>
                <p className='flex items-center justify-between'>
                    <span className='opacity-50'>grand total</span>
                    <span className='text-lg font-semibold text-[#cd2c2c]'>
                        ${totals.cartTotals.toLocaleString()}
                    </span>
                </p>
            </div>

            <button
                type='submit'
                className='bg-[#cd2c2c] text-white w-full py-4
             px-12 text-xs uppercase cursor-pointer'>
                continue & pay
            </button>

            <PaystackButton
                className='bg-[#cd2c2c] text-white w-full py-4
             px-12 text-xs uppercase cursor-pointer'
                // currency='USD'
                reference={new Date().getTime().toString()}
                text='make payment'
                onSuccess={onSuccess}
                onClose={onClose}
                {...config}
            />
        </section>
    );
};

export default FormSummary;
