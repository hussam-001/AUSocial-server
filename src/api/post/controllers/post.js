"use strict";

const { postPopulate } = require("../../../constants");

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", {
  async find(ctx) {
    const { pagination } = ctx.request.query;
    const data = await strapi.service("api::post.post").find({
      pagination,
      populate: postPopulate,
      sort: "createdAt:desc",
    });

    return data;
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const data = await strapi.service("api::post.post").findOne(id, {
      populate: postPopulate,
    });
    return data;
  },
  async create(ctx) {
    // @ts-ignore
    const { body } = ctx.request;
    const { user } = ctx.state;
    const data = await strapi.service("api::post.post").create({
      data: {
        ...body,
        postedBy: user.id,
      },
      populate: postPopulate,
    });

    return data;
  },
  async delete(ctx) {
    const id = Number(ctx.params.id);
    const { user } = ctx.state;
    const postData = await this.findOne(ctx);
    if (postData.postedBy.id !== user.id) {
      return ctx.unauthorized("You can't delete this post");
    }
    return strapi.service("api::post.post").delete(id);
  },
});
