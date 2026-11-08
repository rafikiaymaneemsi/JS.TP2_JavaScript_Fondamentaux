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

function exo3q1() {
    const age = demanderAge("Entrez votre âge :");
    if (age === null) return;

    afficher(`
        ${variable("age", age)}<br>
        ${age >= 18 ? "Accès autorisé." : "Accès refusé."}
    `);
}

function exo3q2() {
    const age = demanderAge("Entrez votre âge :");
    if (age === null) return;

    const pays = demanderTexte("Entrez votre pays :");
    if (pays === null) return;

    let message;
    if (age >= 18 && pays.toLowerCase() === "maroc") {
        message = "Accès autorisé.";
    } else if (age >= 18) {
        message = "Vous êtes majeur, mais vous êtes étranger.";
    } else {
        message = "Accès refusé.";
    }

    afficher(`
        ${variable("age", age)}<br>
        ${variable("pays", pays)}<br><br>
        ${message}
    `);
}

function exo3q3() {
    const note = demanderNombre("Entrez votre note :");
    if (note === null) return;

    if (note < 0 || note > 20) {
        afficher("La note doit être comprise entre 0 et 20.");
        return;
    }

    let appreciation;
    if (note >= 16) appreciation = "Excellent";
    else if (note >= 14) appreciation = "Bien";
    else if (note >= 12) appreciation = "Assez bien";
    else appreciation = "Insuffisant";

    afficher(`
        ${variable("note", note)}<br>
        ${variable("appréciation", appreciation)}
    `);
}

function exo3q4() {
    const saisie = prompt("Entrez votre note :");
    if (saisie === null) return;

    const note = Number(saisie.trim().replace(",", "."));
    if (saisie.trim() === "" || isNaN(note)) {
        afficher("Erreur : veuillez saisir un nombre valide.");
    } else if (note < 0 || note > 20) {
        afficher("Erreur : la note doit être entre 0 et 20.");
    } else {
        let appreciation;
        if (note >= 16) appreciation = "Excellent";
        else if (note >= 14) appreciation = "Bien";
        else if (note >= 12) appreciation = "Assez bien";
        else appreciation = "Insuffisant";

        afficher(`
            ${variable("note", note)}<br>
            ${variable("appréciation", appreciation)}
        `);
    }
}

window.exo3q1 = exo3q1;
window.exo3q2 = exo3q2;
window.exo3q3 = exo3q3;
window.exo3q4 = exo3q4;
