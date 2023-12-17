"use strict";

/**
 * comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::comment.comment", {
  async create(ctx) {
    // @ts-ignore
    const { body } = ctx.request;
    const { user } = ctx.state;
    await strapi.service("api::comment.comment").create({
      data: {
        ...body,
        commentedBy: user,
      },
    });

    return strapi.service("api::post.post").findOne(body.post.id, {
      populate: {
        comments: {
          populate: {
            commentedBy: {
              populate: {
                avatar: {},
              },
            },
          },
        },
      },
    });
  },
});
