import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const { flash, myNews } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { title, description, category };
        if (!data) {
            isNotif(false);
        } else {
            Inertia.post("/news", data);
            setIsNotif(true);
            setTitle("");
            setDescription("");
            setCategory("");
        }
    };

    useEffect(() => {
        if (!myNews) {
            Inertia.get("/news");
        }
        return;
    }, []);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {isNotif && (
                            <div className="m-2 alert alert-success shadow-lg">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current flex-shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{flash.message}</span>
                                </div>
                            </div>
                        )}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="m-2 input w-full"
                        />
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="m-2 input w-full"
                        />
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Category"
                            className="m-2 input w-full"
                        />
                        <button
                            onClick={handleSubmit}
                            className="m-2 btn btn-sm btn-block btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div className="p-4 m-4">
                    {myNews && myNews.length > 0 ? (
                        myNews.map((news, i) => (
                            <div
                                key={i}
                                className="card w-full lg:w-96 bg-base-100 shadow-xl gap-4"
                            >
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {news.title}
                                        <div className="badge badge-secondary">
                                            NEW
                                        </div>
                                    </h2>
                                    <p>{news.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">
                                            {news.category}
                                        </div>
                                        <div className="badge badge-outline">
                                            {news.author}
                                        </div>
                                        <div className="badge badge-warning">
                                            <Link
                                                href={route("edit.news")}
                                                method="get"
                                                data={{ id: news.id }}
                                                as="button"
                                            >
                                                edit
                                            </Link>
                                        </div>
                                        <div className="badge badge-error">
                                            <Link
                                                href={route("delete.news")}
                                                method="post"
                                                data={{ id: news.id }}
                                                as="button"
                                            >
                                                delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="m-4">Berita Anda Masih Kosong!</p>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}
