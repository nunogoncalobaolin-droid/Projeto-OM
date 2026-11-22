/* =====================================================================
   Rumo Socioeconómico — Procura automática de fotografias
   ---------------------------------------------------------------------
   Usado pela página inicial (destinos e banner) e pela app da Europa.

   Para cada universidade/cidade tenta, por esta ordem:
     1) a foto principal do artigo da Wikipédia (em inglês);
     2) a melhor fotografia que aparece dentro do artigo;
     3) uma pesquisa no Wikimedia Commons (banco de imagens livres).
   Rejeita logótipos, brasões, mapas, desenhos e fotos ao alto.
   As fotos encontradas ficam guardadas no navegador (localStorage)
   para a página abrir mais depressa da próxima vez.
   ===================================================================== */

const NAO_E_FOTO = /logo|seal|coat[_ ]of|arms|crest|emblem|shield|badge|flag|map|locator|signature|portrait|icon|wordmark|diagram|chart|graph|stamp|medal|svg|banner|poster|plaque|symbol|insignia|location|montage|collage|\.png|\.gif|\.tif/i;
const BOA_FOTO = /building|campus|hall|main|library|college|universit|facade|façade|aerial|quad|court|tower|house|palace|centre|center|entrance|gate|view|panorama|square|canal|skyline|street|cathedral|bridge|river|old town|city/i;

const API_WIKI = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*";
const API_COMMONS = "https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*";

const cacheFotos = {};

/* ---------- Imagem de reserva com as iniciais ---------- */
function imagemReserva(nome) {
    const iniciais = String(nome).replace(/\(.*?\)/g, "").split(/[\s–-]+/)
        .filter(p => p.length > 1 && !["de","of","the","and","del","di","du","in","la"].includes(p.toLowerCase()) && p[0] === p[0].toUpperCase())
        .slice(0, 3).map(p => p[0]).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3f3f46"/><stop offset="1" stop-color="#09090b"/></linearGradient></defs>
        <rect width="800" height="400" fill="url(#g)"/>
        <text x="400" y="235" font-family="Segoe UI, Arial" font-size="120" font-weight="900"
        fill="#cbd5e1" fill-opacity="0.85" text-anchor="middle">${iniciais}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* ---------- Pontuação de uma imagem (quanto maior, melhor) ---------- */
function pontuarImagem(titulo, largura, altura, mime) {
    if (mime && !/jpeg|webp/.test(mime)) return -1;          // só fotografias
    if (NAO_E_FOTO.test(titulo)) return -1;                   // nada de logótipos, mapas...
    if (largura < 640 || largura < altura * 1.05) return -1;  // só fotos horizontais e grandes
    let pontos = 1;
    if (BOA_FOTO.test(titulo)) pontos += 3;
    if (largura >= 1600) pontos += 1;
    return pontos;
}

function melhorDeLista(paginas) {
    let melhor = null, melhorPontos = 0;
    paginas.forEach(p => {
        const info = p.imageinfo && p.imageinfo[0];
        if (!info) return;
        const pts = pontuarImagem(p.title, info.width, info.height, info.mime);
        if (pts > melhorPontos) { melhorPontos = pts; melhor = info.thumburl || info.url; }
    });
    return melhor;
}

async function pedirJSON(url) {
    const resposta = await fetch(url);
    return resposta.json();
}

/* ---------- 1) Foto principal do artigo ---------- */
async function fotoPrincipal(titulo, largura) {
    const dados = await pedirJSON(API_WIKI + "&prop=pageimages&piprop=thumbnail|name&redirects=1" +
        "&pithumbsize=" + largura + "&titles=" + encodeURIComponent(titulo));
    const pagina = Object.values((dados.query && dados.query.pages) || {})[0];
    if (!pagina || !pagina.thumbnail) return null;
    const nome = pagina.pageimage || pagina.thumbnail.source;
    const t = pagina.thumbnail;
    const ehJpg = /\.jpe?g$/i.test(nome) || /\.jpe?g/i.test(t.source);
    const horizontal = t.width >= t.height * 1.05;
    return ehJpg && horizontal && !NAO_E_FOTO.test(nome) ? t.source : null;
}

/* ---------- 2) Melhor foto dentro do artigo ---------- */
async function fotoDoArtigo(titulo, largura) {
    const dados = await pedirJSON(API_WIKI + "&generator=images&gimlimit=max&redirects=1" +
        "&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=" + largura + "&titles=" + encodeURIComponent(titulo));
    return melhorDeLista(Object.values((dados.query && dados.query.pages) || {}));
}

/* ---------- 3) Pesquisa no Wikimedia Commons ---------- */
async function fotoDoCommons(titulo, largura) {
    const pesquisa = `"${titulo}" filetype:bitmap`;
    const dados = await pedirJSON(API_COMMONS + "&generator=search&gsrnamespace=6&gsrlimit=20" +
        "&gsrsearch=" + encodeURIComponent(pesquisa) +
        "&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=" + largura);
    return melhorDeLista(Object.values((dados.query && dados.query.pages) || {}));
}

/* ---------- Fila: no máximo 6 pedidos ao mesmo tempo ---------- */
const filaPedidos = [];
let pedidosAtivos = 0;

function emFila(tarefa) {
    return new Promise((resolver, rejeitar) => {
        filaPedidos.push({ tarefa, resolver, rejeitar });
        processarFila();
    });
}

function processarFila() {
    while (pedidosAtivos < 6 && filaPedidos.length) {
        const { tarefa, resolver, rejeitar } = filaPedidos.shift();
        pedidosAtivos++;
        tarefa().then(resolver, rejeitar).finally(() => { pedidosAtivos--; processarFila(); });
    }
}

/* ---------- Função principal ---------- */
function obterFoto(titulo, largura = 1000) {
    const chave = "foto:" + largura + ":" + titulo;
    if (chave in cacheFotos) return cacheFotos[chave];

    // Já encontrada numa visita anterior?
    try {
        const guardada = localStorage.getItem(chave);
        if (guardada) return (cacheFotos[chave] = Promise.resolve(guardada));
    } catch (e) { /* o navegador pode bloquear o localStorage */ }

    cacheFotos[chave] = emFila(async () => {
        const tentativas = [fotoPrincipal, fotoDoArtigo, fotoDoCommons];
        for (const tentar of tentativas) {
            try {
                const url = await tentar(titulo, largura);
                if (url) {
                    try { localStorage.setItem(chave, url); } catch (e) { }
                    return url;
                }
            } catch (erro) {
                console.log("Falhou uma tentativa de foto para", titulo, erro);
            }
        }
        return null;
    });
    return cacheFotos[chave];
}
