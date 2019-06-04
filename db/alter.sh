ALTER TABLE core.profiles ADD COLUMN views int;
UPDATE core.profiles SET views = 0;
ALTER TABLE core.profiles ALTER COLUMN views SET DEFAULT 0;

# ALTER TABLE core.news ADD COLUMN views int;
# UPDATE core.news SET views = 0;
# ALTER TABLE core.news ALTER COLUMN views SET DEFAULT 0;
