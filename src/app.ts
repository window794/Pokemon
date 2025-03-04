// ポケモン型定義
type Pokemon = {
    id: number;
    name: string;
    types: string[];
    height: string;
    weight: string;
    description: string;
    image: string;
};

// 全ポケモンデータ（検索時に使う用）
let allPokemon: Pokemon[] = [];

// データ取得関数
async function fetchPokedex(): Promise<Pokemon[]> {
    const response = await fetch('./pokedex.json');
    if (!response.ok) {
        throw new Error('データの読み込みに失敗しました');
    }
    return await response.json();
}

// 一覧表示関数
function displayPokedex(pokedex: Pokemon[]) {
    const container = document.getElementById('pokedex-container');
    if (!container) {
        console.error('❌ pokedex-containerが見つかりません！');
        return;
    }

    container.innerHTML = '';

    pokedex.forEach(pokemon => {
        const div = document.createElement('div');
        div.classList.add('pokemon-card');

        pokemon.types.forEach(type => {
            if (type === 'くさ') div.classList.add('grass');
            if (type === 'ほのお') div.classList.add('fire');
            if (type === 'みず') div.classList.add('water');
        });
        

        // 説明文の改行を<br>に変換
        const descriptionWithBreaks = pokemon.description.replace(/\n/g, '<br>');

        div.innerHTML = `
            <h3>No.${pokemon.id} ${pokemon.name}</h3>
            <div class="image-wrapper">
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
            <p>タイプ: ${pokemon.types.join(', ')}</p>
            <p>高さ: ${pokemon.height}</p>
            <p>重さ: ${pokemon.weight}</p>
            <p>${descriptionWithBreaks}</p>
        `;

        container.appendChild(div);
    });
}

// 検索処理（フィルタリング）
function filterPokedex(keyword: string) {
    const lowerKeyword = keyword.toLowerCase();

    const filtered = allPokemon.filter(pokemon => {
        const lowerName = pokemon.name.toLowerCase();
        const lowerTypes = pokemon.types.map(type => type.toLowerCase());

        return lowerName.includes(lowerKeyword) || lowerTypes.some(type => type.includes(lowerKeyword));
    });

    displayPokedex(filtered);
}

// 検索ボックス設定
function setupSearchBox() {
    const searchBox = document.getElementById('searchBox') as HTMLInputElement;

    if (!searchBox) {
        console.error('❌ searchBoxが見つかりません！');
        return;
    }

    searchBox.addEventListener('input', () => {
        filterPokedex(searchBox.value);
    });
}

// 初期表示処理
fetchPokedex()
    .then(pokedex => {
        allPokemon = pokedex;
        displayPokedex(pokedex);
        setupSearchBox();
    })
    .catch(error => {
        console.error('❌ データ取得エラー:', error);
    });