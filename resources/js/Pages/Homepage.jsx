import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";
import NewsList from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";

const Homepage = (props) => {
    const { news, auth } = props;
    return (
        <div className="min-h-screen bg-slate-50">
            <Head />
            <Navbar user={auth.user} />
            <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4">
                <NewsList news={news.data} />
            </div>
            <div className="flex justify-center items-center">
                <Paginator meta={news.meta} />
            </div>
        </div>
    );
};

export default Homepage;
