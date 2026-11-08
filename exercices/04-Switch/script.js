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

function exo4q1() {
    const nombre = demanderNombre("Entrez un nombre entre 1 et 7 :");
    if (nombre === null) return;

    let jour;
    switch (nombre) {
        case 1: jour = "Lundi"; break;
        case 2: jour = "Mardi"; break;
        case 3: jour = "Mercredi"; break;
        case 4: jour = "Jeudi"; break;
        case 5: jour = "Vendredi"; break;
        case 6: jour = "Samedi"; break;
        case 7: jour = "Dimanche"; break;
        default: jour = "Nombre invalide";
    }

    afficher(`
        ${variable("nombre", nombre)}<br>
        ${variable("jour", jour)}
    `);
}

function exo4q2() {
    const jour = demanderTexte("Entrez un jour de la semaine :");
    if (jour === null) return;

    let suivant;
    switch (jour.toLowerCase().trim()) {
        case "lundi": suivant = "Mardi"; break;
        case "mardi": suivant = "Mercredi"; break;
        case "mercredi": suivant = "Jeudi"; break;
        case "jeudi": suivant = "Vendredi"; break;
        case "vendredi": suivant = "Samedi"; break;
        case "samedi": suivant = "Dimanche"; break;
        case "dimanche": suivant = "Lundi"; break;
        default: suivant = "Jour invalide";
    }

    afficher(`
        ${variable("jour", jour)}<br>
        ${variable("jour suivant", suivant)}
    `);
}

window.exo4q1 = exo4q1;
window.exo4q2 = exo4q2;
