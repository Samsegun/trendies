import React from "react";
import Footer from "./Footer/footer";
import Header from "./Header/Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header />

            <main className='min-h-screen'>{children}</main>

            <Footer />
        </div>
    );
};

export default Layout;
