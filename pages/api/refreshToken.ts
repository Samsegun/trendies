import { handleProfile, withApiAuthRequired } from "@auth0/nextjs-auth0";

const handler = async (req: any, res: any) => {
    try {
        await handleProfile(req, res, {
            refetch: true,
            afterRefetch: async (a: any, b: any, session) => session,
        });
    } catch (error: any) {
        console.log(error);

        return res.status(error?.response?.status || 500).json({
            message: error.message,
        });
    }
};

export default withApiAuthRequired(handler);
