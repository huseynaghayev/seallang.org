function escapeHtml(str) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

window.highlight = (code) => {
    code = escapeHtml(code);

    // strings
    code = code.replace(/'[^']*'|"[^"]*"/g, m =>
        `<span class="string">${m}</span>`
    );

    const keywords = [
        "if", "then", "else",
        "while", "do", "for", "in",
        "skip", "stop",
        "define", "return", "include",
        "and", "or", "not"
    ];

    const literals = [
        "null", "true", "false"
    ];

    // keywords
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, "g");
        code = code.replace(regex, `<span class="keyword">${kw}</span>`);
    });

    // literals
    literals.forEach(lit => {
        const regex = new RegExp(`\\b${lit}\\b`, "g");
        code = code.replace(regex, `<span class="literal">${lit}</span>`);
    });

    // numbers
    code = code.replace(/\b\d+\b|\b\d+\.\d+\b|\b\.\d+\b|\b0[xX][0-9a-fA-F]+\b|\b0o[0-7]+\b|\b0b[01]+\b/g, m =>
        `<span class="number">${m}</span>`
    );

    // comments
    code = code.replace(/\/\/.*$|\/\*.*\*\//g, m =>
        `<span class="comment">${m}</span>`
    );

    return code;
};