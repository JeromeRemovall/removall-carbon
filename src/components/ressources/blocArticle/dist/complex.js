"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../../scss/components/ressources/blocArticle/bloc.scss");
var Complex = function (_a) {
    var _b, _c;
    var data = _a.data;
    return (react_1["default"].createElement("div", { className: 'complexe-container' },
        react_1["default"].createElement("div", { className: "title", dangerouslySetInnerHTML: { __html: data.titre } }),
        react_1["default"].createElement("div", { className: 'complexe' },
            react_1["default"].createElement("div", { className: "content" },
                react_1["default"].createElement("div", { className: "description", dangerouslySetInnerHTML: { __html: data.texte } }),
                react_1["default"].createElement("a", { className: 'cta', href: data.lienCta }, data.texteCta)),
            data.photo && (react_1["default"].createElement("div", { className: 'illustration' },
                react_1["default"].createElement("img", { src: (_b = data.photo) === null || _b === void 0 ? void 0 : _b.sourceUrl, alt: (_c = data.photo) === null || _c === void 0 ? void 0 : _c.altText }),
                react_1["default"].createElement("p", { className: 'legende' }, data.legende))),
            data.lienCta && (react_1["default"].createElement("a", { className: 'cta mobile', href: data.lienCta }, data.texteCta)))));
};
exports["default"] = Complex;
