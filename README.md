README - **Installation et Utilisation du Projet OlympicTicket**



***Introduction***
Ce guide vous expliquera comment installer et utiliser le projet OlympicTicket sur votre machine. Ce projet est conçu pour gérer la réservation de billets pour les Jeux Olympiques.


***Prérequis***
Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :
<br><br>

Git

Python 3.8 ou supérieur

Node.js et npm (Node Package Manager)

MySQL

**Étape 1 : Cloner le Répertoire**  
<br>

*1.Ouvrez votre terminal.*
<br>

*2.Clonez le dépôt GitHub en utilisant la commande suivante :*

```git clone https://github.com/Mateo-rnt/Examen-certifiant_BLOC3Python_RIALLANT_Mateo.git```
<br><br>


*3.Accédez au dossier du projet :*

```cd Examen-certifiant_BLOC3Python_RIALLANT_Mateo/OlympicTicket```

<br><br>
**Étape 2 : Configuration de la Base de Données**
<br>

*1.Ouvrez MySQL Workbench ou votre terminal MySQL.*

*2.Créez une base de données pour le projet :*
<br>

```CREATE DATABASE olympicticket;```
<br><br>


*3.Créez un utilisateur et accordez-lui des privilèges sur cette base de données :*
<br>

```CREATE USER 'utilisateur'@'localhost' IDENTIFIED BY 'motdepasse';
GRANT ALL PRIVILEGES ON olympicticket.* TO 'utilisateur'@'localhost';
FLUSH PRIVILEGES; 
```
<br><br>
**Étape 3 : Configuration du Backend**

*1.Accédez au dossier backend :*
<br>

```cd backend/backend```
<br>


*2.Installez les dépendances :*
<br>

```pip install -r requirements.txt```
<br><br>

*3.Configurez les variables d'environnement dans le fichier .env :*

```
DEBUG=True
SECRET_KEY=votre_cle_secrete
DATABASE_URL=mysql://utilisateur:motdepasse@localhost:3306/olympicticket
```
<br>

*4.Appliquez les migrations :*
<br>
```
python manage.py migrate
```
<br><br>
*5.Lancez le serveur backend :*
<br>

```python manage.py runserver```
<br><br>

**Étape 4 : Configuration du Frontend**

*1.Ouvrez un nouveau terminal*

*2.Accédez au dossier frontend*

```cd Examen-certifiant_BLOC3Python_RIALLANT_Mateo/OlympicTicket/frontend```
<br>

*3.Installez les dépendances npm :*

```npm install```

*4.Créez un fichier .env.local avec les variables d'environnement nécessaires :*

```NEXT_PUBLIC_API_URL=http://localhost:8000```

*5.Lancez le serveur frontend :*

```npm run dev```


<br>
<br>
<br>

lancer le backend : 
```python manage.py runserver```

lancer le frontend :
```npm run dev```
