"use strict";

exports.__esModule = true;

var react_1 = require("react");

require("../../../scss/components/ressources/blocArticle/bloc.scss");

var Galerie = function Galerie(_a) {
  var data = _a.data;

  var renderImage = function renderImage(image, index) {
    var _a, _b, _c, _d;

    return react_1["default"].createElement(react_1["default"].Fragment, null, data["photo" + index] && react_1["default"].createElement("div", {
      className: "row"
    }, react_1["default"].createElement("div", {
      className: "image"
    }, react_1["default"].createElement("img", {
      src: (_a = image["photo" + index]) === null || _a === void 0 ? void 0 : _a.node.sourceUrl,
      alt: (_b = image["photo" + index]) === null || _b === void 0 ? void 0 : _b.node.altText
    })), data["photo" + (index + 1)] && react_1["default"].createElement("div", {
      className: "image"
    }, react_1["default"].createElement("img", {
      src: (_c = image["photo" + (index + 1)]) === null || _c === void 0 ? void 0 : _c.node.sourceUrl,
      alt: (_d = image["photo" + (index + 1)]) === null || _d === void 0 ? void 0 : _d.node.altText
    }))));
  };

  var renderImages = function renderImages() {
    var blocks = [];

    for (var i = 1; i < 7; i += 2) {
      blocks.push(renderImage(data, i));
    }

    return blocks;
  };

  return react_1["default"].createElement("div", {
    className: "galerie-container"
  }, react_1["default"].createElement("div", {
    className: "images"
  }, renderImages()), react_1["default"].createElement("p", {
    className: "legende"
  }, data.legende));
};

exports["default"] = Galerie;