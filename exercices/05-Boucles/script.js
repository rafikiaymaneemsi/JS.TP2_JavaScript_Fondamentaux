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

function exo5q1() {
    let resultat = "";

    for (let i = 1; i <= 10; i++) {
        resultat += `${variable("nombre", i)}<br>`;
    }

    afficher(resultat);
}

function exo5q2() {
    let resultat = "";

    for (let i = 1; i <= 20; i++) {
        if (i % 2 === 0) {
            resultat += `${variable("nombre pair", i)}<br>`;
        }
    }

    afficher(resultat);
}

function exo5q3() {
    const nombre = demanderNombre("Entrez un nombre entier positif :");
    if (nombre === null) return;

    if (!Number.isInteger(nombre) || nombre < 0) {
        afficher("Veuillez entrer un entier positif.");
        return;
    }

    if (nombre > 170) {
        afficher("Nombre trop grand pour calculer la factorielle avec précision.");
        return;
    }

    let factorielle = 1;
    for (let i = 1; i <= nombre; i++) {
        factorielle *= i;
    }

    afficher(`
        ${variable("nombre", nombre)}<br>
        ${variable("factorielle", factorielle)}
    `);
}

window.exo5q1 = exo5q1;
window.exo5q2 = exo5q2;
window.exo5q3 = exo5q3;
