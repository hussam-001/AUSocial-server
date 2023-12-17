"use strict";

/**
 * reaction controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::reaction.reaction", {
  async create(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.request.body;
    const reactions = await strapi.service("api::reaction.reaction").find({
      filters: {
        post: {
          id,
        },
        reactedBy: {
          id: user.id,
        },
      },
    });
    const reaction = reactions?.results?.[0];
    if (reaction) {
      await strapi.service("api::reaction.reaction").delete(reaction?.id);
    } else {
      await strapi.service("api::reaction.reaction").create({
        data: {
          reactedBy: user,
          post: {
            id,
          },
        },
      });
    }

    return strapi.service("api::post.post").findOne(id, {
      populate: {
        reactions: {
          populate: {
            reactedBy: {
              fields: ["id"],
            },
          },
        },
      },
    });
  },
});
