
# DocDirect

DocDirect est un site qui permet de mettre en relation les patients et les professionnels de la santé grâce à des solutions de prise de rendez-vous simples.

## Installation du projet

1. Cloner le dépot et accéder au dossier du projet :

```bash
  git clone git@github.com:pinpin59/doc-direct.git
  cd doc-direct
```

2. Créez une base de données MySQL nommée docdirect :
 

```bash
  CREATE DATABASE docdirect;
```
3. Accédez au dossier backend, installez les dépendances, chargez les fixtures et lancez le serveur backend :


```bash
  cd back
  npm install
  node fixtures/loadFixtures
  npm start
```

4. Ouvrez un autre terminal, accédez au dossier frontend, installez les dépendances et lancez le client :

```bash
  cd front
  npm install
  npm start
```

## Notes :

Assurez-vous que MySQL est correctement configuré et que les informations de connexion dans le backend sont correctes. Créez un fichier .env avec vos informations personnelles en suivant l'exemple fourni dans .env-example.

Le backend doit être lancé avant le frontend pour que l'application fonctionne correctement.
