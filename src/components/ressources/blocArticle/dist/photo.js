"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../../scss/components/ressources/blocArticle/bloc.scss");
var Photos = function (_a) {
    var data = _a.data;
    var renderImage = function (image, index) {
        var _a, _b;
        return (react_1["default"].createElement(react_1["default"].Fragment, null, data["photo" + index] && (react_1["default"].createElement("div", { className: "image " + (image.photoFullSize ? 'full' : '') },
            react_1["default"].createElement("img", { src: (_a = image["photo" + index]) === null || _a === void 0 ? void 0 : _a.sourceUrl, alt: (_b = image["photo" + index]) === null || _b === void 0 ? void 0 : _b.altText }),
            react_1["default"].createElement("p", { className: 'legende' }, image["legendePhoto" + index])))));
    };
    var renderImages = function () {
        var index = data.isTwo ? 3 : 2;
        var blocks = [];
        for (var i = 1; i < index; i++) {
            blocks.push(renderImage(data, i));
        }
        return blocks;
    };
    return (react_1["default"].createElement("div", { className: 'photos-container' }, renderImages()));
};
exports["default"] = Photos;
