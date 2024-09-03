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
var events_1 = require("../events");
var ContainerCard = function (_a) {
    var items = _a.items, lang = _a.lang, _b = _a.itemsPerPage, itemsPerPage = _b === void 0 ? 9 : _b, _c = _a.type, type = _c === void 0 ? "actuality" : _c, _d = _a.filtre, filtre = _d === void 0 ? "" : _d;
    var _e = react_1["default"].useState(0), nbItem = _e[0], setNbItem = _e[1];
    var _f = react_1["default"].useState(1), currentPage = _f[0], setCurrentPage = _f[1];
    var _g = react_1["default"].useState(0), maxPage = _g[0], setMaxPage = _g[1];
    var _h = react_1["default"].useState([]), itemsToShow = _h[0], setItemsToShow = _h[1];
    var _j = react_1["default"].useState([]), itemFilter = _j[0], setItemFilter = _j[1];
    var _k = react_1["default"].useState([]), tags = _k[0], setTags = _k[1];
    var _l = react_1["default"].useState(""), tagFilter = _l[0], setTagFilter = _l[1];
    var _m = react_1["default"].useState(""), sortItem = _m[0], setSortItem = _m[1];
    react_1.useEffect(function () {
        var filteredTags = [].concat(Array.from(new Set(items.flatMap(function (item) { var _a; return (_a = item.tags) === null || _a === void 0 ? void 0 : _a.map(function (tag) { return tag.name; }); }).filter(function (name) { return name !== undefined && name !== null; }))));
        setTags(filteredTags);
        setSortItem("newest");
        setTagFilter(filtre);
        setMaxPage(Math.ceil(itemFilter.length / itemsPerPage));
        filterItem();
    }, [items]);
    react_1.useEffect(function () {
        setItemsToShow(itemFilter.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [currentPage]);
    react_1.useEffect(function () {
        filterItem();
        setCurrentPage(1);
    }, [tagFilter]);
    var filterItem = function () {
        var itemsFiltered = [].concat(items);
        if (tagFilter === "") {
            setItemFilter([].concat(itemsFiltered));
        }
        else {
            var copieItems = [].concat(items);
            itemsFiltered = copieItems.filter(function (item) { var _a; return (_a = item.tags) === null || _a === void 0 ? void 0 : _a.map(function (tag) { return tag.name; }).includes(tagFilter); });
            setItemFilter(__spreadArrays(itemsFiltered));
        }
        var item = sort(itemsFiltered);
        setItemsToShow(item.slice(0, itemsPerPage));
        setMaxPage(Math.ceil(item.length / itemsPerPage));
        setNbItem(item.length);
    };
    react_1.useEffect(function () {
        var item = sort(itemFilter);
        setItemsToShow(item.slice(0, itemsPerPage));
        setMaxPage(Math.ceil(item.length / itemsPerPage));
        setNbItem(item.length);
    }, [itemFilter]);
    react_1.useEffect(function () {
        var item = sort(itemFilter);
        setItemsToShow(item.slice(0, itemsPerPage));
        setMaxPage(Math.ceil(item.length / itemsPerPage));
        setNbItem(item.length);
        setCurrentPage(1);
    }, [sortItem]);
    var sort = function (item) {
        if (sortItem === "newest") {
            return (__spreadArrays(item).sort(function (a, b) { return new Date(b.date) - new Date(a.date); }));
        }
        else if (sortItem === "oldest") {
            return (__spreadArrays(item).sort(function (a, b) { return new Date(a.date) - new Date(b.date); }));
        }
        else {
            return (__spreadArrays(item).sort(function (a, b) { return new Date(b.date) - new Date(a.date); }));
        }
    };
    console.log(itemsToShow);
    return (react_1["default"].createElement("div", { className: "container" },
        type !== "events" && (react_1["default"].createElement("div", { className: 'header' },
            react_1["default"].createElement("p", { className: 'indicator' },
                nbItem,
                " ",
                lang == "fr" ? "articles" : "news"),
            react_1["default"].createElement("div", { className: 'container-selector' },
                react_1["default"].createElement("select", { name: "", id: "", value: tagFilter, onChange: function (e) { return setTagFilter(e.target.value); } },
                    react_1["default"].createElement("option", { value: "" }, lang == "fr" ? "Tous les articles" : "All news"),
                    tags.map(function (tag, index) { return (react_1["default"].createElement("option", { key: index, value: tag }, tag)); })),
                react_1["default"].createElement("select", { name: "", id: "", onChange: function (e) { return setSortItem(e.target.value); } },
                    react_1["default"].createElement("option", { value: "" }, lang == "fr" ? "Trier par" : "Sort by"),
                    react_1["default"].createElement("option", { value: "newest" }, lang == "fr" ? "Plus récent" : "more recent"),
                    react_1["default"].createElement("option", { value: "oldest" }, lang == "fr" ? "Plus ancien" : "older"))))),
        react_1["default"].createElement("div", { className: 'container-card' },
            react_1["default"].createElement("div", { className: 'cards' }, type === "events" ? (react_1["default"].createElement(react_1["default"].Fragment, null, itemsToShow === null || itemsToShow === void 0 ? void 0 : itemsToShow.map(function (event, index) { return (react_1["default"].createElement(events_1["default"], { img: event.events.image.sourceUrl, day: event.events.jour, month: event.events.mois, text: event.events.texte, hours: event.events.heures, adress: event.events.adresse, alt: event.events.image.altText, isSpeaker: event.events.speaker, lien: event.events.lienCliquable, enLigne: event.events.enLigne, lang: lang, key: index })); }))) : (react_1["default"].createElement(react_1["default"].Fragment, null, itemsToShow.map(function (item, index) { return (react_1["default"].createElement(card_1["default"], { key: index, title: item.titre, description: item.texte, tags: item.tags, files: item.fichier, linkText: item.bouton, image: item.image, lang: lang, time: item.duree, date: item.date, auteur: item.auteur, slug: item.slug, type: type })); })))),
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
