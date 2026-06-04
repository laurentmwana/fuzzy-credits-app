# FuzzyCredit - Liste des fonctionnalités

## 1. Évaluation d’un client

- Saisie des 5 critères : revenu, taux d’endettement, ancienneté professionnelle, score historique de crédit, montant demandé.
- Calcul automatique du ratio montant demandé / revenu annuel.
- Affichage instantané du **score flou** (0–100).
- Décision finale : **Accord**, **Révision manuelle** ou **Refus**.
- Justification textuelle expliquant pourquoi la décision a été prise.
- Barre de progression ou jauge circulaire pour visualiser le score.

## 2. Visualisation des fonctions d’appartenance

- Graphique interactif pour chaque critère montrant :
  - Les ensembles flous (ex : Faible, Moyen, Élevé).
  - La position du client sur chaque ensemble.
  - Les degrés d’appartenance sous forme de valeurs ou de curseurs.

## 3. Explicabilité des règles

- Liste des **règles floues activées** avec leur degré d’activation.
- Mise en évidence des règles qui influencent le plus la décision finale.

## 4. Comparaison de deux profils

- Deux formulaires indépendants côte à côte.
- Comparaison visuelle des scores, décisions, et détails des résultats.
- Suggestion de priorité de traitement (ex : "Client A prioritaire").

## 5. Simulation de masse

- Génération automatique d’un grand nombre de profils aléatoires (100, 500, 1000).
- Répartition des décisions (Accord / Révision / Refus) sous forme de graphique (camembert, histogramme).
- Statistiques : score moyen, médian, min, max, écart-type.
- Export des résultats en CSV ou JSON.

## 6. Mode expert (ajustement des règles)

- Modification en direct des règles floues (ex : changer un "SI … ALORS …").
- Ajustement des fonctions d’appartenance (déplacer les points des triangles / trapèzes).
- Test immédiat d’un profil après modification.
- Sauvegarde des configurations personnalisées en base de données.

## 7. Historique des décisions

- Enregistrement automatique de chaque évaluation dans Neon.
- Consultation de toutes les demandes passées.
- Recherche et filtres (par nom, date, décision, score).
- Suppression possible d’une évaluation.

## 8. Export de rapport

- Génération d’un rapport PDF pour une évaluation.
- Contenu : données client, score, décision, règles activées, justification.
- Bouton d’export disponible sur la page de résultat.

## 9. Thème clair / sombre

- Basculement entre mode clair et mode sombre (via shadcn/ui).
- Sauvegarde du choix de l’utilisateur dans le navigateur.

## 10. Interface responsive

- Adaptation automatique aux écrans d’ordinateur, tablette et mobile.
- Navigation simplifiée sur mobile (menu en bas ou accordéons).

## 11. API REST (optionnel mais utile)

- Endpoint `/api/evaluate` pour évaluer un client via une requête HTTP.
- Endpoint `/api/history` pour récupérer l’historique.
- Endpoint `/api/simulate` pour lancer des simulations.

## 12. Base de données (Neon + Prisma)

- Sauvegarde de chaque évaluation (client, score, décision, date).
- Stockage des journaux d’inférence (règles activées, degrés).
- Persistance des configurations du mode expert.
