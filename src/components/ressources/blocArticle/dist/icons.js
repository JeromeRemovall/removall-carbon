"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../../scss/components/ressources/blocArticle/bloc.scss");
var Icons = function (_a) {
    var data = _a.data;
    var renderItem = function (data, index) {
        var _a, _b;
        return (react_1["default"].createElement(react_1["default"].Fragment, null, data["item" + index] && (react_1["default"].createElement("div", { className: "icons" },
            react_1["default"].createElement("div", { className: "index" },
                react_1["default"].createElement("img", { src: (_a = data["icon" + index]) === null || _a === void 0 ? void 0 : _a.sourceUrl, alt: (_b = data["icon" + index]) === null || _b === void 0 ? void 0 : _b.altText })),
            react_1["default"].createElement("div", { className: "content" },
                react_1["default"].createElement("div", { className: "description", dangerouslySetInnerHTML: {
                        __html: data["item" + index]
                    } }))))));
    };
    var renderImages = function () {
        var blocks = [];
        for (var i = 1; i < 5; i++) {
            blocks.push(renderItem(data, i));
        }
        return blocks;
    };
    return (react_1["default"].createElement("div", { className: "icons-container" }, renderImages()));
};
exports["default"] = Icons;
