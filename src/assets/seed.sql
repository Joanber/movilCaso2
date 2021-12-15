CREATE TABLE IF NOT EXISTS Carrera(caId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, coor TEXT, ppp TEXT);
 INSERT or IGNORE INTO Carrera VALUES (1, "analisis ", "Arenal", "pablo");
-- INSERT or IGNORE INTO Carrera VALUES (2, "software", "jesica", "Juan");
-- INSERT or IGNORE INTO usuario VALUES (2, "alequil@gmail.com", "santa ana", "09807867220");



--CREATE TABLE IF NOT EXISTS ticket(codTicket INTEGER PRIMARY KEY AUTOINCREMENT, codCatalogo INTEGER, codServicio INTEGER, codSeveridad INTEGER, descripcionTicket TEXT, codViaComunicacion INTEGER, codUsuario INTEGER, sla INTEGER, url TEXT, fechaCreacion TEXT, estado INTEGER);
-- INSERT or IGNORE INTO ticket VALUES (1,1,1,1,"esto es un test de insert",1,1,"url test", "20-05-21", 1, false, true) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

