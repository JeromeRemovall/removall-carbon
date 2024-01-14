import React, {
  useEffect,
  useState,
} from "react";
import * as JsSearch from "js-search";
import { graphql, useStaticQuery } from "gatsby";

import "../scss/components/search.scss";
import { Search, X } from "react-feather";

const query = graphql`
  query {
    frNews: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: {
              name: { eq: "actualités" }
            }
          }
        }
      }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        news {
          texte
          titre
          image {
            sourceUrl
            altText
          }
          bouton
          boutonMobile
          boutonLien
        }
        date
      }
    }
    enNews: allWpPost(
      filter: {
        categories: {
          nodes: {
            elemMatch: { name: { eq: "news" } }
          }
        }
      }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        news {
          texte
          titre
          legende
          image {
            sourceUrl
            altText
          }
          bouton
          boutonMobile
          boutonLien
        }
      }
    }
  }
`;

function SearchElement({ quit }) {
  const [url, setUrl] = useState("");
  const [metaLang, setMetaLang] = useState("");
  const [dataNews, setDataNews] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchQuery, setSearchQuery] =
    useState("");
  const [searchResults, setSearchResults] =
    useState([]);
  const [loading, setLoading] = useState(false);
  const data = useStaticQuery(query);

  useEffect(() => {
    function getLanguage() {
      if (
        window.location.href.match("/fr$") ||
        window.location.href.match("/fr/")
      ) {
        setDataNews(data.frNews.nodes);
        setUrl(
          `${process.env.GATSBY_RESOURCES_FORM_FR}`
        );
        setMetaLang("fr");
      } else if (
        window.location.href.match("/en$") ||
        window.location.href.match("/en/")
      ) {
        setDataNews(data.enNews.nodes);
        setUrl(
          `${process.env.GATSBY_RESOURCES_FORM_EN}`
        );
        setMetaLang("en");
      }
    }
    getLanguage();
    rebuildIndex();
  }, [data.frNews.nodes, data.enNews.nodes, url]);

  /**
   * rebuilds the overall index based on the options
   */
  const rebuildIndex = () => {
    const dataToSearch = new JsSearch.Search([
      "news",
      "titre",
    ]);

    /**
     * defines an indexing strategy for the data
     * more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy =
      new JsSearch.PrefixIndexStrategy();
    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer =
      new JsSearch.LowerCaseSanitizer();
    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex =
      new JsSearch.TfIdfSearchIndex("titre");

    dataToSearch.addIndex(["news", "titre"]); // sets the index attribute for the data

    dataToSearch.addDocuments(dataNews); // adds the data to be searched
    setSearch(dataToSearch);
    setLoading(false);
  };

  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  const searchData = (e) => {
    const queryResult = search.search(
      e.target.value
    );
    setSearchQuery(e.target.value);
    setSearchResults(queryResult);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const queryResults =
    searchQuery === "" ? [] : searchResults;

  return (
    <div className={`search-container`}>
      <div className="content">
        <form
          onSubmit={handleSubmit}
          className="form-container"
        >
          <input
            id="Search"
            value={searchQuery}
            onChange={searchData}
            placeholder={
              metaLang == "fr"
                ? "Rechercher un article ..."
                : "Search an article ..."
            }
          />
          <a onClick={quit}>
            <X />
          </a>
        </form>
        <div className="result_search-container">
          {queryResults.map((item) => (
            <div className="item_search">
              <div className="item_illu">
                <img
                  src={item.news.image?.sourceUrl}
                  alt={item.news.image?.altText}
                />
              </div>
              <div className="item_info">
                <p className="title">
                  {item.news.titre}
                </p>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: item.news.texte,
                  }}
                ></div>
                {item.news.boutonLien != " " ? (
                  <a
                    className="button-primary"
                    href={item.news.boutonLien}
                  >
                    <hr />
                    {item.news.bouton}
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SearchElement;
