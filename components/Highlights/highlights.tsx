import Container from "../UI/container";

const assets = [
    {
        icon: (
            <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
                <path d='M11.2 39.95q-2.45 0-4.175-1.725Q5.3 36.5 5.3 34.05H2V11q0-1.2.9-2.1Q3.8 8 5 8h28.95v8.35h5.25L46 25.4v8.65h-3.55q0 2.45-1.725 4.175Q39 39.95 36.55 39.95q-2.45 0-4.175-1.725Q30.65 36.5 30.65 34.05H17.1q0 2.45-1.725 4.175Q13.65 39.95 11.2 39.95Zm0-3q1.2 0 2.05-.85.85-.85.85-2.05 0-1.2-.85-2.05-.85-.85-2.05-.85-1.2 0-2.05.85-.85.85-.85 2.05 0 1.2.85 2.05.85.85 2.05.85ZM5 31.05h1.1q.85-1.35 2.15-2.15 1.3-.8 2.9-.8 1.6 0 2.925.825 1.325.825 2.175 2.125h14.7V11H5Zm31.55 5.9q1.2 0 2.05-.85.85-.85.85-2.05 0-1.2-.85-2.05-.85-.85-2.05-.85-1.2 0-2.05.85-.85.85-.85 2.05 0 1.2.85 2.05.85.85 2.05.85Zm-2.6-10.2h9.3l-5.55-7.4h-3.75ZM18 21.55Z' />
            </svg>
        ),
        heading: "payment & delivery",
        text: "Free shipping for orders over $50",
    },
    {
        icon: (
            <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
                <path d='M21.75 44q-2.4-.35-4.65-1.25-2.25-.9-4.25-2.4l2.15-2.2q1.6 1.2 3.3 1.875 1.7.675 3.45.975Zm4.5 0v-3q5.5-1.05 9.125-5.175T39 25.85q0-6.35-4.325-10.675Q30.35 10.85 24 10.85h-1l3.95 3.95-2.2 2.2-7.65-7.65 7.65-7.65 2.2 2.2L23 7.85h1q3.75 0 7.025 1.4 3.275 1.4 5.725 3.85 2.45 2.45 3.85 5.725Q42 22.1 42 25.85q0 7-4.45 12.05-4.45 5.05-11.3 6.1ZM9.7 37.2q-1.4-1.9-2.325-4.225Q6.45 30.65 6.1 28.1h3.05q.25 1.9.925 3.65T11.9 35ZM6.1 23.6q.35-2.5 1.25-4.775.9-2.275 2.35-4.275l2.2 2.15q-1.15 1.65-1.825 3.4t-.925 3.5Z' />
            </svg>
        ),
        heading: "return & refund",
        text: "Free 100% money back guarantee",
    },
    {
        icon: (
            <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
                <path d='M16.4 42H9q-1.2 0-2.1-.9Q6 40.2 6 39V24q0-3.75 1.425-7.025 1.425-3.275 3.85-5.7 2.425-2.425 5.7-3.85Q20.25 6 24 6q3.75 0 7.025 1.425 3.275 1.425 5.7 3.85 2.425 2.425 3.85 5.7Q42 20.25 42 24v15q0 1.2-.9 2.1-.9.9-2.1.9h-7.4V27.2H39V24q0-6.25-4.375-10.625T24 9q-6.25 0-10.625 4.375T9 24v3.2h7.4Zm-3-11.8H9V39h4.4Zm21.2 0V39H39v-8.8Zm0 0H39h-4.4Zm-21.2 0H9Z' />
            </svg>
        ),
        heading: "quality support",
        text: "Alway online feedback 24/7",
    },
];

const Highlights = () => {
    return (
        <Container>
            <section
                className='w-11/12 mx-auto mb-8 grid grid-cols-1 gap-y-4 sm:grid-cols-2
         md:grid-cols-3 md:mt-8  max-w-[1200px]'>
                {assets.map((asset, idx) => {
                    return (
                        <div key={idx} className='flex items-center gap-8'>
                            <div>
                                <span>{asset.icon}</span>
                            </div>

                            <div>
                                <h3 className='uppercase text-[#333] tracking-widest'>
                                    {asset.heading}
                                </h3>
                                <p className='text-[#777] text-sm'>
                                    {asset.text}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </section>
        </Container>
    );
};

export default Highlights;
