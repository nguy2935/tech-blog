const router = require("express").Router();
const withAuth = require("../../utils/auth");
const {Comment, Post, User} = require("../../models");

// all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            "comment_text",
            "user_id",
            "post_id"]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
.then(dbPostData => {
    const posts = dbPostData.map(post => post.get({plain:true}));
    console.log(req.session.loggedIn);
    res.render("homepage", {posts, loggedIn: req.session.loggedIn});
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});

router.get("/:id", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

router.get("/post/:id", (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "user_id", 
            "comment_text", 
            "post_id"
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
            }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
})
.then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: "No comment found with this id"});
        return;
    }
    const post = dbPostData.get({ plain: true});
    res.render("single-post", { post, loggedIn: req.session.loggedIn});
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

module.exports = router;