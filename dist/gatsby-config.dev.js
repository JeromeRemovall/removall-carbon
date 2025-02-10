"use strict";

require("dotenv").config({
  path: ".env.".concat(process.env.NODE_ENV)
});

module.exports = {
  siteMetadata: {
    title: "Removall carbon",
    siteUrl: process.env.URL_SITE,
    description: "Removall est une soci\xE9t\xE9 sp\xE9cialis\xE9e dans le montage de fonds carbone et le d\xE9veloppement de projets de compensation carbone."
  },
  flags: {
    DEV_SSR: false
  },
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-react-helmet", "gatsby-plugin-netlify", {
    resolve: "gatsby-source-wordpress",
    options: {
      url: process.env.URL_API,
      debug: {
        graphql: {}
      },
      schema: {
        perPage: 5,
        requestConcurrency: 3,
        previewRequestConcurrency: 3
      }
    }
  }, {
    resolve: "gatsby-plugin-i18n",
    options: {
      langKeyDefault: "fr",
      langKeyForNull: "fr",
      prefixDefault: false,
      useLangKeyLayout: false
    }
  }
  /*{
    resolve: `gatsby-plugin-manifest`,
    options: {
      icon: "src/images/icon.png", 
    }
  }*/
  ]
};