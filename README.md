# pige-de-noel
Cette application répond au besoin de Monsieur Brault, grand-père d'une désormais bien grande famille qui chaque automne réalise une pige de noël.

Cette pige a pour but de distribuer aléatoirement les membres donneurs et receveurs de cadeaux suivant deux principales règles :

* Un membre ne peut pas s'offrir de cadeau à lui-même
* Chaque membre d'un couple ne peut offrir de cadeau à son alter ego

Cette application permet à Monsieur Brault de réaliser la pige de façon automatique, rapide et sans triche !

## Compilation et utilisation de l'application
1. Installer les modules externes (npm)

```npm install```

*Note* : nécessite également l'installation globale de ``typescript`` et ``webpack``

2. Builder l'application et lancer le serveur

```npm run start```

3. Ouvrir l'adresse indiquée dans les logs du serveur dans votre navigateur (localhost)

## Jeu de test manuel

L'application utilise par défaut le fichier ``members.json`` (/src/api/data) qui propose la liste de membres suivante :

* ``Phil Brault`` : grand-père de la famille, responsable de la pige, mari de Catherine Brault
* ``Julie Tremblay`` : nièce de Phil et Catherine, célibataire
* ``Catherine Brault`` : grand-mère de la famille, épouse de Phil Brault
* ``Maxime Brault`` : petit-fils de Phil et Catherine, célibataire

La configuration de base est donc celle d'un couple plus deux personnes célibataires

## Tests unitaires

Le calcul de la pige est testé sous forme de tests unitaires écrits avec le framework Jasmine et exécutés par Karma.

Les 3 Use Case (UC) suivants sont testés :

* *UC1* : La pige doit contenir un résultat pour chaque membre
* *UC2* : La pige doit retourner un object null si le calcul est impossible à résoudre (seulement un couple plus une personne célibataire)
* *UC3* : La pige doit retourner un object null si il n'y a aucun membre responsable de la pige

Pour exécuter ces tests :

```npm test```

## Pistes d'amélioration

* Ajouter la feature de delete d'un membre
* Sauvegarder les résultats et donner un nom à chaque pige (année ?) + page CRUD des piges