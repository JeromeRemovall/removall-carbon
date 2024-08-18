"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../../scss/components/ressources/blocArticle/bloc.scss");
var Photos = function (_a) {
    var data = _a.data;
    var renderImage = function (image, index) {
        return (react_1["default"].createElement(react_1["default"].Fragment, null, data["photo" + index] && (react_1["default"].createElement("div", { className: "image " + (image.photoFullSize ? 'full' : '') },
            react_1["default"].createElement("img", { src: image["photo" + index].sourceUrl, alt: image["photo" + index].altText }),
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
