"use strict";

var FilterWarningsPlugin = require("webpack-filter-warnings-plugin"); // const { default: Recruitment } = require("./src/templates/test");


var _require = require("./src/utils/queryNews"),
    BLOC_FIELDS = _require.BLOC_FIELDS;

exports.onCreateWebpackConfig = function (_ref) {
  var stage = _ref.stage,
      loaders = _ref.loaders,
      actions = _ref.actions;

  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      plugins: [new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/
      })],
      module: {
        rules: [{
          test: /datamaps/,
          use: loaders["null"]()
        }]
      }
    });
  }
};

exports.createPages = function _callee(_ref2) {
  var graphql, actions, createRedirect, createPage, result, homeTemplate, contactTemplate, servicesTemplate, ecosystemTemplate, aProposTemplate, projectTemplate, conditionsOfUseTemplate, legalNoticeTemplate, recruitmentTemplate, offersTemplate, rseTemplate, plasticBiodivTemplate, articlesTemplate;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          graphql = _ref2.graphql, actions = _ref2.actions;
          createRedirect = actions.createRedirect;
          createRedirect({
            fromPath: "/",
            toPath: "/en/",
            isPermanent: true
          });
          createPage = actions.createPage;
          _context.next = 6;
          return regeneratorRuntime.awrap(graphql("\n    query MyQuery {\n      plasticBiodiv: allWpPage(\n        filter: {\n          category: {\n            name: {\n              eq: \"Plastique & Biodiversit\xE9\"\n            }\n          }\n        }\n      ) {\n        nodes {\n          PlasticBiodiv {\n            descriptionPage\n            texteContact\n            titrePage\n            texteBoutonContact\n            lienContactUs\n            backgroundTitrePage {\n              altText\n              sourceUrl\n            }\n            logoPlastic {\n              altText\n              sourceUrl\n            }\n            logoCarbon {\n              altText\n              sourceUrl\n            }\n            groupeCarbon1 {\n              titre\n              source\n              subtitle\n              texteArgument1\n              texteArgument2\n              texteArgument3\n              texteArgument4\n              imageArgument1 {\n                altText\n                sourceUrl\n              }\n              imageArgument2 {\n                altText\n                sourceUrl\n              }\n              imageArgument3 {\n                altText\n                sourceUrl\n              }\n              imageArgument4 {\n                altText\n                sourceUrl\n              }\n            }\n            groupeCarbon2 {\n              texte2\n              titre\n              texte1\n              icon2 {\n                altText\n                sourceUrl\n              }\n              image1 {\n                altText\n                sourceUrl\n              }\n              image2 {\n                altText\n                sourceUrl\n              }\n            }\n            groupeCarbon3 {\n              description\n              titre\n              credit\n              listeCredit\n              step1\n              step1ToStep2\n              step2\n              step2ToStep1\n              step3\n              step3ToStep2\n              step2ToStep3\n              imageStep1 {\n                altText\n                sourceUrl\n              }\n              imageStep2 {\n                altText\n                sourceUrl\n              }\n              imageStep3 {\n                altText\n                sourceUrl\n              }\n            }\n            groupeCarbon4 {\n              titre\n              titreService1\n              titreService2\n              descriptionService2\n              descriptionService1\n            }\n            groupeCarbon5 {\n              titre\n              description\n            }\n            groupeCarbon6 {\n              boutonContact\n              texte1\n              texte2\n              texte3\n              texteContact\n              titre\n              image {\n                altText\n                sourceUrl\n              }\n              icon1 {\n                altText\n                sourceUrl\n              }\n              icon2 {\n                altText\n                sourceUrl\n              }\n              icon3 {\n                altText\n                sourceUrl\n              }\n              lienBoutonContact\n            }\n            groupeCarbon7 {\n              titre\n              description\n              partenaires {\n                logoClientOuPartenaires {\n                  fieldGroupName\n                  lienVersSite\n                  logo {\n                    altText\n                    sourceUrl\n                  }\n                }\n              }\n            }\n            groupePlastics1 {\n              titre\n              source\n              subtitle\n              texteArgument1\n              texteArgument2\n              texteArgument3\n              texteArgument4\n              imageArgument1 {\n                altText\n                sourceUrl\n              }\n              imageArgument2 {\n                altText\n                sourceUrl\n              }\n              imageArgument3 {\n                altText\n                sourceUrl\n              }\n              imageArgument4 {\n                altText\n                sourceUrl\n              }\n            }\n            groupePlastics2 {\n              texte2\n              titre\n              texte1\n              icon2 {\n                altText\n                sourceUrl\n              }\n              image1 {\n                altText\n                sourceUrl\n              }\n              image2 {\n                altText\n                sourceUrl\n              }\n            }\n            groupePlastics3 {\n              description\n              titre\n              credit\n              listeCredit\n              step1\n              step1ToStep2\n              step2\n              step2ToStep1\n              step3\n              step3ToStep2\n              step2ToStep3\n              imageStep1 {\n                altText\n                sourceUrl\n              }\n              imageStep2 {\n                altText\n                sourceUrl\n              }\n              imageStep3 {\n                altText\n                sourceUrl\n              }\n            }\n            groupePlastics4 {\n              titre\n              titreService1\n              titreService2\n              descriptionService2\n              descriptionService1\n            }\n            groupePlastics5 {\n              titre\n              description\n            }\n            groupePlastics6 {\n              boutonContact\n              texte1\n              texte2\n              texte3\n              texteContact\n              titre\n              image {\n                altText\n                sourceUrl\n              }\n              icon1 {\n                altText\n                sourceUrl\n              }\n              icon2 {\n                altText\n                sourceUrl\n              }\n              icon3 {\n                altText\n                sourceUrl\n              }\n              lienBoutonContact\n            }\n            groupePlastics7 {\n              titre\n              description\n              partenaires {\n                logoClientOuPartenaires {\n                  fieldGroupName\n                  lienVersSite\n                  logo {\n                    altText\n                    sourceUrl\n                  }\n                }\n              }\n            }\n          }\n          slug\n          language {\n            slug\n          }\n        }\n      }\n      home: allWpPage(\n        filter: {\n          category: { name: { eq: \"accueil\" } }\n        }\n      ) {\n        nodes {\n          home {\n            titreOngletDeLaPage\n            titre\n            description\n            bloc1Titre\n            bloc1Texte\n            bloc1Bouton\n            bloc1BoutonMobile\n            bloc1BoutonLien\n            bloc2Image {\n              sourceUrl\n              altText\n            }\n            bloc2Titre\n            bloc2Texte\n            bloc2Bouton\n            bloc2BoutonMobile\n            bloc2BoutonLien\n            bloc3Titre\n            bloc3item1Image {\n              sourceUrl\n              altText\n            }\n            bloc3item1SousTitre\n            bloc3item1Texte\n            bloc3item2Image {\n              sourceUrl\n              altText\n            }\n            bloc3item2SousTitre\n            bloc3item2Texte\n            bloc3item3Image {\n              sourceUrl\n              altText\n            }\n            bloc3item3SousTitre\n            bloc3item3Texte\n            bloc3item4Image {\n              sourceUrl\n              altText\n            }\n            bloc3item4SousTitre\n            bloc3item4Texte\n            bloc3Bouton\n            bloc3BoutonMobile\n            bloc3BoutonLien\n            bloc4Titre\n            bloc4Texte\n            bloc4item1Image {\n              sourceUrl\n              altText\n            }\n            bloc4item1SousTitre\n            bloc4item1Texte\n            bloc4item2Image {\n              sourceUrl\n              altText\n            }\n            bloc4item2SousTitre\n            bloc4item2Texte\n            bloc4item3Image {\n              sourceUrl\n              altText\n            }\n            bloc4item3SousTitre\n            bloc4item3Texte\n            bloc4Bouton\n            bloc4BoutonMobile\n            bloc4BoutonLien\n            bloc5Titre\n            bloc5Texte\n            bloc5Bouton\n            bloc5BoutonMobile\n            bloc5BoutonLien\n            bloc6Titre\n            bloc6item1SousTitre\n            bloc6item2SousTitre\n chiffre1 {\n          prDirection\n          text\n          prefixe\n          value\n        }\n           chiffre2 {\n          prDirection\n          text\n          prefixe\n          value\n        }\n           chiffre3 {\n          prDirection\n          text\n          prefixe\n          value\n        }\n           chiffre4 {\n          prDirection\n          text\n          prefixe\n          value\n        }\n           chiffre5 {\n          prDirection\n          text\n          prefixe\n          value\n        }\n           chiffre6 {\n          prDirection\n          text\n          prefixe\n          value\n        }\n           chiffre7 {\n          prDirection\n          text\n          prefixe\n          value\n        }\n          }\n          language {\n            slug\n          }\n        }\n      }\n\n      contact: allWpPage(\n        filter: {\n          category: { name: { eq: \"contact\" } }\n        }\n      ) {\n        nodes {\n          contact {\n            titreOngletDeLaPage\n            adresse\n            description\n            email\n            fieldGroupName\n            lienFacebook\n            lienInstagram\n            lienLinkedin\n            lienTwitter\n            lienYoutube\n            sousTitre\n            telephone\n            titre\n            iconAdresse {\n              sourceUrl\n              altText\n            }\n            iconEmail {\n              sourceUrl\n              altText\n            }\n            iconFacebook {\n              sourceUrl\n              altText\n            }\n            iconInstagram {\n              sourceUrl\n              altText\n            }\n            iconLinkedin {\n              sourceUrl\n              altText\n            }\n            iconTelephone {\n              sourceUrl\n              altText\n            }\n            iconTwitter {\n              sourceUrl\n              altText\n            }\n            iconYoutube {\n              sourceUrl\n              altText\n            }\n            imageDeFond {\n              sourceUrl\n              altText\n            }\n          }\n          contactFormulaire {\n            adresseEmail\n            message\n            phraseRgpd\n            nom\n            organisation\n            prenom\n            tel\n            bouton\n            boutonMobile\n          }\n          slug\n          language {\n            slug\n          }\n        }\n      }\n\n      services: allWpPage(\n        filter: {\n          category: { name: { eq: \"services\" } }\n        }\n      ) {\n        nodes {\n          services {\n            titre\n            titreOngletDeLaPage\n            description\n            imageDeFond {\n              sourceUrl\n              altText\n            }\n            bloc1Titre\n            bloc1Texte\n            bloc1Image {\n              sourceUrl\n              altText\n            }\n            bloc2Titre\n            bloc2Texte\n            bloc2Image {\n              sourceUrl\n              altText\n            }\n            bloc3Titre\n            bloc3Texte\n            bloc3Image {\n              sourceUrl\n              altText\n            }\n            bloc4Titre\n            bloc4Texte\n            bloc4Image {\n              sourceUrl\n              altText\n            }\n            itemMenu1\n            itemMenu2\n            itemMenu3\n            itemMenu4\n          }\n          slug\n          language {\n            slug\n          }\n        }\n      }\n\n      ecosystem: allWpPage(\n        filter: {\n          category: { name: { eq: \"\xE9cosyst\xE8me\" } }\n        }\n      ) {\n        nodes {\n          ecosysteme {\n            titre\n            titreOngletDeLaPage\n            description\n            imageDeFond {\n              sourceUrl\n              altText\n            }\n            bloc1Titre\n            bloc1Texte\n            bloc2Titre\n            bloc2Texte\n            phrasePageVide\n          }\n          slug\n          language {\n            slug\n          }\n        }\n      }\n\n      aPropos: allWpPage(\n        filter: {\n          category: { name: { eq: \"\xE0 propos\" } }\n        }\n      ) {\n        nodes {\n          APropos {\n            titre\n            titreOngletDeLaPage\n            description\n            imageDeFond {\n              sourceUrl\n              altText\n            }\n            bloc1Titre\n            bloc1Texte\n            bloc2Image {\n              sourceUrl\n              altText\n            }\n            bloc2Texte1\n            bloc2Texte2\n            bloc2Titre1\n            bloc2Titre2\n            bloc3Image {\n              sourceUrl\n              altText\n            }\n            bloc3Titre\n            bloc3Texte\n            bloc4Titre\n            bloc4Texte\n            bloc4Item1Image {\n              sourceUrl\n              altText\n            }\n            bloc4Item1Titre\n            bloc4Item1Texte\n            bloc4Item2Image {\n              sourceUrl\n              altText\n            }\n            bloc4Item2Titre\n            bloc4Item2Texte\n            bloc4Item3Image {\n              sourceUrl\n              altText\n            }\n            bloc4Item3Titre\n            bloc4Item3Texte\n            bloc5Titre\n            bloc5Texte\n            bloc5Carte1Titre\n            bloc5Carte1Number\n            bloc5Carte2Titre\n            bloc5Carte2Number\n            bloc5Carte3Titre\n            bloc5Carte3Number\n            bloc5Carte4Titre\n            bloc5Carte4Number\n            bloc6Titre\n            bloc6Item1Icon {\n              sourceUrl\n              altText\n            }\n            bloc6Item1Titre\n            bloc6Item1Texte\n            bloc6Item2Icon {\n              sourceUrl\n              altText\n            }\n            bloc6Item2Titre\n            bloc6Item2Texte\n            bloc6Item3Icon {\n              sourceUrl\n              altText\n            }\n            bloc6Item3Texte\n            bloc6Item3Titre\n            bloc6Item4Icon {\n              sourceUrl\n              altText\n            }\n            bloc6Item4Titre\n            bloc6Item4Texte\n            bloc7Titre\n            bloc7Texte\n            bloc7Item1Image {\n              sourceUrl\n              altText\n            }\n            bloc7Item1Titre\n            bloc7Item1Texte\n            bloc7Item1Icon1 {\n              sourceUrl\n              altText\n            }\n            bloc7Item1Icon2 {\n              sourceUrl\n              altText\n            }\n            bloc7Item2Image {\n              sourceUrl\n              altText\n            }\n            bloc7Item2Titre\n            bloc7Item2Texte\n            bloc7Item2Icon1 {\n              sourceUrl\n              altText\n            }\n            bloc7Item2Icon2 {\n              sourceUrl\n              altText\n            }\n            bloc7Item1Lien1\n            bloc7Item2Lien1\n            bloc7Item1Lien2\n            bloc7Item2Lien2\n            bloc8Titre\n            bloc8Texte\n            bloc7Item1Description\n            bloc7Item2Description\n            bloc8Visible\n            imageRse {\n              sourceUrl\n              altText\n            }\n            texteLienVersLaPageRse\n            texteRse\n            titreRse\n          }\n          slug\n          language {\n            slug\n          }\n        }\n      }\n\n      project: allWpPage(\n        filter: {\n          category: { name: { eq: \"projets\" } }\n        }\n      ) {\n        nodes {\n          project {\n            titre\n            titreOngletDeLaPage\n            description\n            image {\n              sourceUrl\n              altText\n            }\n            bloc1Titre\n            bloc1Texte\n            bloc2Titre\n            bloc2Texte\n            legendeMap\n          }\n          slug\n          language {\n            slug\n          }\n        }\n      }\n\n      resource: allWpPage(\n        filter: {\n          category: { name: { eq: \"ressources\" } }\n        }\n      ) {\n        nodes {\n          ressource {\n            bloc1Titre\n            titreOngletDeLaPage\n            bloc2Titre\n            bloc2Texte\n            bloc3Titre\n            bloc3Texte\n          }\n          slug\n          language {\n            slug\n          }\n          popInFormulaire {\n            titre\n            texte\n            prenom\n            organisation\n            nom\n            email\n            bouton\n            boutonMobile\n            phraseRgpd\n          }\n        }\n      }\n\n      conditionsOfUse: allWpPage(\n        filter: {\n          category: {\n            name: {\n              eq: \"conditions d\u2019utilisations\"\n            }\n          }\n        }\n      ) {\n        nodes {\n          conditionsMentions {\n            texte\n            titreOngletDeLaPage\n            titre\n            imageDeFond {\n              sourceUrl\n              altText\n            }\n          }\n          slug\n          language {\n            slug\n          }\n        }\n      }\n\n      legalNotice: allWpPage(\n        filter: {\n          category: {\n            name: { eq: \"mentions l\xE9gales\" }\n          }\n        }\n      ) {\n        nodes {\n          conditionsMentions {\n            texte\n            titreOngletDeLaPage\n            titre\n            imageDeFond {\n              sourceUrl\n              altText\n            }\n          }\n          slug\n          language {\n            slug\n          }\n        }\n      }\n\n      recruitment: allWpPage(\n        filter: {\n          category: {\n            name: { eq: \"recrutement\" }\n          }\n        }\n      ) {\n        nodes {\n          recruitment {\n            titreOngletDeLaPage\n            titre\n            fieldGroupName\n            bloc4Titre\n            bloc3Titre\n            bloc3BoutonFermer\n            bloc3BoutonFermerMobile\n            bloc3BoutonOuvrir\n            bloc3BoutonOuvrirMobile\n            bloc2Video {\n              title\n              mediaItemUrl\n            }\n            bloc1Titre\n            bloc1Texte\n            imageDeFond {\n              sourceUrl\n              altText\n            }\n            miniatureVideo {\n              sourceUrl\n            }\n            nomDuPremierFiltre\n            nomDuDeuxiemeFiltre\n            nomDuTroisiemeFiltre\n            rhSectionDescription\n            rhSectionTitre\n            rhSectionBlocTexte\n            rhSectionData {\n              data1\n              data2\n              data3\n              data4\n            }\n            rhSectionTexteCharteDeParite\n            rhSectionFile {\n              mediaItemUrl\n            }\n            rhSectionVisuel {\n              title\n              mediaItemUrl\n            }\n          }\n          slug\n          language {\n            slug\n          }\n        }\n      }\n\n      offers: allWpPost(\n        filter: {\n          categories: {\n            nodes: {\n              elemMatch: {\n                name: {\n                  regex: \"/(offres|offers)/\"\n                }\n              }\n            }\n          }\n        }\n      ) {\n        nodes {\n          offres {\n            bouton\n            categorie\n            lieu\n            sousTitre\n            texte\n            titre\n            typeDeContrat\n            boutonMobile\n          }\n          id\n          contactPageRecrutement {\n            titreFormulaire\n            adresseEmail\n            ajouterUnCv\n            ajouterUneLettreDeMotivation\n            boutonEnvoyer\n            boutonMobileEnvoyer\n            linkedin\n            nom\n            prenom\n            telephone\n          }\n        }\n      }\n\n      rse: allWpPage(\n        filter: {\n          category: { name: { eq: \"rse\" } }\n        }\n      ) {\n        nodes {\n          slug\n          language {\n            slug\n          }\n          rse {\n            titrePage\n            titreOngletDeLaPage\n            titreBloc1\n            titreBloc2\n            imageHeaderPage {\n              altText\n              mediaItemUrl\n            }\n            bloc1 {\n              texte\n              image {\n                altText\n                mediaItemUrl\n              }\n            }\n            bloc2 {\n              texte\n              image {\n                altText\n                mediaItemUrl\n              }\n            }\n            bloc3 {\n              texte\n              image {\n                altText\n                mediaItemUrl\n              }\n            }\n            bloc4 {\n              texte\n              image {\n                altText\n                mediaItemUrl\n              }\n            }\n            premierElement {\n              description\n              titre\n              icon {\n                altText\n                mediaItemUrl\n              }\n            }\n            secondElement {\n              description\n              titre\n              icon {\n                altText\n                mediaItemUrl\n              }\n            }\n            troisiemeElement {\n              description\n              titre\n              icon {\n                altText\n                mediaItemUrl\n              }\n            }\n            quatriemeElement {\n              description\n              titre\n              icon {\n                altText\n                mediaItemUrl\n              }\n            }\n          }\n        }\n      }\n    news: allWpPost(\n      filter: {categories: {nodes: {elemMatch: {name: {eq: \"news\"}}}}}\n    ) \n      {\n        edges {\n           node {\n            id\n            articles {\n              titre\n              sousTitre\n              duree\n              photoMiseEnAvant {\n                altText\n                sourceUrl\n              }\n              tags {\n                name\n              }\n              auteur {\n                Auteur {\n                  fonction\n                  photo {\n                    altText\n                    sourceUrl\n                  }\n                }\n                name\n              }\n              articlesSimilaires {\n                ... on WpPost {\n                  news {\n                    image {\n                      altText\n                      sourceUrl\n                      date\n                    }\n                    texteActualite\n                    titre\n                  }\n                  articles {\n                    auteur {\n                      name\n                    }\n                    photoMiseEnAvant {\n                      altText\n                      sourceUrl\n                    }\n                    titre\n                    tags {\n                      name\n                    }\n                    sousTitre\n                    duree\n                  }\n                  slug\n                  date\n                }\n              }\n              bloc1 {\n                ".concat(BLOC_FIELDS, "\n              }\n              bloc2 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc3 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc4 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc5 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc6 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc7 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc8 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc9 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc10 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc11 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc12 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc13 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc14 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc15 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc16 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc17 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc18 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc19 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc20 {\n                ").concat(BLOC_FIELDS, "\n              }\n              typeBloc1\n              typeBloc2\n              typeBloc3\n              typeBloc4\n              typeBloc5\n              typeBloc6\n              typeBloc7\n              typeBloc8\n              typeBloc9\n              typeBloc10\n              typeBloc11\n              typeBloc12\n              typeBloc13\n              typeBloc14\n              typeBloc15\n              typeBloc16\n              typeBloc17\n              typeBloc18\n              typeBloc19\n              typeBloc20\n            }\n            date\n            slug\n            language {\n              slug\n            }\n          }\n        }\n      }\n    actue: allWpPost(\n      filter: {categories: {nodes: {elemMatch: {name: {eq: \"actualit\xE9s\"}}}}}\n    ) \n      {\n        edges {\n           node {\n            id\n            articles {\n              titre\n              sousTitre\n              duree\n              photoMiseEnAvant {\n                altText\n                sourceUrl\n              }\n              tags {\n                name\n              }\n              auteur {\n                Auteur {\n                  fonction\n                  photo {\n                    altText\n                    sourceUrl\n                  }\n                }\n                name\n              }\n              articlesSimilaires {\n                ... on WpPost {\n                  news {\n                    image {\n                      altText\n                      sourceUrl\n                      date\n                    }\n                    texteActualite\n                    titre\n                  }\n                  articles {\n                    auteur {\n                      name\n                    }\n                    photoMiseEnAvant {\n                      altText\n                      sourceUrl\n                    }\n                    titre\n                    tags {\n                      name\n                    }\n                    sousTitre\n                    duree\n                  }\n                  slug\n                  date\n                }\n              }\n              bloc1 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc2 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc3 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc4 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc5 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc6 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc7 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc8 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc9 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc10 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc11 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc12 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc13 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc14 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc15 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc16 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc17 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc18 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc19 {\n                ").concat(BLOC_FIELDS, "\n              }\n              bloc20 {\n                ").concat(BLOC_FIELDS, "\n              }\n              typeBloc1\n              typeBloc2\n              typeBloc3\n              typeBloc4\n              typeBloc5\n              typeBloc6\n              typeBloc7\n              typeBloc8\n              typeBloc9\n              typeBloc10\n              typeBloc11\n              typeBloc12\n              typeBloc13\n              typeBloc14\n              typeBloc15\n              typeBloc16\n              typeBloc17\n              typeBloc18\n              typeBloc19\n              typeBloc20\n            }\n            date\n            slug\n            language {\n              slug\n            }\n          }\n        }\n      }\n    }\n  ")));

        case 6:
          result = _context.sent;

          if (!result.errors) {
            _context.next = 9;
            break;
          }

          throw result.errors;

        case 9:
          homeTemplate = require.resolve("./src/templates/index.js");
          contactTemplate = require.resolve("./src/templates/contact.js");
          servicesTemplate = require.resolve("./src/templates/services.js");
          ecosystemTemplate = require.resolve("./src/templates/ecosystem.js");
          aProposTemplate = require.resolve("./src/templates/aPropos.js");
          projectTemplate = require.resolve("./src/templates/project.js");
          conditionsOfUseTemplate = require.resolve("./src/templates/conditionsOfUse.js");
          legalNoticeTemplate = require.resolve("./src/templates/legalNotice.js");
          recruitmentTemplate = require.resolve("./src/templates/recruitment.js");
          offersTemplate = require.resolve("./src/templates/offers.js");
          rseTemplate = require.resolve("./src/templates/rse.js");
          plasticBiodivTemplate = require.resolve("./src/templates/bioAndPlastics.js");
          articlesTemplate = require.resolve("./src/templates/articles.js");
          result.data.home.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/"),
              component: homeTemplate,
              context: {
                dataHome: node
              }
            });
          });
          result.data.contact.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/").concat(node.slug, "/"),
              component: contactTemplate,
              context: {
                dataContact: node
              }
            });
          });
          result.data.services.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/").concat(node.slug, "/"),
              component: servicesTemplate,
              context: {
                dataServices: node
              }
            });
          });
          result.data.ecosystem.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/").concat(node.slug, "/"),
              component: ecosystemTemplate,
              context: {
                dataEcosystem: node
              }
            });
          });
          result.data.aPropos.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/").concat(node.slug, "/"),
              component: aProposTemplate,
              context: {
                dataAPropos: node
              }
            });
          });
          result.data.project.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/").concat(node.slug, "/"),
              component: projectTemplate,
              context: {
                dataProject: node
              }
            });
          });
          result.data.resource.nodes.forEach(function (node) {
            for (var i = 1; i <= 3; i++) {
              var slug = "bloc".concat(i, "Titre");
              createPage({
                path: "/".concat(node.language.slug, "/").concat(node.ressource[slug]),
                component: require.resolve("./src/templates/".concat(slug, ".js")),
                context: {
                  dataResource: node
                }
              });
            }
          });
          result.data.conditionsOfUse.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/").concat(node.slug, "/"),
              component: conditionsOfUseTemplate,
              context: {
                dataConditionsOfUse: node
              }
            });
          });
          result.data.rse.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/").concat(node.slug, "/"),
              component: rseTemplate,
              context: {
                dataRse: node
              }
            });
          });
          result.data.plasticBiodiv.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/").concat(node.slug, "/"),
              component: plasticBiodivTemplate,
              context: {
                dataPB: node
              }
            });
          });
          result.data.legalNotice.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/").concat(node.slug, "/"),
              component: legalNoticeTemplate,
              context: {
                dataLegalNotice: node
              }
            });
          });
          result.data.recruitment.nodes.forEach(function (node) {
            createPage({
              path: "/".concat(node.language.slug, "/").concat(node.slug, "/"),
              component: recruitmentTemplate,
              context: {
                dataRecruitment: node
              }
            });
            result.data.offers.nodes.forEach(function (n) {
              createPage({
                path: "".concat(node.language.slug, "/").concat(node.slug, "/").concat(n.id),
                component: offersTemplate,
                context: {
                  dataOffers: n
                }
              });
            });
          });
          result.data.news.edges.forEach(function (node) {
            createPage({
              path: "".concat(node.node.language.slug, "/").concat(node.node.slug),
              component: articlesTemplate,
              context: {
                dataArticle: node.node
              }
            });
          });
          result.data.actue.edges.forEach(function (node) {
            createPage({
              path: "".concat(node.node.language.slug, "/").concat(node.node.slug),
              component: articlesTemplate,
              context: {
                dataArticle: node.node
              }
            });
          });

        case 36:
        case "end":
          return _context.stop();
      }
    }
  });
};