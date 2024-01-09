const mysql = require('mysql');

// Configurations de connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'red_web'
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données établie');

  // Création d'une table 'projets' (si elle n'existe pas déjà)
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS projets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titre VARCHAR(255) NOT NULL,
      description TEXT,
      prix DECIMAL(10, 2),
      delai_livraison DATE
    )
  `;
  
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table :', err);
      return;
    }
    console.log('Table "projets" créée avec succès');

    // Fonction pour créer un nouveau projet
    function creerProjet(nouveauProjet) {
      const query = 'INSERT INTO projets SET ?';
      connection.query(query, nouveauProjet, (err, result) => {
        if (err) {
          console.error('Erreur lors de la création du projet :', err);
        } else {
          console.log('Nouveau projet inséré avec l\'ID :', result.insertId);
        }
      });
    }

    // Exemple d'insertion d'un nouveau projet
    const nouveauProjet = {
      titre: 'Nouveau Projet',
      description: 'Description du nouveau projet',
      prix: 150,
      delai_livraison: '2024-01-15' // Date au format 'YYYY-MM-DD'
    };
    creerProjet(nouveauProjet);

    // Fonction pour récupérer tous les projets
    function obtenirTousLesProjets() {
      const query = 'SELECT * FROM projets';
      connection.query(query, (err, rows) => {
        if (err) {
          console.error('Erreur lors de la récupération des projets :', err);
          return;
        }
        console.log('Liste des projets :', rows);
      });
    }

    // Exemple de récupération de tous les projets
    obtenirTousLesProjets();

    // Fonction pour mettre à jour un projet existant
    function mettreAJourProjet(id, modifications) {
      const query = 'UPDATE projets SET ? WHERE id = ?';
      connection.query(query, [modifications, id], (err, result) => {
        if (err) {
          console.error('Erreur lors de la mise à jour du projet :', err);
        } else {
          console.log('Projet mis à jour avec succès');
        }
      });
    }

    // Exemple de mise à jour d'un projet existant (modifier le titre du projet ayant l'ID 1)
    const modificationsProjet = { titre: 'Titre Modifié' };
    mettreAJourProjet(1, modificationsProjet);

    // Fonction pour supprimer un projet existant
    function supprimerProjet(id) {
      const query = 'DELETE FROM projets WHERE id = ?';
      connection.query(query, id, (err, result) => {
        if (err) {
          console.error('Erreur lors de la suppression du projet :', err);
        } else {
          console.log('Projet supprimé avec succès');
        }
      });
    }

    // Exemple de suppression d'un projet existant (supprimer le projet ayant l'ID 2)
    supprimerProjet(2);
  });
});
