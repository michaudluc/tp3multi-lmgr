/**
 * Cahrge un script
 * @param url la location du script à ajouter à la page
 * @param callback une fonction à appeler lorsque le script est chargé
 */
function chargeScript(url, callback)
{
    // On ajoute le nouveau tag immédiatement après le tag head
    var tete = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // On accroche un callback à la fin de l'ajout du script
    // On réagit à 2 événements pour optimiser la compatibilité avec différents navigateurs
    if(callback){
    	script.onreadystatechange = callback;
    	script.onload = callback;
    }

    // Fin de la tâche on accroche le script au DOM
    tete.appendChild(script);
};


/**
 * Convertit une collection liée dynamiquement sur le DOM en un array fixe au lieu d'
 */
function convertHTMLCollectionToArray(htmlCollection){
	return  [].slice.call(htmlCollection);
}