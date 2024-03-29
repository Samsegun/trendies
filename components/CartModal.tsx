import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/router";

const CartModal = () => {
    const { push } = useRouter();

    const { cart, totals, removeCartItem, resetCart } = useCartStore(
        state => state
    );

    const navigate = (id: number) => {
        push(`/category/jewelery/${id}`);
    };

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
                    <div key={idx} className=''>
                        <div className='flex items-center justify-between mt-8 mb-6'>
                            <div
                                className='flex items-center cursor-pointer hover:text-slate-600'
                                onClick={() => navigate(item.id)}>
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
                                className='text-xs font-semibold text-red-800 cursor-pointer opacity-70 hover:scale-110'>
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
                className='bg-[#e33f3f] text-white uppercase
              w-full text-xs font-semibold tracking-widest
              hover:bg-[#e33f3fe5]'>
                <span
                    onClick={() => push("/checkout")}
                    className='block px-12 py-4'>
                    Checkout
                </span>
            </button>
        </section>
    );
};

export default CartModal;
