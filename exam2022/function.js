var myDoc = getDoc("catalogue.xml");
// Charger un fichier XML
function getDoc(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    return xhttp.responseXML;
}



// Afficher le contenu XML dans un textarea
function afficher(Doc) {
    var serializer = new XMLSerializer();
    var Text = serializer.serializeToString(Doc);
    document.form1.text1.value = Text;

    var Text2 = "";
    var articles = Doc.documentElement.children; 
    for (let i = 0; i < articles.length; i++) {
        Text2 += `<option>${articles[i].getAttribute("ref")}</option>`;
    }
    document.form1.articles.innerHTML = Text2;
}


// Ajouter un nouvel article

function ajouter(ref, type, intitule, description, prixHT, tva) {
    if (!type) {
        alert("Veuillez sélectionner un type valide.");
        return;
    } 
    var Art = myDoc.createElement("article");
    Art.setAttribute("ref", ref);
    Art.setAttribute("type", type); 

  
    var intituleElement = myDoc.createElement("intitule");
    intituleElement.textContent = intitule;
    Art.appendChild(intituleElement);

    if (description) {
        var descriptionElement = myDoc.createElement("description");
        descriptionElement.textContent = description;
        Art.appendChild(descriptionElement);
    }

    var prixHTElement = myDoc.createElement("prixHT");
    prixHTElement.textContent = prixHT.replace(".", ","); 
    Art.appendChild(prixHTElement);

    var tvaElement = myDoc.createElement("TVA");
    tvaElement.textContent = tva.replace(".", ","); 
    Art.appendChild(tvaElement);

   
    myDoc.documentElement.appendChild(Art);

  
    afficher(myDoc);
}

// Modifier un article par sa reference
function modifier(ref, type, intitule, description, prixHT, tva) {
    if (!ref) {
        alert("Veuillez saisir une référence valide.");
        return;
    }

    
    var articles = myDoc.documentElement.children;
    var articleToModify = null;

    for (let i = 0; i < articles.length; i++) {
        if (articles[i].getAttribute("ref") === ref) {
            articleToModify = articles[i];
            break;
        }
    }

    if (!articleToModify) {
        alert("Aucun article trouvé avec la référence " + ref);
        return;
    }

    
    if (type) {
        articleToModify.setAttribute("type", type); 
    }

    if (intitule) {
        var intituleElement = articleToModify.getElementsByTagName("intitule")[0];
        if (intituleElement) {
            intituleElement.textContent = intitule; 
        } else {
            var newIntituleElement = myDoc.createElement("intitule");
            newIntituleElement.textContent = intitule;
            articleToModify.appendChild(newIntituleElement); 
        }
    }

    if (description) {
        var descriptionElement = articleToModify.getElementsByTagName("description")[0];
        if (descriptionElement) {
            descriptionElement.textContent = description; 
        } else {
            var newDescriptionElement = myDoc.createElement("description");
            newDescriptionElement.textContent = description;
            articleToModify.appendChild(newDescriptionElement); 
        }
    }

    if (prixHT) {
        var prixHTElement = articleToModify.getElementsByTagName("prixHT")[0];
        if (prixHTElement) {
            prixHTElement.textContent = prixHT.replace(".", ","); 
        }
    }

    if (tva) {
        var tvaElement = articleToModify.getElementsByTagName("TVA")[0];
        if (tvaElement) {
            tvaElement.textContent = tva.replace(".", ","); 
        }
    }

    
    afficher(myDoc);
}



// Supprimer un article par sa référence
function supprimer(index) {
    var articles = myDoc.documentElement.children;
    if (index >= 0 && index < articles.length) {
        myDoc.documentElement.removeChild(articles[index]);
    }
    afficher(myDoc);
}


// Reduire le prix HT des articles de type "SW" si leur prix TTC depasse 5000
function reduirePrix() {
    if (!myDoc) {
        alert("Document XML introuvable !");
        return;
    }
    
    var articles = myDoc.getElementsByTagName("article");

    for (let i = 0; i < articles.length; i++) {
        var article = articles[i];
        var type = article.getAttribute("type");

        if (type === "SW") {
            var prixHTElement = article.getElementsByTagName("prixHT")[0];
            var tvaElement = article.getElementsByTagName("TVA")[0];

            if (prixHTElement && tvaElement) {
                let prixHT = parseFloat(prixHTElement.textContent.replace(",", "."));
                let tva = parseFloat(tvaElement.textContent.replace(",", "."));

                let prixTTC = prixHT * (1 + tva / 100);

                if (prixTTC > 5000) {
                    prixHT *= 0.9; // Reduction de 10%
                    prixHTElement.textContent = prixHT.toFixed(2).replace(".", ",");
                }
            }
        }
    }

    // Mettre à jour l'affichage dans le textarea
    afficher(myDoc);
}


// Initialiser l'affichage
 afficher(myDoc);
