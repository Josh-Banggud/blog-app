const Reaction = require('../models/Reaction');

exports.likePost = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;

    try{
        const likeExists = await Reaction.findOne({user: userId, post: postId});

        if(likeExists){
            if(likeExists.type == 'like'){
                await Reaction.deleteOne({_id: likeExists._id});
                return res.json({message: 'Like removed'});
            }else{
                likeExists.type = 'like';
                await likeExists.save();
                return res.json({message: 'Post liked'});
            }
        }

        await Reaction.create({user: userId, post: postId, type: 'like'});
        res.json({message: 'Liked post'});
    } catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});
    }
}

exports.dislikePost = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;

    try{
        const dislikeExists = await Reaction.findOne({user: userId, post: postId});

        if(dislikeExists){
            if(dislikeExists.type == 'dislike'){
                await Reaction.deleteOne({_id: dislikeExists._id});
                return res.json({message: 'Dislike removed'});
            }else{
                dislikeExists.type = 'dislike';
                await dislikeExists.save();
                return res.json({message: 'Post disliked'});
            }
        }

        await Reaction.create({user: userId, post: postId, type: 'dislike'});
        res.json({message: 'Disliked post'});
    } catch(err){
        res.status(500).json({message: 'Server Error', error: err.message});
    }
}