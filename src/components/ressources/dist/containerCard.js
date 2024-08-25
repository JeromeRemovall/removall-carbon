"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
require("../../scss/components/ressources/containerCard.scss");
var card_1 = require("./card");
var ContainerCard = function (_a) {
    var items = _a.items, lang = _a.lang, _b = _a.itemsPerPage, itemsPerPage = _b === void 0 ? 9 : _b, _c = _a.type, type = _c === void 0 ? "actuality" : _c;
    var _d = react_1["default"].useState(0), nbItem = _d[0], setNbItem = _d[1];
    var _e = react_1["default"].useState(1), currentPage = _e[0], setCurrentPage = _e[1];
    var _f = react_1["default"].useState(0), maxPage = _f[0], setMaxPage = _f[1];
    var _g = react_1["default"].useState(items.slice(0, itemsPerPage)), itemsToShow = _g[0], setItemsToShow = _g[1];
    var _h = react_1["default"].useState([].concat(items)), itemFilter = _h[0], setItemFilter = _h[1];
    var _j = react_1["default"].useState([]), tags = _j[0], setTags = _j[1];
    var _k = react_1["default"].useState(""), tagFilter = _k[0], setTagFilter = _k[1];
    var _l = react_1["default"].useState(""), sortItem = _l[0], setSortItem = _l[1];
    react_1.useEffect(function () {
        var filteredTags = [].concat(Array.from(new Set(items.flatMap(function (item) { var _a; return (_a = item.tags) === null || _a === void 0 ? void 0 : _a.map(function (tag) { return tag.name; }); }).filter(function (name) { return name !== undefined && name !== null; }))));
        setTags(filteredTags);
        setSortItem("newest");
        setNbItem(itemFilter.length);
        setMaxPage(Math.ceil(itemFilter.length / itemsPerPage));
    }, [items]);
    react_1.useEffect(function () {
        setItemsToShow(itemFilter.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [currentPage]);
    react_1.useEffect(function () {
        setItemsToShow(itemFilter.slice(0, itemsPerPage));
        setMaxPage(Math.ceil(itemFilter.length / itemsPerPage));
    }, [itemFilter]);
    react_1.useEffect(function () {
        if (tagFilter === "") {
            var copieItems = [].concat(items);
            setItemFilter([].concat(copieItems));
            sort(copieItems);
        }
        else {
            var copieItems = [].concat(items);
            setItemFilter(copieItems.filter(function (item) { var _a; return (_a = item.tags) === null || _a === void 0 ? void 0 : _a.map(function (tag) { return tag.name; }).includes(tagFilter); }));
        }
        setCurrentPage(1);
    }, [tagFilter]);
    react_1.useEffect(function () {
        sort(itemFilter);
        setCurrentPage(1);
    }, [sortItem]);
    var sort = function (items) {
        if (sortItem === "newest") {
            setItemFilter(__spreadArrays(items).sort(function (a, b) { return new Date(b.date) - new Date(a.date); }));
        }
        else if (sortItem === "oldest") {
            setItemFilter(__spreadArrays(items).sort(function (a, b) { return new Date(a.date) - new Date(b.date); }));
        }
        else {
            setItemFilter(__spreadArrays(items).sort(function (a, b) { return new Date(b.date) - new Date(a.date); }));
        }
    };
    return (react_1["default"].createElement("div", { className: "container" },
        react_1["default"].createElement("div", { className: 'header' },
            react_1["default"].createElement("p", { className: 'indicator' },
                nbItem,
                " ",
                lang == "fr" ? "articles" : "news"),
            react_1["default"].createElement("div", { className: 'container-selector' },
                react_1["default"].createElement("select", { name: "", id: "", onChange: function (e) { return setTagFilter(e.target.value); } },
                    react_1["default"].createElement("option", { value: "" }, lang == "fr" ? "Tous les articles" : "All news"),
                    tags.map(function (tag, index) { return (react_1["default"].createElement("option", { key: index, value: tag }, tag)); })),
                react_1["default"].createElement("select", { name: "", id: "", onChange: function (e) { return setSortItem(e.target.value); } },
                    react_1["default"].createElement("option", { value: "" }, lang == "fr" ? "Trier par" : "Sort by"),
                    react_1["default"].createElement("option", { value: "newest" }, lang == "fr" ? "Plus récent" : "more recent"),
                    react_1["default"].createElement("option", { value: "oldest" }, lang == "fr" ? "Plus ancien" : "older")))),
        react_1["default"].createElement("div", { className: 'container-card' },
            react_1["default"].createElement("div", { className: 'cards' }, itemsToShow.map(function (item, index) { return (react_1["default"].createElement(card_1["default"], { key: index, title: item.titre, description: item.texte, tags: item.tags, files: item.fichier, linkText: item.bouton, image: item.image, lang: lang, time: item.duree, date: item.date, auteur: item.auteur, slug: item.slug, type: type })); })),
            react_1["default"].createElement("div", { className: 'pagination' },
                react_1["default"].createElement("button", { className: "btn-page " + (currentPage == 1 ? "active" : ""), onClick: function () { return setCurrentPage(1); } }, "1"),
                currentPage - 2 > 0 && (react_1["default"].createElement("button", { className: "btn-page", disabled: true }, "...")),
                currentPage > 2 && (react_1["default"].createElement("button", { className: "btn-page " + (currentPage === 2 ? "active" : ""), onClick: function () { return setCurrentPage(currentPage - 1); } }, currentPage - 1)),
                currentPage > 1 && currentPage != maxPage && (react_1["default"].createElement("button", { className: "btn-page active", onClick: function () { return setCurrentPage(currentPage); } }, currentPage)),
                currentPage < maxPage - 1 && (react_1["default"].createElement("button", { className: "btn-page", onClick: function () { return setCurrentPage(currentPage + 1); } }, currentPage + 1)),
                currentPage + 2 < maxPage && (react_1["default"].createElement("button", { className: "btn-page", disabled: true }, "...")),
                maxPage > 1 && (react_1["default"].createElement("button", { className: "btn-page " + (currentPage == maxPage ? "active" : ""), onClick: function () { return setCurrentPage(maxPage); } }, maxPage))))));
};
exports["default"] = ContainerCard;
