const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
// const { default: Recruitment } = require("./src/templates/test");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude:
          /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};

exports.createPages = async ({ graphql, actions }) =>  {
    
    const { createRedirect } = actions;
    createRedirect({
      fromPath: '/',
      toPath: '/fr/',
      isPermanent: true
    });

    const { createPage } = actions;
    const result = await graphql(`
        query MyQuery {
            home : allWpPage(filter: {category: {name: {eq: "accueil"}}}) {
                nodes {
                    home {
                        titreOngletDeLaPage
                        titre
                        description
                        bloc1Titre
                        bloc1Texte
                        bloc1Bouton
                        bloc1BoutonMobile
                        bloc1BoutonLien
                        bloc2Image {
                          sourceUrl
                          altText
                        }
                        bloc2Titre
                        bloc2Texte
                        bloc2Bouton
                        bloc2BoutonMobile
                        bloc2BoutonLien
                        bloc3Titre
                        bloc3item1Image {
                          sourceUrl
                          altText
                        }
                        bloc3item1SousTitre
                        bloc3item1Texte
                        bloc3item2Image {
                          sourceUrl
                          altText
                        }
                        bloc3item2SousTitre
                        bloc3item2Texte
                        bloc3item3Image {
                          sourceUrl
                          altText
                        }
                        bloc3item3SousTitre
                        bloc3item3Texte
                        bloc3item4Image {
                          sourceUrl
                          altText
                        }
                        bloc3item4SousTitre
                        bloc3item4Texte
                        bloc3Bouton
                        bloc3BoutonMobile
                        bloc3BoutonLien
                        bloc4Titre
                        bloc4Texte
                        bloc4item1Image {
                          sourceUrl
                          altText
                        }
                        bloc4item1SousTitre
                        bloc4item1Texte
                        bloc4item2Image {
                          sourceUrl
                          altText
                        }
                        bloc4item2SousTitre
                        bloc4item2Texte
                        bloc4item3Image {
                          sourceUrl
                          altText
                        }
                        bloc4item3SousTitre
                        bloc4item3Texte
                        bloc4Bouton
                        bloc4BoutonMobile
                        bloc4BoutonLien
                        bloc5Titre
                        bloc5Texte
                        bloc5Bouton
                        bloc5BoutonMobile
                        bloc5BoutonLien
                        bloc6Titre
                        bloc6item1SousTitre
                        bloc6item2SousTitre
                    }
                    language {
                        slug
                    }
                }
            }

            contact: allWpPage(filter: {category: {name: {eq: "contact"}}}){
                nodes{
                    contact {
                        titreOngletDeLaPage
                        adresse
                        description
                        email
                        fieldGroupName
                        lienFacebook
                        lienInstagram
                        lienLinkedin
                        lienTwitter
                        lienYoutube
                        sousTitre
                        telephone
                        titre
                        iconAdresse {
                          sourceUrl
                          altText
                        }
                        iconEmail {
                          sourceUrl
                          altText
                        }
                        iconFacebook {
                          sourceUrl
                          altText
                        }
                        iconInstagram {
                          sourceUrl
                          altText
                        }
                        iconLinkedin {
                          sourceUrl
                          altText
                        }
                        iconTelephone {
                          sourceUrl
                          altText
                        }
                        iconTwitter {
                          sourceUrl
                          altText
                        }
                        iconYoutube {
                          sourceUrl
                          altText
                        }
                        imageDeFond {
                          sourceUrl
                          altText
                        }
                    }
                    contactFormulaire {
                        adresseEmail
                        message
                        phraseRgpd
                        nom
                        organisation
                        prenom
                        tel
                        bouton
                        boutonMobile
                    }
                    slug
                    language {
                        slug
                    }
                }
            }

            services: allWpPage(filter: {category: {name: {eq: "services"}}}){
                nodes {
                    services {
                        titre
                        titreOngletDeLaPage
                        description
                        imageDeFond {
                            sourceUrl
                            altText
                        }
                        bloc1Titre
                        bloc1Texte
                        bloc1Image {
                            sourceUrl
                            altText
                        }
                        bloc2Titre
                        bloc2Texte
                        bloc2Image {
                            sourceUrl
                            altText
                        }
                        bloc3Titre
                        bloc3Texte
                        bloc3Image {
                            sourceUrl
                            altText
                        }
                        bloc4Titre
                        bloc4Texte
                        bloc4Image {
                            sourceUrl
                            altText
                        }
                        itemMenu1
                        itemMenu2
                        itemMenu3
                        itemMenu4
                    }
                    slug
                    language {
                        slug
                    }
                }
            }

            ecosystem : allWpPage(filter: {category: {name: {eq: "écosystème"}}}){
                nodes{
                    ecosysteme{
                        titre
                        titreOngletDeLaPage
                        description
                        imageDeFond{
                            sourceUrl
                            altText
                        }
                        bloc1Titre
                        bloc1Texte
                        bloc2Titre
                        bloc2Texte
                        phrasePageVide
                    }
                    slug
                    language {
                        slug
                    }
                }
            }

            aPropos : allWpPage(filter: {category: {name: {eq: "à propos"}}}){
                nodes{
                    APropos{
                        titre
                        titreOngletDeLaPage
                        description
                        imageDeFond{
                          sourceUrl
                          altText
                        }
                        bloc1Titre
                        bloc1Texte
                        bloc2Image {
                          sourceUrl
                          altText
                        }
                        bloc2Texte1
                        bloc2Texte2
                        bloc2Titre1
                        bloc2Titre2
                        bloc3Image {
                          sourceUrl
                          altText
                        }
                        bloc3Titre
                        bloc3Texte
                        bloc4Titre
                        bloc4Texte
                        bloc4Item1Image {
                          sourceUrl
                          altText
                        }
                        bloc4Item1Titre
                        bloc4Item1Texte
                        bloc4Item2Image {
                          sourceUrl
                          altText
                        }
                        bloc4Item2Titre
                        bloc4Item2Texte
                        bloc4Item3Image {
                          sourceUrl
                          altText
                        }
                        bloc4Item3Titre
                        bloc4Item3Texte
                        bloc5Titre
                        bloc5Texte
                        bloc5Carte1Titre
                        bloc5Carte1Number
                        bloc5Carte2Titre
                        bloc5Carte2Number
                        bloc5Carte3Titre
                        bloc5Carte3Number
                        bloc5Carte4Titre
                        bloc5Carte4Number
                        bloc6Titre
                        bloc6Item1Icon {
                          sourceUrl
                          altText
                        }
                        bloc6Item1Titre
                        bloc6Item1Texte
                        bloc6Item2Icon {
                          sourceUrl
                          altText
                        }
                        bloc6Item2Titre
                        bloc6Item2Texte
                        bloc6Item3Icon {
                          sourceUrl
                          altText
                        }
                        bloc6Item3Texte
                        bloc6Item3Titre
                        bloc6Item4Icon {
                          sourceUrl
                          altText
                        }
                        bloc6Item4Titre
                        bloc6Item4Texte
                        bloc7Titre
                        bloc7Texte
                        bloc7Item1Image {
                          sourceUrl
                          altText
                        }
                        bloc7Item1Titre
                        bloc7Item1Texte
                        bloc7Item1Icon1 {
                          sourceUrl
                          altText
                        }
                        bloc7Item1Icon2 {
                          sourceUrl
                          altText
                        }
                        bloc7Item2Image {
                          sourceUrl
                          altText
                        }
                        bloc7Item2Titre
                        bloc7Item2Texte
                        bloc7Item2Icon1 {
                          sourceUrl
                          altText
                        }
                        bloc7Item2Icon2 {
                          sourceUrl
                          altText
                        }
                        bloc7Item1Lien1
                        bloc7Item2Lien1
                        bloc7Item1Lien2
                        bloc7Item2Lien2
                        bloc8Titre
                        bloc8Texte
                        bloc7Item1Description
                        bloc7Item2Description
                        bloc8Visible
                    }
                    slug
                    language {
                        slug
                    }
                }
            }

            project : allWpPage(filter: {category: {name: {eq: "projets"}}}){
              nodes {
                  project {
                    titre
                    titreOngletDeLaPage
                    description
                    image{
                      sourceUrl
                      altText
                    }
                    bloc1Titre
                    bloc1Texte
                    bloc2Titre
                    bloc2Texte
                  }
                  slug
                  language {
                      slug
                  }
              }
            }

            resource : allWpPage(filter: {category: {name: {eq: "ressources"}}}){
              nodes{
                ressource{
                  bloc1Titre
                  titreOngletDeLaPage
                  bloc2Titre
                  bloc2Texte
                  bloc3Titre
                  bloc3Texte
                }
                slug
                language {
                    slug
                }
                popInFormulaire {
                  titre
                  texte
                  prenom
                  organisation
                  nom
                  email
                  bouton
                  boutonMobile
                  phraseRgpd
                }
              }
            }

            conditionsOfUse : allWpPage(filter: {category: {name: {eq: "conditions d’utilisations"}}}){
              nodes{
                conditionsMentions {
                  texte
                  titreOngletDeLaPage
                  titre
                  imageDeFond{
                    sourceUrl
                    altText
                  }
                }
                slug
                language {
                    slug
                }
              }
            }

            legalNotice : allWpPage(filter: {category: {name: {eq: "mentions légales"}}}){
              nodes{
                conditionsMentions {
                  texte
                  titreOngletDeLaPage
                  titre
                  imageDeFond{
                    sourceUrl
                    altText
                  }
                }
                slug
                language {
                    slug
                }
              }
            }

            recruitment : allWpPage(filter: {category: {name: {eq: "recrutement"}}}){
              nodes{
                recruitment {
                  titreOngletDeLaPage
                  titre
                  fieldGroupName
                  bloc4Titre
                  bloc3Titre
                  bloc3BoutonFermer
                  bloc3BoutonFermerMobile
                  bloc3BoutonOuvrir
                  bloc3BoutonOuvrirMobile
                  bloc2Video{
                    title
                    mediaItemUrl
                  }
                  bloc1Titre
                  bloc1Texte
                  imageDeFond {
                    sourceUrl
                    altText
                  }
                  miniatureVideo {
                    sourceUrl
                  }
                  nomDuPremierFiltre
                  nomDuDeuxiemeFiltre
                  nomDuTroisiemeFiltre
                }
                slug
                language {
                  slug
                }
              }
            }

            offers : allWpPost(filter: {categories: {nodes: {elemMatch: {name: {regex: "/(offres|offers)/"}}}}}) {
              nodes {
                offres {
                  bouton
                  categorie
                  lieu
                  sousTitre
                  texte
                  titre
                  typeDeContrat
                  boutonMobile
                }
                id
                contactPageRecrutement {
                  titreFormulaire
                  adresseEmail
                  ajouterUnCv
                  ajouterUneLettreDeMotivation
                  boutonEnvoyer
                  boutonMobileEnvoyer
                  linkedin
                  nom
                  prenom
                  telephone
                }
              }
            }
        }
    `);

    // Handle errors
    if (result.errors) {
        throw result.errors;
    }

    const homeTemplate = require.resolve("./src/templates/index.js");
    const contactTemplate = require.resolve("./src/templates/contact.js");
    const servicesTemplate = require.resolve("./src/templates/services.js");
    const ecosystemTemplate = require.resolve("./src/templates/ecosystem.js");
    const aProposTemplate = require.resolve("./src/templates/aPropos.js");
    const projectTemplate = require.resolve("./src/templates/project.js");
    const resourceTemplate = require.resolve("./src/templates/resources.js");
    const conditionsOfUseTemplate = require.resolve("./src/templates/conditionsOfUse.js");
    const legalNoticeTemplate = require.resolve("./src/templates/legalNotice.js");
    const recruitmentTemplate = require.resolve("./src/templates/recruitment.js");
    const offersTemplate = require.resolve("./src/templates/offers.js");

    result.data.home.nodes.forEach(node => {
        createPage({
            path: `/${node.language.slug}/`,
            component: homeTemplate,
            context: {
              dataHome: node,
            }
        })
    })

    result.data.contact.nodes.forEach(node => {
        createPage({
            path: `/${node.language.slug}/${node.slug}/`,
            component: contactTemplate,
            context: {
              dataContact: node,
            }
        })
    })

    result.data.services.nodes.forEach(node => {
        createPage({
            path: `/${node.language.slug}/${node.slug}/`,
            component: servicesTemplate,
            context: {
              dataServices: node,
            }
        })
    })

    result.data.ecosystem.nodes.forEach(node => {
        createPage({
            path: `/${node.language.slug}/${node.slug}/`,
            component: ecosystemTemplate,
            context: {
              dataEcosystem: node,
            }
        })
    })

    result.data.aPropos.nodes.forEach(node => {
        createPage({
            path: `/${node.language.slug}/${node.slug}/`,
            component: aProposTemplate,
            context: {
              dataAPropos: node,
            }
        })
    })

    result.data.project.nodes.forEach(node => {
        createPage({
            path: `/${node.language.slug}/${node.slug}/`,
            component: projectTemplate,
            context: {
              dataProject: node,
            }
        })
    })

    result.data.resource.nodes.forEach(node => {
        createPage({
            path: `/${node.language.slug}/${node.slug}/`,
            component: resourceTemplate,
            context: {
              dataResource: node,
            }
        })
    })

    result.data.conditionsOfUse.nodes.forEach(node => {
      createPage({
          path: `/${node.language.slug}/${node.slug}/`,
          component: conditionsOfUseTemplate,
          context: {
            dataConditionsOfUse: node,
          }
      })
    })

    result.data.legalNotice.nodes.forEach(node => {
      createPage({
          path: `/${node.language.slug}/${node.slug}/`,
          component: legalNoticeTemplate,
          context: {
            dataLegalNotice: node,
          }
      })
    })

    result.data.recruitment.nodes.forEach(node => {
      createPage({
          path: `/${node.language.slug}/${node.slug}/`,
          component: recruitmentTemplate,
          context: {
            dataRecruitment: node,
          }
      })

      result.data.offers.nodes.forEach(n => {
        createPage({
          path: `${node.language.slug}/${node.slug}/${n.id}`,
          component: offersTemplate,
          context: {
            dataOffers: n,
          }
        })
      })
    })
}

