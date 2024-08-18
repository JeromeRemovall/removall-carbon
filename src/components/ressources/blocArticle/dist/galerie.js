"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../../scss/components/ressources/blocArticle/bloc.scss");
var Galerie = function (_a) {
    var data = _a.data;
    var renderImage = function (image, index) {
        return (react_1["default"].createElement(react_1["default"].Fragment, null, data["photo" + index] && (react_1["default"].createElement("div", { className: 'row' },
            react_1["default"].createElement("div", { className: 'image' },
                react_1["default"].createElement("img", { src: image["photo" + index].sourceUrl, alt: image["photo" + index].altText })),
            data["photo" + (index + 1)] && (react_1["default"].createElement("div", { className: 'image' },
                react_1["default"].createElement("img", { src: image["photo" + (index + 1)].sourceUrl, alt: image["photo" + (index + 1)].altText })))))));
    };
    var renderImages = function () {
        var blocks = [];
        for (var i = 1; i < 7; i += 2) {
            blocks.push(renderImage(data, i));
        }
        return blocks;
    };
    return (react_1["default"].createElement("div", { className: 'galerie-container' },
        react_1["default"].createElement("div", { className: "images" }, renderImages()),
        react_1["default"].createElement("p", { className: 'legende' }, data.legende)));
};
exports["default"] = Galerie;
