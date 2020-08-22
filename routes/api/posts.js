const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/users');
const Post = require('../../models/posts');
const request = require('request');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');

// @route POST api/posts
// @desc create a post
// @access Private

router.post('/', [
        auth,
        [
            check('text', 'Leave a Comment')
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        try {
            const user = await (await User.findById(req.user.id).select('-password'));
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })



            const post = await newPost.save();
            res.json(post);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });


// @route GET api/posts
// @desc Get all posts
// @access Private

router.get('/', auth, async (req, res) => {

    try {
        const posts = await Post.find().sort({
            date: -1
        });

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Private

router.get('/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                msg: 'No posts for such User'
            });
        }
        res.json(post);
    } catch (err) {

        if (err.kind == 'ObjectId') {
            return res.status(404).json({
                msg: 'No posts for such User'
            });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/posts/:id
// @desc DELETE a post
// @access Private

router.delete('/:id', auth, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        //check user
        if (post.user.toString() != req.user.id) {
            return res.status(401).json({
                msg: 'User not authorized!'
            });
        }

        await post.remove();

        res.json('Post Removed!');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //if post is already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
                msg: 'Post already liked'
            });
        }
        post.likes.unshift({
            user: req.user.id
        });
        await post.save();

        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route PUT api/posts/unlike/:id
// @desc Unlike a post
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //if post is not liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length == 0) {
            return res.status(400).json({
                msg: 'Post not liked'
            });
        }
        //get remove index
        const removeIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id));
        post.likes.splice(removeIndex, 1);
        await post.save();

        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/posts/comment:id
// @desc create a comment
// @access Private

router.post('/comment/:id', [
        auth,
        [
            check('text', 'Leave a Comment')
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        try {
            const user = await (await User.findById(req.user.id).select('-password'));
            const post = await Post.findById(req.params.id);
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }


            post.comments.unshift(newComment);
            await post.save();

            res.json(post.comments);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });

// @route POST api/posts/comment/:id/:comment_id
// @desc delete a comment
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        //pull comment

        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //make sure comment exist
        if (!comment) {
            return res.status(404).json({
                msg: 'Comment does not exist'
            });
        }

        //check user

        if (comment.user.toString() != req.user.id) {
            return res.status(401).json({
                msg: 'User not authorized!'
            });
        }

        const removeIndex = post.comments.map(comment => comment.user.toString().indexOf(req.user.id));
        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);



    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;