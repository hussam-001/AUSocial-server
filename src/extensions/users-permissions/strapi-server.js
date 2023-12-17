"use strict";

module.exports = (plugin) => {
  plugin.controllers.user.me = async (ctx) => {
    const { user } = ctx.state;
    const data = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: {
          username: user.username,
        },
        populate: {
          avatar: {},
          followers: {
            follower: {
              populate: {
                avatar: {},
              },
            },
          },
          followings: {
            populate: {
              following: {
                populate: {
                  avatar: {},
                },
              },
            },
          },
          fields: [
            "id",
            "username",
            "email",
            "firstName",
            "lastName",
            "verified",
          ],
        },
      });
    return data;
  };

  return plugin;
};
