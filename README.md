# DocDirect

DocDirect est un site qui permet de mettre en relation les patients et les professionnels de la santé grâce à des solutions de prise de rendez-vous simples.

Prérequis
Node.js (version 14 ou supérieure)
NPM (version 6 ou supérieure)
MySQL
Étapes d'installation
1. Cloner le dépôt
Clonez le dépôt et accédez au répertoire du projet :

bash
Copier le code
git clone [URL_DU_REPOSITORY]
cd [NOM_DU_REPOSITORY]
2. Créer une base de données
Créez une base de données MySQL nommée docdirect :

sql
Copier le code
CREATE DATABASE docdirect;
3. Configurer le backend
Accédez au dossier backend, installez les dépendances, chargez les fixtures et lancez le serveur backend :

bash
Copier le code
cd back
npm install
node fixtures/loadFixtures
npm start
4. Configurer le frontend
Ouvrez un autre terminal, accédez au dossier frontend, installez les dépendances et lancez le client :

bash
Copier le code
cd front
npm install
npm start

Notes
Assurez-vous que MySQL est correctement configuré et que les informations de connexion dans le backend sont correctes.
Le backend doit être lancé avant le frontend pour que l'application fonctionne correctement.