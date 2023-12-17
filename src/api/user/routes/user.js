"use strict";

/**
 * reaction router
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/users",
      handler: "user.find",
    },
    {
      method: "GET",
      path: "/user/:username",
      handler: "user.findOne",
    },
  ],
};
