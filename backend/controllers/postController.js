const Post = require('../models/Post');
const Reaction = require('../models/Reaction');

exports.createPost = async (req, res) => {
    const {title, content} = req.body;

    try {
        const post = await Post.create({
            title,
            content,
            author: req.user.id
        });

        res.status(201).json({message: 'Post Created', post});
    } catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

exports.deletePost = async (req, res) => {
    try{
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({message: 'Post not found'});

        post.isDeleted = true;
        await post.save();

        res.status(200).json({message: 'Post deleted '});
    } catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});
    }
};

exports.getPosts = async (req, res) => {
    try{
        const posts = await Post.find({isDeleted: false}).populate('author', 'name').sort({ createdAt: -1 });

        const postWithReactions = await Promise.all(
            posts.map(async (post) => {
                const count = await Reaction.countDocuments({post: post._id});
                return{
                    ...post.toObject(),
                    reactionsCount: count,
                };
            })
        );

        res.status(200).json({posts: postWithReactions});
    } catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});
    }
}