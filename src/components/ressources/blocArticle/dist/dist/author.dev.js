"use strict";

exports.__esModule = true;

var react_1 = require("react");

require("../../../scss/components/ressources/blocArticle/bloc.scss");

var Author = function Author(_a) {
  var _b, _c;

  var author = _a.author,
      lang = _a.lang;
  return react_1["default"].createElement("div", {
    className: "signature-container"
  }, lang == "fr" ? react_1["default"].createElement("p", null, "Article \xE9crit par : ") : react_1["default"].createElement("p", null, "Article written by : "), react_1["default"].createElement("div", {
    className: "signature"
  }, react_1["default"].createElement("img", {
    src: (_b = author === null || author === void 0 ? void 0 : author.Auteur.photo) === null || _b === void 0 ? void 0 : _b.node.sourceUrl,
    alt: (_c = author === null || author === void 0 ? void 0 : author.Auteur.photo) === null || _c === void 0 ? void 0 : _c.node.altText,
    className: "avatar"
  }), react_1["default"].createElement("div", {
    className: "content-container"
  }, react_1["default"].createElement("p", {
    className: "name"
  }, author === null || author === void 0 ? void 0 : author.name), react_1["default"].createElement("p", {
    className: "fonction"
  }, author === null || author === void 0 ? void 0 : author.Auteur.fonction))));
};

exports["default"] = Author;