import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import TextButton from "../components/TextButton";
import Modal from "../components/Modal";

function Post(){
    const location = useLocation();
    const navigate = useNavigate();
    const draft = location.state?.draft;

    const [isSaved, setIsSaved] = useState(false);
    const [post, setPost] = useState({
        postId: draft?._id || null,
        title: draft?.title || "",
        body: draft?.body || "",
    });
    const [originalPost, setOriginalPost] = useState({
        title: draft?.title || "",
        body: draft?.body || "",
    });
    const hasChanges = () => {
        return post.title !== originalPost.title || post.body !== originalPost.body;
    };
    const [showModal, setShowModal] = useState({
        show: false,
        title: "",
        text: "",
    });
    const [showModal2, setShowModal2] = useState({
        show: false,
        title: "",
        text: "",
        onConfirm: null
    });

    const token = localStorage.getItem("token");

    const saveDraft = async () => {
        if (!hasChanges()) return;
        try {
            const res = await axios.post(
                "http://localhost:5000/api/posts/draft",
                {
                    postId: post.postId,
                    title: post.title,
                    body: post.body,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const saved = res.data.post;
            setPost({
                postId: saved._id,
                title: saved.title,
                body: saved.body,
            });
            setOriginalPost({
                title: saved.title,
                body: saved.body,
            });
            setIsSaved(true);
        } catch (err) {
            console.error("Failed to save draft", err);
        }
    };

    const publishDraft = async () => {
        if (!post.postId) return;
        try {
            const res = await axios.put(
                `http://localhost:5000/api/posts/${post.postId}/publish`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/");
        } catch (err) {
            setShowModal({
                show: true,
                title: "No Changes Committed",
                text: "You cannot publish already published blogs without changes. You must change something or leave it as it is."
            });
            console.error("Failed to publish post", err);
        }
    }

    const deletePost = () => {
        setShowModal2({
            show: true,
            title: "Delete Entry",
            text: "Are you sure? This choice is irreversible.",
            onConfirm: confirmDelete
        });
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`http://localhost:5000/api/posts/${draft._id}/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/");
        } catch (err) {
            console.error("Failed to delete post", err);
        }
    }

    useEffect(() => {
        if (showModal.show || showModal2.show) {
            document.body.style.overflow = "hidden"; 
        } else {
            document.body.style.overflow = "auto";
        }
        
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal.show, showModal2.show]);
    return(
        <div className="relative w-full lg:w-2/3 h-screen px-4 md:px-8 flex flex-col lg:flex-wrap gap-4">
            <Card cardStyle="min-h-1/2 ">
                <div className='grow flex flex-col p-4 md:px-8 gap-6'>
                    <header>
                        <Input placeholder="Enter your blog title"
                            value={post.title}
                            onChange={(e) => setPost({...post, title: e.target.value})}
                            inputStyle="border-b-2 text-3xl"
                        />
                    </header>
                    <article className='font-light'>
                        <TextArea placeholder="Start writing your blog..."
                        value={post.body}
                        onChange={(e) => setPost({...post, body: e.target.value})}
                        />
                    </article>
                </div>
                <footer className='flex justify-between p-4'>
                    <TextButton text="Delete" type={1} onClick={() => deletePost()}/>
                    <div className="flex justify-end gap-2 ">
                        {hasChanges() && <TextButton text="Save" type={2} onClick={() => saveDraft()}/>}
                        {!hasChanges() && <TextButton text="Publish" type={2} onClick={() => publishDraft()}/>}
                    </div>
                </footer>
            </Card>
            {showModal.show && <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-stone-950/50 backdrop-blur-xs z-50">
                    <Modal text={showModal.text}
                        title={showModal.title}
                        onClick={() => setShowModal({...showModal, show: false})}
                    />
                </div>
            }
            {showModal2.show && <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-stone-950/50 backdrop-blur-xs z-50">
                    <Modal text={showModal2.text}
                        title={showModal2.title}
                        onClick={() => {
                            setShowModal2({...showModal2, show: false});
                            if (typeof showModal2.onConfirm === 'function') {
                                showModal2.onConfirm();
                            }
                        }}
                        onClick2={() => setShowModal2({...showModal2, show: false})}
                    />
                </div>
            }
        </div>
    )
}

export default Post;