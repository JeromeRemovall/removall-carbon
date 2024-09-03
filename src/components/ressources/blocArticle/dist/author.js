"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../../scss/components/ressources/blocArticle/bloc.scss");
var Author = function (_a) {
    var author = _a.author, lang = _a.lang;
    return (react_1["default"].createElement("div", { className: 'signature-container' },
        lang == "fr" ? (react_1["default"].createElement("p", null, "Article \u00E9crit par : ")) : (react_1["default"].createElement("p", null, "Article written by : ")),
        react_1["default"].createElement("div", { className: 'signature' },
            react_1["default"].createElement("img", { src: author === null || author === void 0 ? void 0 : author.Auteur.photo.sourceUrl, alt: author === null || author === void 0 ? void 0 : author.Auteur.photo.altText, className: "avatar" }),
            react_1["default"].createElement("div", { className: 'content-container' },
                react_1["default"].createElement("p", { className: 'name' }, author === null || author === void 0 ? void 0 : author.name),
                react_1["default"].createElement("p", { className: 'fonction' }, author === null || author === void 0 ? void 0 : author.Auteur.fonction)))));
};
exports["default"] = Author;
