function escapeHtml(str) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}
window.highlight = (code) => {
    code = escapeHtml(code);

    code = code.replace(/'[^']*'|"[^"]*"/g, m =>
        `<span class="string">${m}</span>`
    );

    const keywords = ["define", "return", "if", "var", "while", "for"];

    keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, "g");
        code = code.replace(regex, `<span class="keyword">${kw}</span>`);
    });

    code = code.replace(/\b\d+\b/g, m =>
        `<span class="number">${m}</span>`
    );

    return code;
};