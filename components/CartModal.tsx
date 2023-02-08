import Image from "next/image";
import { useCartStore } from "@/store/cart";

// type Props = {
//     user:
//          {
//               email?: string | null | undefined;
//               email_verified: boolean;
//               name: string;
//               nickname: string;
//               picture: string;
//               // sid: string;
//               sub: string;
//               updated_at: string;
//           }
//         | undefined;
// };
type Props = {
    email: string | null | undefined;
};

const CartModal = ({ email }: Props) => {
    const { cart, totals, removeCartItem, resetCart } = useCartStore(
        state => state
    );

    return (
        <section
            className='absolute right-0 z-40 w-[90%] 
    max-w-xs bg-white text-black top-12 h-auto p-2 pb-6 xs:p-4 shadow-xl'>
            <div className='flex justify-between'>
                <h2 className='font-semibold uppercase'>cart</h2>
                <button
                    type='button'
                    onClick={resetCart}
                    className='opacity-70'>
                    Remove all
                </button>
            </div>

            {cart.map((item, idx) => {
                return (
                    <div key={idx}>
                        <div className='flex items-center justify-between mt-8 mb-6'>
                            <div className='flex items-center'>
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

                                <div className='basis-1/2 ml-2 text-[0.6rem] xs:text-[0.7rem] opacity-70'>
                                    <p>{item.name}</p>
                                    <span className='tracking-wider'>
                                        {item.qty} x ${item.price}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={removeCartItem.bind(null, item.id)}
                                className='text-xs font-semibold opacity-70'>
                                X
                            </button>
                        </div>

                        <hr />
                    </div>
                );
            })}

            <div className='flex justify-between mt-4 mb-6'>
                <span className='uppercase opacity-70'>total</span>
                <span className='font-semibold'>
                    ${totals.cartTotals.toLocaleString()}
                </span>
            </div>

            <button
                type='button'
                disabled={email ? false : true}
                className='bg-[#e33f3f] text-white uppercase
             px-12 py-4 w-full text-xs font-semibold tracking-widest
              hover:bg-[#e33f3fe5] disabled:bg-[#fdb7b7e5] disabled:cursor-not-allowed'>
                checkout
            </button>
        </section>
    );
};

export default CartModal;
