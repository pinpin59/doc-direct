# DocDirect

DocDirect est un site qui permet de mettre en relation les patients et les professionnels de la santé grâce à des solutions de prise de rendez-vous simples.

Prérequis
Node.js (version 14 ou supérieure)
NPM (version 6 ou supérieure)
MySQL
Étapes d'installation
Cloner le dépôt

bash
Copier le code
git clone [URL_DU_REPOSITORY]
cd [NOM_DU_REPOSITORY]
Créer une base de données

Créez une base de données MySQL nommée docdirect.

sql
Copier le code
CREATE DATABASE docdirect;
Configurer le backend

Accédez au dossier backend, installez les dépendances et chargez les fixtures.

bash
Copier le code
cd back
npm install
node fixtures/loadFixtures
npm start
Configurer le frontend

Ouvrez un autre terminal, accédez au dossier frontend, installez les dépendances et lancez le client.

bash
Copier le code
cd front
npm install
npm start
Résumé des commandes
Cloner le dépôt :

bash
Copier le code
git clone [git@github.com:pinpin59/doc-direct.git]
cd [doc-direct]
Créer la base de données MySQL docdirect :

sql
Copier le code
CREATE DATABASE docdirect;
Configurer le backend :

bash
Copier le code
cd back
npm install
node fixtures/loadFixtures
npm start
Configurer le frontend :

bash
Copier le code
cd front
npm install
npm start
Notes
Assurez-vous que MySQL est correctement configuré et que les informations de connexion dans le backend sont correctes.
Le backend doit être lancé avant le frontend pour que l'application fonctionne correctement.