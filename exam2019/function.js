var myDoc=getDoc("fsML.xml");

function getDoc(url){
    var xhttp=new XMLHttpRequest();
    xhttp.open("GET",url,false);
    xhttp.send();
    return xhttp.responseXML;
}
function afficher(Doc){
    var serializer=new XMLSerializer();
    var Text=serializer.serializeToString(Doc);
    document.form1.text1.value=Text;

    var Text2="";
    var dossiers=Doc.documentElement.children;
    for (let i=0;i < dossiers.length;i++){
        Text2 += `<option>${dossiers[i].getAttribute("idD")}</option>`;
    }
    document.form1.dossiers.innerHTML=Text2;

   
}
function ajouter(idD,nomD,date_de_creationD,idF,nomF,date_de_creationF,date_de_modificationF,tailleF,contenuF){
   
    if (!idD || !nomD || !date_de_creationD) {
        alert("Les champs Id_Dossier, Nom_Dossier et Date_de_creation_Dossier sont obligatoires.");
        return;
    }

    var Dos=myDoc.createElement("dossier");
    
        Dos.setAttribute("idD",idD);
        Dos.setAttribute("nomD",nomD);
        Dos.setAttribute("date_de_creationD",date_de_creationD);
    if (idF && nomF && date_de_creationF) {
        var sousfichier=myDoc.createElement("fichier");
        sousfichier.setAttribute("idF",idF);
        sousfichier.setAttribute("nomF",nomF);
        sousfichier.setAttribute("date_de_creationF",date_de_creationF);
        sousfichier.setAttribute("date_de_derniere_modificationF",date_de_modificationF|| "");
        sousfichier.setAttribute("tailleF",tailleF ||"");
        sousfichier.textContent = contenuF.trim() || "Contenu par défaut";
        
        Dos.appendChild(sousfichier);
    }

    
    myDoc.documentElement.appendChild(Dos);
    afficher(myDoc);

}


function supprimer(index) {
    var dossiers = myDoc.documentElement.children;
    if (index >= 0 && index < dossiers.length) {
        myDoc.documentElement.removeChild(dossiers[index]);
    }
    afficher(myDoc);
}

    

afficher(myDoc);