import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";
import { Inertia } from "@inertiajs/inertia";

const EditNews = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const { myNews, auth } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { id: myNews.id, title, description, category };
        Inertia.post("/news/update", data);
        setTitle("");
        setDescription("");
        setCategory("");
    };
    return (
        <div className="min-h-screen bg-slate-50">
            <Head />
            <Navbar user={auth.user} />
            <div className="p-4 m-4">
                <div className="card w-full lg:w-96 bg-base-100 shadow-xl gap-4">
                    <div className="p-4 text-2xl">Edit Berita</div>
                    <div className="card-body">
                        <input
                            type="text"
                            defaultValue={myNews.title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="m-2 input w-full"
                        />
                        <input
                            type="text"
                            defaultValue={myNews.description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="m-2 input w-full"
                        />
                        <input
                            type="text"
                            defaultValue={myNews.category}
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
            </div>
        </div>
    );
};

export default EditNews;
