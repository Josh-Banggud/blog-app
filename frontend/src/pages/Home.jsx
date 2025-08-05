import { useEffect, useState } from "react";
import axios from "axios";
import Placeholder from '../assets/image.png'
import Card from "../components/Card";
import IconButton from "../components/IconButton";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

function Home() {   
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try{
                const res = await axios.get('http://localhost:5000/api/posts/all');
                setPosts(res.data.posts);
            } catch(err){
                console.error('Failed to fetch posts', err);
            }
        };
        getPosts();
    }, []);

    return(
        <div className="w-full lg:w-2/3 px-4 md:px-8 flex flex-col lg:flex-row lg:flex-wrap gap-4 md:gap-8">
            {posts.length > 0 ? (
                posts.map(post => (
                    <Card key={post._id} 
                        cardStyle="w-full lg:w-[calc(50%_-_16px)] xl:w-[calc(33.33%_-_22px)] h-fit"
                    >
                        <img src={Placeholder} className='object-cover aspect-video'/>
                        <div className='flex flex-col p-4 md:px-8 gap-6'>
                            <header>
                                <h1 className='text-3xl line-clamp-2'>
                                    {post.title}
                                </h1>
                                <div className='flex justify-between text-sm font-light'>
                                    <p className=''>
                                        {post.author?.name}
                                    </p>
                                    <p className=''>
                                        {post.created_at}
                                    </p>
                                </div>
                            </header>
                            <article className='font-light line-clamp-3'>
                                {post.body}
                            </article>
                        </div>
                        <footer className='flex justify-end gap-2 p-4'>
                            <IconButton icon={faThumbsUp}/>
                            <IconButton icon={faThumbsDown}/>
                        </footer>
                    </Card>
                ))
                ) : (
                    <div>Nothing to see here</div>
                )
            }
        </div>
    )
}

export default Home;