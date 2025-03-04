type Pokemon = {
    id: number;
    name: string;
    types: string[];
    height: string;
    weight: string;
    description: string;
    image: string;
    favorite: boolean;  // ★お気に入りフラグ追加
};

let allPokemon: Pokemon[] = [];
let showFavoritesOnly = false;

// データ取得
async function fetchPokedex(): Promise<Pokemon[]> {
    const response = await fetch('./pokedex.json');
    if (!response.ok) {
        throw new Error('データの読み込みに失敗しました');
    }
    const data: Pokemon[] = await response.json();
    data.forEach(pokemon => pokemon.favorite = false);  // 初期は全部未お気に入り
    return data;
}

// 一覧表示
function displayPokedex(pokedex: Pokemon[]) {
    const container = document.getElementById('pokedex-container');
    if (!container) return;

    container.innerHTML = '';

    pokedex.forEach(pokemon => {
        const div = document.createElement('div');
        div.classList.add('pokemon-card');

        const firstType = pokemon.types[0];
        if (firstType === 'くさ') div.classList.add('grass');
        if (firstType === 'ほのお') div.classList.add('fire');
        if (firstType === 'みず') div.classList.add('water');
        if (firstType === 'どく') div.classList.add('poison');
        if (firstType === 'むし') div.classList.add('bug');

        const star = pokemon.favorite ? '★' : '☆';
        const descriptionWithBreaks = pokemon.description.replace(/\n/g, '<br>');

        div.innerHTML = `
            <h3><span class="favorite">${star}</span> No.${pokemon.id} ${pokemon.name}</h3>
            <div class="image-wrapper">
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
            <p>タイプ: ${pokemon.types.join(', ')}</p>
            <p>高さ: ${pokemon.height}</p>
            <p>重さ: ${pokemon.weight}</p>
            <p>${descriptionWithBreaks}</p>
        `;

        div.querySelector('.favorite')?.addEventListener('click', (e) => {
            e.stopPropagation();  // クリックが詳細表示に伝わらないように
            pokemon.favorite = !pokemon.favorite;
            displayPokedex(getFilteredPokemon());
        });

        div.addEventListener('click', () => showPokemonDetail(pokemon));

        container.appendChild(div);
    });
}

// 詳細表示
function showPokemonDetail(pokemon: Pokemon) {
    const container = document.getElementById('pokedex-container');
    if (!container) return;

    const descriptionWithBreaks = pokemon.description.replace(/\n/g, '<br>');

    container.innerHTML = `
        <div class="pokemon-detail">
            <h2>No.${pokemon.id} ${pokemon.name}</h2>
            <div class="image-wrapper">
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
            <p><strong>タイプ:</strong> ${pokemon.types.join(', ')}</p>
            <p><strong>高さ:</strong> ${pokemon.height}</p>
            <p><strong>重さ:</strong> ${pokemon.weight}</p>
            <p>${descriptionWithBreaks}</p>
            <button onclick="showPokedexList()">一覧に戻る</button>
        </div>
    `;
}

// お気に入りフィルタ
function getFilteredPokemon(): Pokemon[] {
    if (showFavoritesOnly) {
        return allPokemon.filter(p => p.favorite);
    }
    return allPokemon;
}

// 一覧に戻る
function showPokedexList() {
    displayPokedex(getFilteredPokemon());
}

// 検索
function filterPokedex(keyword: string) {
    const lowerKeyword = keyword.toLowerCase();
    const filtered = allPokemon.filter(pokemon => {
        return (pokemon.name.toLowerCase().includes(lowerKeyword) ||
            pokemon.types.some(type => type.toLowerCase().includes(lowerKeyword))) &&
            (!showFavoritesOnly || pokemon.favorite);
    });

    displayPokedex(filtered);
}

// イベント登録
function setupSearchBox() {
    const searchBox = document.getElementById('searchBox') as HTMLInputElement;
    searchBox.addEventListener('input', () => filterPokedex(searchBox.value));
    const favoriteFilter = document.getElementById('favoriteFilter') as HTMLInputElement;
    favoriteFilter.addEventListener('change', () => {
        showFavoritesOnly = favoriteFilter.checked;
        displayPokedex(getFilteredPokemon());
    });
}

// 初期表示
fetchPokedex()
    .then(pokedex => {
        allPokemon = pokedex;
        displayPokedex(pokedex);
        setupSearchBox();
    })
    .catch(console.error);