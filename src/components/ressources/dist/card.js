"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../../scss/components/ressources/card.scss");
var gatsby_1 = require("gatsby");
var Card = function (_a) {
    var title = _a.title, description = _a.description, tags = _a.tags, files = _a.files, linkText = _a.linkText, image = _a.image, time = _a.time, type = _a.type, date = _a.date, auteur = _a.auteur, slug = _a.slug, lang = _a.lang;
    return (react_1["default"].createElement(react_1["default"].Fragment, null, slug ? (react_1["default"].createElement(gatsby_1.Link, { to: "/" + lang + "/" + slug },
        react_1["default"].createElement("div", { className: "card" },
            react_1["default"].createElement("div", { className: 'image-container' },
                react_1["default"].createElement("img", { src: image === null || image === void 0 ? void 0 : image.sourceUrl, alt: image === null || image === void 0 ? void 0 : image.altText })),
            react_1["default"].createElement("div", { className: 'content-container' },
                tags && time && (react_1["default"].createElement("div", { className: "tags" },
                    tags && tags.map(function (tag, index) { return (react_1["default"].createElement("p", { className: 'tag', key: index }, tag.name)); }),
                    !tags && (react_1["default"].createElement(react_1["default"].Fragment, null)),
                    time && (react_1["default"].createElement("p", { className: 'time' },
                        time,
                        " MIN")))),
                title && (react_1["default"].createElement("p", { className: 'title' }, title)),
                description && (react_1["default"].createElement("div", { className: 'description', dangerouslySetInnerHTML: { __html: description } })),
                linkText && (react_1["default"].createElement("a", { className: 'link', href: files === null || files === void 0 ? void 0 : files.mediaItemUrl, target: "_blank", download: files === null || files === void 0 ? void 0 : files.title }, linkText)),
                react_1["default"].createElement("div", { className: 'footer' },
                    react_1["default"].createElement("p", { className: 'date' }, new Date(date).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })),
                    auteur && (react_1["default"].createElement("p", { className: 'author' },
                        lang == "fr" ? 'Par' : "By",
                        " ",
                        auteur.name))))))) : (react_1["default"].createElement("a", { className: 'link', href: files === null || files === void 0 ? void 0 : files.mediaItemUrl, target: "_blank", download: files === null || files === void 0 ? void 0 : files.title },
        react_1["default"].createElement("div", { className: "card" },
            react_1["default"].createElement("div", { className: 'image-container' },
                react_1["default"].createElement("img", { src: image.sourceUrl, alt: image.altText })),
            react_1["default"].createElement("div", { className: 'content-container' },
                tags && time && (react_1["default"].createElement("div", { className: "tags" },
                    tags && tags.map(function (tag, index) { return (react_1["default"].createElement("p", { className: 'tag', key: index }, tag.name)); }),
                    !tags && (react_1["default"].createElement(react_1["default"].Fragment, null)),
                    time && (react_1["default"].createElement("p", { className: 'time' },
                        time,
                        " MIN")))),
                react_1["default"].createElement("p", { className: 'title' }, title),
                react_1["default"].createElement("div", { className: 'description', dangerouslySetInnerHTML: { __html: description } }),
                linkText && type == "ressource" && (react_1["default"].createElement("a", { className: 'link', href: files === null || files === void 0 ? void 0 : files.mediaItemUrl, target: "_blank", download: files === null || files === void 0 ? void 0 : files.title }, linkText)),
                react_1["default"].createElement("div", { className: 'footer' },
                    react_1["default"].createElement("p", { className: 'date' }, new Date(date).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })),
                    auteur && (react_1["default"].createElement("p", { className: 'author' },
                        lang == "fr" ? 'Par' : "By",
                        " ",
                        auteur.name)))))))));
};
exports["default"] = Card;
