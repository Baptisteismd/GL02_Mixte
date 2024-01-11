// Importation de modules
const fs = require("fs"); // Module pour la gestion des fichiers
const CRUParser = require("../CRUParser"); // Module personnalisé pour le parsing des fichiers CRU

// Liste des identifiants de salles
let tabAlph = ["AB", "CD", "EF", "GH", "IJ", "KL", "MN", "OP", "QR", "ST"];

// Fonction principale pour rechercher la capacité maximale d'une salle
function spec4(args, logger) {
    let fini = false; // Variable pour contrôler la boucle while
    let placeMax = 0; // Variable pour stocker la capacité maximale de la salle

    // Boucle while pour parcourir les fichiers de chaque salle
    while (fini === false) {

        // Utilisation du Parser pour récupérer les données de chaque fichier CRU
        // On parcourt chaque fichier et on les ajoute à la variable CRUAFiltrer,
        // puis on la filtre en fonction de la salle recherchée pour obtenir CRUFiltres.
        for (let parcourir = 0; parcourir < tabAlph.length; parcourir++) {
            fs.readFile(
                "SujetA_data/" + tabAlph[parcourir] + "/edt.cru",
                "utf8",
                function (err, data) {
                    if (err) {
                        return logger.warn(err); // En cas d'erreur lors de la lecture du fichier, un avertissement est loggé
                    }
                    // Utilisation du CRUParser pour analyser les données du fichier CRU
                    let analyzer = new CRUParser();
                    analyzer.parse(data);

                    // Obtention de la variable CRUAFiltrer à partir du CRUParser
                    let CRUAFiltrer = analyzer.parsedCRU;
                    let CRUFiltres = [];

                    // Filtrage des données en fonction de la salle recherchée
                    for (let i = 0; i < CRUAFiltrer.length; i++) {
                        let salleCurrent = analyzer.parsedCRU[i].salle
                        if (salleCurrent == args) {
                            CRUFiltres.push(CRUAFiltrer[i]);
                        }
                    }

                    // Comparaison de l'attribut 'place' de chaque objet et affichage de la capacité maximale
                    if (CRUFiltres.length > 0) {
                        for (let lire = 0; lire < CRUFiltres.length; lire++) {
                            let placeAComparer = CRUFiltres[lire].place;
                            if (parseInt(placeAComparer) > parseInt(placeMax)) {
                                placeMax = placeAComparer;
                            }
                            if (parcourir === tabAlph.length - 1 && lire === CRUFiltres.length - 1) {
                                console.log(`La capacité maximale de la salle, ${args}, est, ${placeMax}`.blue);
                            }
                        }
                    }
                }
            );
        }
        fini = true; // Fin de la boucle while après le premier tour
    }
}

// Exportation de la fonction pour pouvoir l'utiliser dans d'autres fichiers
module.exports = spec4;
