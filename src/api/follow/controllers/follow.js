"use strict";

/**
 * follow controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::follow.follow", {
  async create(ctx) {
    const { user } = ctx.state;
    // @ts-ignore
    const { id } = ctx.request.body;
    const follows = await strapi.service("api::follow.follow").find({
      filters: {
        following: {
          id,
        },
        follower: {
          id: user.id,
        },
      },
    });
    const follow = follows?.results?.[0];
    if (follow) {
      return strapi.service("api::follow.follow").delete(follow?.id);
    } else {
      return strapi.service("api::follow.follow").create({
        data: {
          follower: user,
          following: {
            id,
          },
        },
      });
    }
  },
});
