const Post = require('../models/Post');
const Reaction = require('../models/Reaction');

exports.saveDraft = async (req, res) => {
    const { postId, title, body } = req.body;


    try {
        let post;

        if (postId) {
            post = await Post.findOneAndUpdate(
                { _id: postId, author: req.user.id },
                { title, body, status: 'draft'},
                { new: true }
            );
        }

        if (!post) {
            post = await Post.create({
                title,
                body,
                author: req.user.id,
                status: 'draft',
            });
        }

        res.status(200).json({ message: 'Draft saved', post });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.publishDraft = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Draft not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        if (post.status === 'published') {
            return res.status(400).json({ message: 'Post already published' });
        }

        post.status = 'published';
        post.publishedAt = new Date();
        await post.save();

        res.status(200).json({ message: 'Draft published', post });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
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
        const userId = req.headers['x-user-id'] || null;

        const posts = await Post.find({isDeleted: false, status: "published"}).populate('author', 'name').sort({ createdAt: -1 });

        const postWithReactions = await Promise.all(
            posts.map(async (post) => {
                const [likeCount, dislikeCount, userReaction] = await Promise.all([
                    Reaction.countDocuments({ post: post._id, type: 'like' }),
                    Reaction.countDocuments({ post: post._id, type: 'dislike' }),
                    userId ? Reaction.findOne({ post: post._id, user: userId }) : null
                ]);

                let liked = false;
                let disliked = false;
                if (userId) {
                    const userReaction = await Reaction.findOne({
                        post: post._id,
                        user: userId,
                    });
                    if (userReaction) {
                        liked = userReaction.type == 'like';
                        disliked = userReaction.type == 'dislike';
                    }
                }
                return{
                    ...post.toObject(),
                    likeCount,
                    dislikeCount,
                    liked,
                    disliked,

                };
            })
        );

        res.status(200).json({posts: postWithReactions});
    } catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});
    }
}

exports.getDrafts = async (req, res) => {
    try {
        const drafts = await Post.find({
            isDeleted: false,
            status: 'draft',
            author: req.user.id,
        })
        .populate('author', 'name')
        .sort({ updatedAt: -1 });

        res.status(200).json({ drafts });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
