import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import IconButton from "../components/IconButton";
import Placeholder from '../assets/image.png'
import Input from "../components/Input";
import TextButton from "../components/TextButton";

function Blog(){
    return(
        <div className="w-full lg:w-2/3 px-4 md:px-8 flex flex-col lg:flex-wrap gap-4">
            <Card>
                <img src={Placeholder} className='object-cover aspect-video'/>
                <div className='flex flex-col p-4 md:px-8 gap-6'>
                    <header>
                        <h1 className='text-3xl line-clamp-2'>
                            Fundamentals of 3D Modelling
                        </h1>
                        <div className='flex justify-between text-sm font-light'>
                            <p className=''>
                                Josh Banggud
                            </p>
                            <p className=''>
                                August 5, 2025
                            </p>
                        </div>
                    </header>
                    <article className='font-light'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam vulputate risus in auctor. Etiam congue eleifend enim. Aenean ultrices risus iaculis diam volutpat mattis. Nunc et viverra ante. In dapibus mollis tellus at venenatis. Proin tincidunt pulvinar tellus, et tristique diam pharetra eu. Nunc semper malesuada gravida. Curabitur nec dapibus magna, eget tincidunt odio. Quisque vel nibh enim. Pellentesque sollicitudin finibus nisi at rhoncus.
                    </article>
                </div>
                <footer className='flex justify-end gap-2 p-4'>
                    {/* <IconButton icon={faThumbsUp} interactStyle=""/>
                    <IconButton icon={faThumbsDown}/> */}
                </footer>
            </Card>
        </div>
    )
}

export default Blog;