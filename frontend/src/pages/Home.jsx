import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import Placeholder from '../assets/image.png'
import Card from "../components/Card";
import IconButton from "../components/IconButton";
import Modal from "../components/Modal";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import TextButton from "../components/TextButton";

function Home() {   
    const isAuthenticated = !!localStorage.getItem("token");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = isAuthenticated ? JSON.parse(localStorage.getItem("user")) : null;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const headers = user ? { 'x-user-id': user.id || user._id } : {};
            const res = await axios.get('http://localhost:5000/api/posts/all', { headers });
            return res.data.posts;
        }
    });

    const posts = data || [];

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"; 
        } else {
            document.body.style.overflow = "auto";
        }
        
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

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
            console.error(err);
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

    return(
        <div className="relative w-full md:w-3/4 lg:w-2/3 px-4 md:px-8 flex flex-col justify-center lg:flex-row lg:flex-wrap gap-4 md:gap-8">
            <header className="mb-4 flex flex-col">
                <h1 className="text-6xl/14 lg:text-7xl/14 font-bold text-center px-8 pt-8 pb-2">
                    Write your own blog now!
                </h1>
                <h2 className="font-light text-center">
                    Make something meaningful
                </h2>
                <div className="w-fit self-center flex gap-2 mt-8">
                    {isAuthenticated && <TextButton text="Write a blog" type={2} onClick={() => navigate("/post/create")}/>}
                    {isAuthenticated && <TextButton text="View drafts" type={1} onClick={() => navigate("/post/create/list")}/>}
                </div>
            </header>
            {posts.length > 0 ? (
                posts.map(post => (
                    <Card key={post._id} 
                        cardStyle="w-full xl:w-[calc(50%_-_16px)] justify-between grow"
                    >
                        <div className="w-full flex flex-col gap-2">
                            <img src={Placeholder} className='object-cover aspect-video'/>
                            <div className='flex flex-col p-4 md:px-8 gap-6'>
                                <header>
                                    <h1 className='text-3xl line-clamp-2 mb-1'>
                                        {post.title}
                                    </h1>
                                    <div className='flex justify-between text-sm font-light'>
                                        <p className=''>
                                            {post.author?.name}
                                        </p>
                                        <p className=''>
                                            {new Date(post.updatedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </header>
                                <article className='font-light line-clamp-3'>
                                    {post.body}
                                </article>
                            </div>
                        </div>
                        <footer className='flex justify-between p-4'>
                            <TextButton text="Read more" type={2} onClick={() => navigate(`/post/${post._id}`, { state: { post } })}/>
                            <div className="flex gap-2 flex items-center">
                                <p className="text-sm">
                                    {post.likeCount}
                                </p>
                                <IconButton icon={faThumbsUp} onClick={() => isAuthenticated ? likePost(post._id) : setShowModal(true)} customStyle={post.liked ? "!bg-stone-950 !text-orange-50" : ""}/>
                                <IconButton icon={faThumbsDown} onClick={() => isAuthenticated ? dislikePost(post._id) : setShowModal(true)} customStyle={post.disliked ? "!bg-stone-950 !text-orange-50" : ""}/>
                                <p className="text-sm">
                                    {post.dislikeCount}
                                </p>
                            </div>
                        </footer>
                    </Card>
                ))
                ) : (
                    <div>Nothing to see here, come back later...</div>
                )
            }
            {showModal && <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-stone-950/50 backdrop-blur-xs z-50">
                    <Modal text="You need to be logged in to react to posts. Please sign in to continue."
                        title="Login Required"
                        onClick={() => setShowModal(false)}
                    />
                </div>
            }
        </div>
    )
}

export default Home;