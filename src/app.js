var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var allPokemon = [];
var showFavoritesOnly = false;
// データ取得
function fetchPokedex() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('./pokedex.json')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('データの読み込みに失敗しました');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    data.forEach(function (pokemon) { return pokemon.favorite = false; }); // 初期は全部未お気に入り
                    return [2 /*return*/, data];
            }
        });
    });
}
// 一覧表示
function displayPokedex(pokedex) {
    var container = document.getElementById('pokedex-container');
    if (!container)
        return;
    container.innerHTML = '';
    pokedex.forEach(function (pokemon) {
        var _a;
        var div = document.createElement('div');
        div.classList.add('pokemon-card');
        var firstType = pokemon.types[0];
        if (firstType === 'くさ')
            div.classList.add('grass');
        if (firstType === 'ほのお')
            div.classList.add('fire');
        if (firstType === 'みず')
            div.classList.add('water');
        if (firstType === 'どく')
            div.classList.add('poison');
        if (firstType === 'むし')
            div.classList.add('bug');
        var star = pokemon.favorite ? '★' : '☆';
        var descriptionWithBreaks = pokemon.description.replace(/\n/g, '<br>');
        div.innerHTML = "\n            <h3><span class=\"favorite\">".concat(star, "</span> No.").concat(pokemon.id, " ").concat(pokemon.name, "</h3>\n            <div class=\"image-wrapper\">\n                <img src=\"").concat(pokemon.image, "\" alt=\"").concat(pokemon.name, "\">\n            </div>\n            <p>\u30BF\u30A4\u30D7: ").concat(pokemon.types.join(', '), "</p>\n            <p>\u9AD8\u3055: ").concat(pokemon.height, "</p>\n            <p>\u91CD\u3055: ").concat(pokemon.weight, "</p>\n            <p>").concat(descriptionWithBreaks, "</p>\n        ");
        (_a = div.querySelector('.favorite')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
            e.stopPropagation(); // クリックが詳細表示に伝わらないように
            pokemon.favorite = !pokemon.favorite;
            displayPokedex(getFilteredPokemon());
        });
        div.addEventListener('click', function () { return showPokemonDetail(pokemon); });
        container.appendChild(div);
    });
}
// 詳細表示
function showPokemonDetail(pokemon) {
    var container = document.getElementById('pokedex-container');
    if (!container)
        return;
    var descriptionWithBreaks = pokemon.description.replace(/\n/g, '<br>');
    container.innerHTML = "\n        <div class=\"pokemon-detail\">\n            <h2>No.".concat(pokemon.id, " ").concat(pokemon.name, "</h2>\n            <div class=\"image-wrapper\">\n                <img src=\"").concat(pokemon.image, "\" alt=\"").concat(pokemon.name, "\">\n            </div>\n            <p><strong>\u30BF\u30A4\u30D7:</strong> ").concat(pokemon.types.join(', '), "</p>\n            <p><strong>\u9AD8\u3055:</strong> ").concat(pokemon.height, "</p>\n            <p><strong>\u91CD\u3055:</strong> ").concat(pokemon.weight, "</p>\n            <p>").concat(descriptionWithBreaks, "</p>\n            <button onclick=\"showPokedexList()\">\u4E00\u89A7\u306B\u623B\u308B</button>\n        </div>\n    ");
}
// お気に入りフィルタ
function getFilteredPokemon() {
    if (showFavoritesOnly) {
        return allPokemon.filter(function (p) { return p.favorite; });
    }
    return allPokemon;
}
// 一覧に戻る
function showPokedexList() {
    displayPokedex(getFilteredPokemon());
}
// 検索
function filterPokedex(keyword) {
    var lowerKeyword = keyword.toLowerCase();
    var filtered = allPokemon.filter(function (pokemon) {
        return (pokemon.name.toLowerCase().includes(lowerKeyword) ||
            pokemon.types.some(function (type) { return type.toLowerCase().includes(lowerKeyword); })) &&
            (!showFavoritesOnly || pokemon.favorite);
    });
    displayPokedex(filtered);
}
// イベント登録
function setupSearchBox() {
    var searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', function () { return filterPokedex(searchBox.value); });
    var favoriteFilter = document.getElementById('favoriteFilter');
    favoriteFilter.addEventListener('change', function () {
        showFavoritesOnly = favoriteFilter.checked;
        displayPokedex(getFilteredPokemon());
    });
}
// 初期表示
fetchPokedex()
    .then(function (pokedex) {
    allPokemon = pokedex;
    displayPokedex(pokedex);
    setupSearchBox();
})
    .catch(console.error);
