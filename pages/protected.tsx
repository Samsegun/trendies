import Container from "@/components/UI/container";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Protected = () => {
    return (
        <Container>
            <h1>This is a protected page</h1>
        </Container>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Protected;
