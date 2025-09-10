/*
  # Ajouter le champ due_time à la table user_tasks

  1. Modifications
    - Ajouter la colonne `due_time` à la table `user_tasks`
    - La colonne est optionnelle (nullable)
    - Format attendu: HH:MM (ex: "14:30")

  2. Notes
    - Cette migration ajoute la possibilité de spécifier une heure pour les tâches
    - Compatible avec les données existantes (valeur NULL par défaut)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_tasks' AND column_name = 'due_time'
  ) THEN
    ALTER TABLE user_tasks ADD COLUMN due_time text;
  END IF;
END $$;