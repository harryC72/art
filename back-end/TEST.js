router.post("/create-user", upload.single("avatar"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    avatar: url + "/public/" + req.file.filename,
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "User registered successfully!",
        userCreated: {
          _id: result._id,
          name: result.name,
          avatar: result.avatar,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});
