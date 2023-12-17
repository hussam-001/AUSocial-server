"use strict";
const _ = require("lodash");
const { postPopulate } = require("../../../constants");

/**
 * reaction controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = {
  async find(ctx) {
    const data = await strapi.db
      .query("plugin::users-permissions.user")
      .findMany({
        where: {
          id: {
            $ne: ctx.state.user.id,
          },
        },
        populate: {
          avatar: {},
        },
      });
    return data.map((user) => _.omit(user, ["password", "role", "provider"]));
  },
  async findOne(ctx) {
    const { username } = ctx.params;
    const data = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { username },
        populate: {
          avatar: {},
          followers: {},
          followings: {},
          posts: {
            populate: postPopulate,
          },
        },
      });
    return _.omit(data, ["password", "role", "provider"]);
  },
};
