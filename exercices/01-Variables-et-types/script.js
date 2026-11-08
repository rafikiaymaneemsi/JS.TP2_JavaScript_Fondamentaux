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

function exo1q1() {
    const nom = "Aymane";
    const age = 20;
    const etudiant = true;

    afficher(`
        ${variable("nom", nom)}<br>
        ${variable("age", age)}<br>
        ${variable("etudiant", etudiant)}
    `);
}

function exo1q2() {
    const nom = demanderTexte("Entrez votre nom :");
    if (nom === null) return;

    const age = demanderAge("Entrez votre âge :");
    if (age === null) return;

    const ville = demanderTexte("Entrez votre ville :");
    if (ville === null) return;

    afficher(`
        ${variable("nom", nom)}<br>
        ${variable("age", age)}<br>
        ${variable("ville", ville)}
    `);
}

window.exo1q1 = exo1q1;
window.exo1q2 = exo1q2;
