"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../../scss/components/ressources/blocArticle/bloc.scss");
var Complex = function (_a) {
    var data = _a.data;
    return (react_1["default"].createElement("div", { className: 'complexe-container' },
        react_1["default"].createElement("div", { className: "title", dangerouslySetInnerHTML: { __html: data.titre } }),
        react_1["default"].createElement("div", { className: 'complexe' },
            react_1["default"].createElement("div", { className: "content" },
                react_1["default"].createElement("div", { className: "description", dangerouslySetInnerHTML: { __html: data.texte } }),
                react_1["default"].createElement("a", { className: 'cta', href: data.lienCta }, data.texteCta)),
            react_1["default"].createElement("div", { className: 'illustration' },
                react_1["default"].createElement("img", { src: data.photo.sourceUrl, alt: data.altText }),
                react_1["default"].createElement("p", { className: 'legende' }, data.legende)),
            react_1["default"].createElement("a", { className: 'cta mobile', href: data.lienCta }, data.texteCta))));
};
exports["default"] = Complex;
