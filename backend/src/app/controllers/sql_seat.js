const { Client } = require('pg');

const connectionString = 'postgres://neondb_owner:LXJFk0bWG5ci@ep-calm-mud-a1nvqzno-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString: connectionString,
});

(async () => {
  try {
    await client.connect();

    const sql = `
      UPDATE "Seat"
      SET price = 50000
      WHERE price IS NULL;
    `;

    await client.query(sql);
    console.log("Price updated successfully!");

  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
})();
