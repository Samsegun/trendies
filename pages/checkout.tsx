import Container from "@/components/UI/container";
import { FormGroup, Input, Label } from "@/components/UI/formComponents";
import { useRouter } from "next/router";

const Checkout = () => {
    const router = useRouter();

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

                <div className='bg-[#fff] min-h-screen rounded-lg p-4'>
                    <h1 className='uppercase font-bold tracking-[1px] mb-4'>
                        checkout{" "}
                    </h1>

                    <form className='mt-8 '>
                        {/* billing */}
                        <div>
                            <h2 className='text-xs font-bold uppercase tracking-[1px] text-[#e33f3f]'>
                                billing details
                            </h2>

                            <div className='grid-cols-2 md:grid md:gap-4'>
                                <FormGroup>
                                    <Label name={"name"} />
                                    <Input
                                        type='text'
                                        id='name'
                                        placeholder='sam'
                                        name='name'
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label name={"email address"} />
                                    <Input
                                        type='email'
                                        id='email address'
                                        placeholder='sam@xyz.com'
                                        name='email'
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label name={"phone number"} />
                                    <Input
                                        type='tel'
                                        id='phone number'
                                        placeholder='+123-456-789'
                                        name='phone'
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
                                    <Input
                                        type='text'
                                        id='your address'
                                        placeholder='113 williams avenue'
                                        name='address'
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label name={"zip code"} />
                                    <Input
                                        type='number'
                                        id='zip code'
                                        placeholder='100001'
                                        name='zip'
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label name={"city"} />
                                    <Input
                                        type='text'
                                        id='city'
                                        placeholder='lagos'
                                        name='city'
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label name={"country"} />
                                    <Input
                                        type='text'
                                        id='country'
                                        placeholder='Nigeria'
                                        name='country'
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default Checkout;
