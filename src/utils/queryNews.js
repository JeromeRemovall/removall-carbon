const BLOC_FIELDS = `
	paragraphe
            titres {
              contenu
              tailleDuTexte
            }
            chiffre {
              item2
              item3
              item1
              item4
            }
            complexe {
              legende
              lienCta
              texte
              texteCta
              titre
              photo {
              node {
                altText
                sourceUrl
              }
              }
            }
            galeriePhoto {
              legende
              photo2 {
                node {
                altText
                sourceUrl
              }
              }
              photo3 {
                node {
                altText
                sourceUrl
              }
              }
              photo4 {
               node {
                altText
                sourceUrl
              }
              }
              photo5 {
                node {
                altText
                sourceUrl
              }
              }
              photo6 {
                node {
                altText
                sourceUrl
              }
              }
              photo1 {
                node {
                altText
                sourceUrl
              }
              }
            }
            icons {
              item1
              icon1 {
               node {
                altText
                sourceUrl
              }
              }
              item2
              icon2 {
               node {
                altText
                sourceUrl
              }
              }
              item3
              icon3 {
                node {
                altText
                sourceUrl
              }
              }
              item4
              icon4 {
                node {
                altText
                sourceUrl
              }
              }
            }
            photo {
            isTwo
              legendePhoto1
              legendePhoto2
              photo1 {
               node {
                altText
                sourceUrl
              }
              }
              photoFullSize
              photo2 {
                node {
                altText
                sourceUrl
              }
              }
            }
`;

module.exports = {
  BLOC_FIELDS,
};
