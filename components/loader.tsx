import Container from "./UI/container";

const Loading = () => {
    return (
        <Container>
            <div className='h-[100vh] flex justify-center items-center'>
                <p className='text-3xl'>page is loading</p>
            </div>
        </Container>
    );
};

export default Loading;
