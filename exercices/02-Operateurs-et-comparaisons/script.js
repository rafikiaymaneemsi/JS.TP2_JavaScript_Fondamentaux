"use strict";

function afficher(message) {
    const zoneResultat = document.getElementById("resultat");
    if (zoneResultat !== null) {
        zoneResultat.innerHTML = message;

        const sectionResultat = zoneResultat.closest(".resultat-section") ?? zoneResultat;
        const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        sectionResultat.scrollIntoView({
            behavior: mouvementReduit ? "auto" : "smooth",
            block: "start"
        });
    }
}

function variable(nom, valeur) {
    const echapperHtml = (texte) => String(texte)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    return `<span class="variable">${echapperHtml(nom)}</span> = <span class="valeur">${echapperHtml(valeur)}</span>`;
}

function demanderTexte(message) {
    let texte;

    do {
        texte = prompt(message);
        if (texte === null) {
            return null;
        }

        texte = texte.trim();
        if (texte === "") {
            alert("Veuillez saisir une valeur.");
        }
    } while (texte === "");

    return texte;
}

function demanderNombre(message) {
    let nombre;

    do {
        const saisie = prompt(message);
        if (saisie === null) {
            return null;
        }

        const saisieNormalisee = saisie.trim().replace(",", ".");
        nombre = Number(saisieNormalisee);

        if (saisieNormalisee === "" || !Number.isFinite(nombre)) {
            alert("Veuillez saisir un nombre valide.");
            nombre = NaN;
        }
    } while (!Number.isFinite(nombre));

    return nombre;
}

function demanderAge(message) {
    let age = -1;

    while (age < 0) {
        age = demanderNombre(message);
        if (age === null) {
            return null;
        }

        if (!Number.isInteger(age) || age < 0) {
            alert("Veuillez saisir un âge entier positif.");
            age = -1;
        }
    }

    return age;
}

"use strict";

function exo2q1() {
    const a = 10;
    const b = 3;

    afficher(`
        ${variable("a", a)}<br>
        ${variable("b", b)}<br><br>
        ${variable("Somme", a + b)}<br>
        ${variable("Différence", a - b)}<br>
        ${variable("Produit", a * b)}<br>
        ${variable("Division", a / b)}<br>
        ${variable("Reste", a % b)}
    `);
}

function exo2q2() {
    const a = demanderNombre("Entrez le premier nombre :");
    if (a === null) return;

    const b = demanderNombre("Entrez le deuxième nombre :");
    if (b === null) return;

    const moyenne = (a + b) / 2;
    let resultat = `
        ${variable("a", a)}<br>
        ${variable("b", b)}<br>
        ${variable("moyenne", moyenne)}
    `;

    if (Number.isInteger(moyenne)) {
        resultat += `<br>${variable("Parité", moyenne % 2 === 0 ? "Paire" : "Impaire")}`;
    } else {
        resultat += "<br>La moyenne n'est pas un nombre entier.";
    }

    afficher(resultat);
}

window.exo2q1 = exo2q1;
window.exo2q2 = exo2q2;
