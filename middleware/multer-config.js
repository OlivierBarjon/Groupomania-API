/* ### MULTER - gestion des fichiers images ### */

const multer = require('multer'); // on récupère le package multer

const MIME_TYPES = { //on crée un objet qui nous permettra de lister les extensions par rapport aux mime-types des fichiers envoyés (en JS on a pas accès au extensions, seulement au mime-types)
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif':'gif'
};

const storage = multer.diskStorage({ // on crée un objet de configuration pour multer grâce à sa fonction diskStorage afin de lui dire qu'on va enregistrer les images sur le disque
    destination: (req, file, callback) => { // la première propriété est une fonction de définition de la destination
        callback(null, 'images') // le premier arg "null" signifie qu'il n'y a pas eu d'erreur jusque-là. Le deuxième arg correspond au dossier dans lequel on enregistre les fichiers
    },
    filename: (req, file, callback) => { //on explique à multer quel nom de fichier utiliser (on n'utilise pas le nom de fichier d'origin pour éviter les problèmes)
        const name = file.originalname.split(' ').join('_'); // on génère le nouveau nom pour le fichier: on supprime les éventuels espaces et on les remplace par des "_"
        const extension = MIME_TYPES[file.mimetype]; // on crée l'extension du fichier : ce sera l'élément de notre objet MIME_TYPES qui correspond au mime type du fichier envoyé par le front
        callback(null, name + Date.now() + '.' + extension); // on appelle le callback et en deuxième argument on va créer le filename entier (name + timestemp+un point+l'extension)
    }
});

const fileFilter = (req, file, callback) => {// on crée un filtre sur les fichiers de type "jpg", "jpeg" ou "png" ou "gif"
    const extension = MIME_TYPES[file.mimetype]; 
    if (extension === 'jpg' || extension === 'png' || extension === 'gif') {
        callback (null, true);
        
    } else {
        callback('Erreur : Mauvais type de fichier', false); // si le fichier envoyé est différent de celui attendu, on envoi un message d'erreur
    }
};


module.exports = multer({
    storage, 
    limits: { fileSize: 5242880 }, 
    fileFilter 
}).single('image');// on exporte notre middleware  en appelant  la méthode multer à laquelle on passe notre objet storage. On appelle la méthode single pour préciser qu'il s'agit d'un objet unique (et non pas un groupe de fichiers). On ajoute également notre filtre ainsi qu'un paramètre multer concernant le point maximum : 5Mo (5242880 bytes)