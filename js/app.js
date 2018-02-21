//À faire!

/**
 * Crée un objet Salle de chat
 * @param nom Le nom de la salle
 * @constructor
 */
function SalleDeChat(nom) {
this.nom = nom;
this.messages = document.getElementsByClassName("message");
}

/**
 * Construit un objet identité
 * @param pseudo {string} le nom d'utilisateur
 * @param {Number} age l'age de l'utilisateur
 * @constructor
 */
function Identity(pseudo = "Luc", age = 31) {
    this.pseudo = pseudo;
    this.age = age;
    /**
     * Compare 2 identites
     * @param identity {Identity} l'identité à comparer
     * @returns {boolean} vrai seulement si les ages et les pseudo correspondent.
     */
    this.compare = function (identity) {
        if(identity.age === this.age && identity.pseudo === this.pseudo)
        return true;
    }
}

/**
 * Application principale
 * @constructor
 */
function MiniChat() {
this.identity = new Identity();
this.salleActive = new SalleDeChat("Salle 1");
this.contentDiv = document.getElementById("content");
   /**
     * Démarre l'application
     */
	this.start = function () {
        console.log("l'application est demarree");
        this.masqueAide();
        this.masqueIdentite();
        this.ajusteMessageClass(this.salleActive.messages);
        document.getElementById("identite-affichee").innerHTML=this.identity.pseudo;
    };	
	
	this.changeIdentity = function () {
        let pseudo = document.getElementById("pseudo").value;
        let age = document.getElementById("age").value;
        this.identity = new Identity(pseudo,age);
        document.getElementById("identite-affichee").innerHTML=this.identity.pseudo;
        this.ajusteMessageClass(this.salleActive.messages);
    }
	
	this.masqueIdentite = function() {
        document.getElementById("pseudo").value = "";
        document.getElementById("age").value = "";
        document.getElementById("identite-div").style.display = "none";
    } 

    this.afficheIdentite = function() {
        document.getElementById("identite-div").style.display = "block";
    } 
    
    this.masqueAide = function() {
        document.getElementById("aide-content").style.display = "none";
    } 
    this.afficheAide = function() {
        document.getElementById("aide-content").style.display = "block";
    } 
	
	/**
     * Soumet le nouveau message
     * @returns {boolean} vrai si le message a été soumis correctement
     */
    this.submitText = function () {
        var qui = this.identity;
        var quoi = document.getElementById("messageContenu").value;
		this.ajouteMessage(qui, quoi);
	return false;// important de retourner false sinon la page est reloadée et les nouveaux messages sont perdus.
    };
	
	/**
     * Ajoute un nouveau message
     * @param qui {String} Le pseudo de l'expediteur
     * @param quoi {String} le message
     */
    this.ajouteMessage = function (qui, quoi) {
	   //retrouve le template
        var patron= document.getElementById("patron-envoie");
        var nouveauMessage = patron.cloneNode(true);
        nouveauMessage.classList.remove("patron");
        nouveauMessage.classList.add("envoye");
        nouveauMessage.id = qui.pseudo;

		//on crée le texte
        var nodeText = document.createElement("p"); 
        var text = document.createTextNode(quoi);         
        nodeText.appendChild(text);
          
		//On crée l'identifiant
        var nodeId = document.createElement("p");
        var id = document.createTextNode(qui.pseudo);         
        nodeId.appendChild(id);
        nodeId.classList.add("userID");

        //on crée la date message-date-envoye
        var d = new Date();
        var nodeDate = document.createElement("p");
        var date = document.createTextNode(d.toDateString()+" "+d.toLocaleTimeString());         
        nodeDate.appendChild(date);
        nodeDate.classList.add("message-date-envoye");

		//on ajoute les éléments (texte message, l’identifiant, la date) au nouveauMessage 
        nouveauMessage.appendChild(nodeId);
        nouveauMessage.appendChild(nodeDate);
        nouveauMessage.appendChild(nodeText);
		nouveauMessage.style.display = "none";
		// on ajoute nouveauMessage à la div identifiée par content
                      
        this.contentDiv.appendChild(nouveauMessage);
		
		//on anime . L'animation ne part que s'il y a une modification affichée! on doit donc mettre un petit délai
        setTimeout(function(){ nouveauMessage.style.display = "block"; }, 0);
        
		};
		
		 /**
     * Met à jour et anime les messages pour refléter l'identité du nouvel utilisateur
     * @param {[]} messages les messages à mettre à jour
     */
		this.ajusteMessageClass = function (messages) {
            //console.log(messages);
        for (var i = 2; i < messages.length; i++) {// le 0 est le template
            var message = messages[i];
            var id = message.childNodes[0].innerHTML;
            var date;
            if (id == this.identity.pseudo) {
                message.classList.remove("recu");
                message.classList.add("envoye");
                message.childNodes[1].classList.remove("message-date-recu");
                message.childNodes[1].classList.add("message-date-envoye");
            }
            else {            
                message.classList.remove("envoye");
                message.classList.add("recu");
                message.childNodes[1].classList.add("message-date-recu");
                message.childNodes[1].classList.remove("message-date-envoye");
            }
        }
    };
}	
// On crée et démare l'application
var app = new MiniChat();
app.start();

	
	
	
	
	
	