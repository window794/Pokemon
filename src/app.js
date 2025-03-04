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
// 全ポケモンデータ（検索時に使う用）
var allPokemon = [];
// データ取得関数
function fetchPokedex() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('./pokedex.json')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('データの読み込みに失敗しました');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// 一覧表示関数
function displayPokedex(pokedex) {
    var container = document.getElementById('pokedex-container');
    if (!container) {
        console.error('❌ pokedex-containerが見つかりません！');
        return;
    }
    container.innerHTML = '';
    pokedex.forEach(function (pokemon) {
        var div = document.createElement('div');
        div.classList.add('pokemon-card');
        pokemon.types.forEach(function (type) {
            if (type === 'くさ')
                div.classList.add('grass');
            if (type === 'ほのお')
                div.classList.add('fire');
            if (type === 'みず')
                div.classList.add('water');
        });
        // 説明文の改行を<br>に変換
        var descriptionWithBreaks = pokemon.description.replace(/\n/g, '<br>');
        div.innerHTML = "\n            <h3>No.".concat(pokemon.id, " ").concat(pokemon.name, "</h3>\n            <div class=\"image-wrapper\">\n                <img src=\"").concat(pokemon.image, "\" alt=\"").concat(pokemon.name, "\">\n            </div>\n            <p>\u30BF\u30A4\u30D7: ").concat(pokemon.types.join(', '), "</p>\n            <p>\u9AD8\u3055: ").concat(pokemon.height, "</p>\n            <p>\u91CD\u3055: ").concat(pokemon.weight, "</p>\n            <p>").concat(descriptionWithBreaks, "</p>\n        ");
        container.appendChild(div);
    });
}
// 検索処理（フィルタリング）
function filterPokedex(keyword) {
    var lowerKeyword = keyword.toLowerCase();
    var filtered = allPokemon.filter(function (pokemon) {
        var lowerName = pokemon.name.toLowerCase();
        var lowerTypes = pokemon.types.map(function (type) { return type.toLowerCase(); });
        return lowerName.includes(lowerKeyword) || lowerTypes.some(function (type) { return type.includes(lowerKeyword); });
    });
    displayPokedex(filtered);
}
// 検索ボックス設定
function setupSearchBox() {
    var searchBox = document.getElementById('searchBox');
    if (!searchBox) {
        console.error('❌ searchBoxが見つかりません！');
        return;
    }
    searchBox.addEventListener('input', function () {
        filterPokedex(searchBox.value);
    });
}
// 初期表示処理
fetchPokedex()
    .then(function (pokedex) {
    allPokemon = pokedex;
    displayPokedex(pokedex);
    setupSearchBox();
})
    .catch(function (error) {
    console.error('❌ データ取得エラー:', error);
});
