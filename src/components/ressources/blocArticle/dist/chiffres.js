"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../../scss/components/ressources/blocArticle/bloc.scss");
var Chiffres = function (_a) {
    var data = _a.data;
    var renderItem = function (data, index) {
        return (react_1["default"].createElement(react_1["default"].Fragment, null, data["item" + index] && (react_1["default"].createElement("div", { className: 'chiffre' },
            react_1["default"].createElement("div", { className: 'index' }, index),
            react_1["default"].createElement("div", { className: 'content' },
                react_1["default"].createElement("div", { className: 'description', dangerouslySetInnerHTML: { __html: data["item" + index] } }))))));
    };
    var renderImages = function () {
        var blocks = [];
        for (var i = 1; i < 11; i++) {
            blocks.push(renderItem(data, i));
        }
        return blocks;
    };
    return (react_1["default"].createElement("div", { className: 'chiffres-container' }, renderImages()));
};
exports["default"] = Chiffres;
