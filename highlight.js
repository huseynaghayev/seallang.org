function escapeHtml(str) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

const keywords = new Set([
    "if", "then", "else",
    "while", "do", "for", "in",
    "skip", "stop",
    "define", "return", "include",
    "and", "or", "not"
]);

const literals = new Set([
    "null", "true", "false"
]);

const decimalRegex = /\b\d+\b/
const hexRegex = /\b0[xX][0-9a-fA-F]+\b/
const octRegex = /\b0[oO][0-7]+\b/
const binRegex = /\b0[bB][01]+\b/
const floatRegex = /\b\d+\.\d+|\b\.\d+\b/
const stringRegex = /'[^']*'|"[^"]*"/;
const commentRegex = /\/\/.*$|\/\*.*\*/
const wordRegex = /[a-zA-Z]+/
const idRegex = null; // to be implemented

const tokenRegex = new RegExp(
    [
        decimalRegex.source,
        hexRegex.source,
        octRegex.source,
        binRegex.source,
        floatRegex.source,
        stringRegex.source,
        commentRegex.source,
        wordRegex.source,
        //idRegex,
    ].join("|"),
    "gm"
);

window.highlight = (code) => {
    code = escapeHtml(code);

    return code.replace(tokenRegex, token => {

        if (token.startsWith("//") || token.startsWith("/*")) {
            return `<span class="comment">${token}</span>`;
        }

        if (token.startsWith("\"") || token.startsWith("\'")) {
            return `<span class="string">${token}</span>`;
        }

        if (literals.has(token)) {
            return `<span class="literal">${token}</span>`;
        }

        if (keywords.has(token)) {
            return `<span class="keyword">${token}</span>`;
        }
        
        if (/\d/.test(token)) {
            return `<span class="number">${token}</span>`;
        }

        return token;
    });
};