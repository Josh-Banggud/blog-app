import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import IconButton from "../components/IconButton";
import Placeholder from '../assets/image.png'
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import Modal from "../components/Modal";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons";

function Blog(){
    const isAuthenticated = !!localStorage.getItem("token");
    const user = isAuthenticated ? JSON.parse(localStorage.getItem("user")) : null;
    const navigate = useNavigate();
    const {state} = useLocation();
    const post = state?.post;
    
    if (!post) return <div className="px-4">No post data provided.</div>;

    const [showModal, setShowModal] = useState({
        show: false,
        title: "",
        text: "",
        hasConfirmed: null
    });

    const deletePost = () => {
        setShowModal({
            show: true,
            title: "Delete Entry",
            text: "Are you sure? This choice is irreversible.",
            onConfirm: confirmDelete
        });
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`http://localhost:5000/api/posts/${post._id}/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            queryClient.invalidateQueries(['posts']);
            navigate("/");
        } catch (err) {
            console.error("Failed to delete post", err);
        }
    }

    const likePost = async (postId) => {
        const token = localStorage.getItem("token");
        try{
            await axios.post(
                `http://localhost:5000/api/post/${postId}/like`,
                {},
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            queryClient.invalidateQueries(['posts']);
        } catch(err){
            console.error("Failed to like the post");
        }
    };

    const dislikePost = async (postId) => {
        const token = localStorage.getItem("token");
        try{
            await axios.post(
                `http://localhost:5000/api/post/${postId}/dislike`,
                {},
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            queryClient.invalidateQueries(['posts']);
        } catch(err){
            console.error("Failed to like the post");
        }
    };


    useEffect(() => {
        if (showModal.show) {
            document.body.style.overflow = "hidden"; 
        } else {
            document.body.style.overflow = "auto";
        }
        
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal.show]);
    return(
        <div className="relative w-full lg:w-2/3 px-4 md:px-8 flex flex-col lg:flex-wrap gap-4">
            <Card cardStyle="min-h-1/2 grow">
                <img src={Placeholder} className='object-cover aspect-video'/>
                <div className='flex flex-col p-4 md:px-8 gap-6'>
                    <header>
                        <h1 className='text-3xl line-clamp-2'>
                            {post.title}
                        </h1>
                        <div className='flex justify-between'>
                            <div>
                                <p>
                                    {post.author?.name}
                                </p>
                                <p className='text-sm font-light'>
                                    {new Date(post.updatedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </header>
                    <article className='font-light'>
                        {post.body}
                    </article>
                </div>
                <footer className='flex justify-end gap-2 p-4'>
                    {post.author?._id == user?.id &&<TextButton text="Delete" type={1} onClick={() => deletePost()}/>}
                    {post.author?._id == user?.id &&<TextButton text="Edit" type={2} onClick={() => navigate("/post/create", {state: {draft: post}})}/>}
                </footer>
            </Card>
            {showModal.show && <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-stone-950/50 backdrop-blur-xs z-50">
                    <Modal text={showModal.text} title={showModal.title}
                        onClick={() => {
                            setShowModal({...showModal, show: false});
                            if (typeof showModal.onConfirm === 'function') {
                                showModal.onConfirm();
                            }
                        }}
                        onClick2={() => setShowModal({...showModal, show: false})}
                    />
                </div>
            }
        </div>
    )
}

export default Blog;