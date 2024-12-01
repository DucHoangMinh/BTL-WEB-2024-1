const { Client } = require('pg');

const connectionString = 'postgres://neondb_owner:LXJFk0bWG5ci@ep-calm-mud-a1nvqzno-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString: connectionString,
});

(async () => {
  try {
    await client.connect();

    const sql = `
      DO $$ 
      DECLARE 
          row_char CHAR(1);
          col_num INT;
          row_index INT;
          room_id INT;
          showtime_id INT;
          showtime_record RECORD;  
      BEGIN
          -- Lấy danh sách tất cả các showtime_id và room_id từ bảng Showtime
          FOR showtime_record IN
              SELECT sh.id AS showtime_id, sh.room_id
              FROM "Showtime" sh
          LOOP
              -- Lưu trữ giá trị showtime_id và room_id từ bảng Showtime
              showtime_id := showtime_record.showtime_id;
              room_id := showtime_record.room_id;
              
              -- Vòng lặp qua tất cả các hàng từ A đến H (tương ứng với 8 hàng)
              FOR row_index IN 65..72 LOOP -- ASCII codes for A-H
                  row_char := CHR(row_index); -- Tạo ký tự hàng từ A-H

                  -- Vòng lặp qua tất cả các cột từ 1 đến 14
                  FOR col_num IN 1..14 LOOP
                      -- Chèn một ghế vào bảng Seat cho mỗi showtime_id và room_id tương ứng
                      INSERT INTO "Seat" (room_id, showtime_id, seat_number, seat_type, row, "column", status, is_paid, price)
                      VALUES 
                          (room_id, showtime_id, row_char || col_num, NULL, row_char, col_num, 'available', false, NULL);
                  END LOOP;
              END LOOP;
          END LOOP;
      END $$;
    `;

    await client.query(sql);
    console.log("Seats inserted successfully!");

  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
})();
