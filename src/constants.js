const postPopulate = {
  postedBy: {
    fields: ["username", "firstName", "lastName", "verified"],
    populate: {
      avatar: {},
    },
  },
  reactions: {
    populate: {
      reactedBy: {
        fields: ["id"],
      },
    },
  },
  comments: {
    commentedBy: {},
    populate: {
      commentedBy: {
        populate: {
          avatar: {},
        },
      },
    },
  },
};

module.exports = {
  postPopulate,
};
