# Seeding the database

1. Install MongoDB locally
2. Change the root .env file to connect to your local database.
3. If it exists, delete the `seedScriptProgress.json` file from the root of the project
4. Run `npm run seed`
5. This process will take around 15 minutes. If at any point `npm run seed` crashes, you can run `npm run seed` again and the process will pick up where it left off.
6. After the seed script finishes, run `npm run cli:ac`
7. Select `Create New Access Control`
8. Select the first item on the list and press enter.
9. Repeat steps 7 and 8 for each item on the access control list (Genres, Hosts, Library, etc.)
10. You're done!