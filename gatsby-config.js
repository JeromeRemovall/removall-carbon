require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
console.log(
  "WPGRAPHQL_URL =",
  process.env.URL_API
);

module.exports = {
  siteMetadata: {
    title: `Removall carbon`,
    siteUrl: process.env.URL_SITE,
    description: `Removall est une société spécialisée dans le montage de fonds carbone et le développement de projets de compensation carbone.`,
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.URL_API,
        debug: {
          graphql: {
            showQueryOnError: true,
            copyQueryOnError: true,
          },
        },
        verbose: true,

        schema: {
          perPage: 20, // currently set to 25
          requestConcurrency: 5, // currently set to 1
          previewRequestConcurrency: 2, // currently set to 2
        },
      },
    },
    {
      resolve: `gatsby-plugin-i18n`,
      options: {
        langKeyDefault: "fr",
        langKeyForNull: "fr",
        prefixDefault: false,
        useLangKeyLayout: false,
      },
    },
    /*{
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: "src/images/icon.png", 
      }
    }*/
  ],
};
