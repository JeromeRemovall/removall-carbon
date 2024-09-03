"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../../scss/components/ressources/blocArticle/bloc.scss");
var Titre = function (_a) {
    var data = _a.data;
    return (react_1["default"].createElement(react_1["default"].Fragment, null, (data === null || data === void 0 ? void 0 : data.tailleDuTexte) === "H1" ? (react_1["default"].createElement("h2", { className: 'titre', dangerouslySetInnerHTML: { __html: data.contenu } })) : (data === null || data === void 0 ? void 0 : data.tailleDuTexte) === "H2" ? (react_1["default"].createElement("h3", { className: 'titre', dangerouslySetInnerHTML: { __html: data.contenu } })) : (react_1["default"].createElement("h4", { className: 'titre', dangerouslySetInnerHTML: { __html: data.contenu } }))));
};
exports["default"] = Titre;
