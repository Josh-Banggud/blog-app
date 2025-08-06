import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Placeholder from '../assets/image.png'
import Card from "../components/Card";
import IconButton from "../components/IconButton";
import Modal from "../components/Modal";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import TextButton from "../components/TextButton";

function Drafts() {   
    const [drafts, setDrafts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const getDrafts = async () => {
            try{
                const res = await axios.get('http://localhost:5000/api/posts/draft/all', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDrafts(res.data.drafts);
            } catch(err){
                console.error('Failed to fetch drafts', err);
            }
        };
        getDrafts();
    }, []);

    return(
        <div className="relative w-full md:w-3/4 lg:w-2/3 px-4 md:px-8 flex flex-col lg:flex-row lg:flex-wrap gap-4 md:gap-8">
            {drafts.length > 0 ? (
                drafts.map(post => (
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
                                            {new Date(post.createdAt).toLocaleDateString('en-US', {
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
                        <footer className='flex justify-end gap-2 p-4'>
                            <TextButton text="Continue" type={2} onClick={() => navigate("/post/create", {state: {draft: post}})}/>
                        </footer>
                    </Card>
                ))
                ) : (
                    <div>Nothing to see here, come back later...</div>
                )
            }
        </div>
    )
}

export default Drafts;