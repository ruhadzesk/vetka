psql -U postgres -c "DROP DATABASE vetka_db"
psql -U postgres -c "CREATE DATABASE vetka_db"

psql -U postgres vetka_db -f vetka.sql
psql -U postgres vetka_db -f tables.sql
psql -U postgres vetka_db -f functions.sql