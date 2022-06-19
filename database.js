const mysql = require('mysql');


const connection = mysql.createPool({
  connectionLimit: 10,    // the number of connections node.js will hold open to our database
  password: '',
  user: 'root',
  database: 'senegaltravel',
  host: 'localhost',
  port: 3306

});
/*

connection.query(`CREATE TABLE users (
     id  int(11) NOT NULL ,
     name  varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
     email  varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
     password  varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
     token  varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL
   ) `)
   */
   
 





// //   -- Indexes for dumped tables



// //   -- Indexes for table `users`
// //   --
/*
  connection.query(`
  ALTER TABLE users
     ADD PRIMARY KEY (id),
     ADD UNIQUE KEY email (email);
     `) */

// //   --
// //   -- AUTO_INCREMENT for dumped tables
// //   --

// //   --
// //   -- AUTO_INCREMENT for table `users`
// //   --
/*
  connection.query(`ALTER TABLE users
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;
  `) 
  */

//rajout colonne username de la table users
/*
 connection.query(`ALTER TABLE users
   ADD username varchar(250) NOT NULL  `,(err,result)=>{
   if(err){
     return console.log(err)
   }
   return console.log("colonne ajouter avec succe"+result)
 });
 connection.query(`ALTER TABLE users
 ADD role varchar(250) NOT NULL default'utilisateur' `,(err,result)=>{
   if(err){
     return console.log(err)
   }
   return console.log("colonne ajouter avec succe"+result)
 });
*/









//Creation de la table reservation
//id va etre modifie pour etre la cle etrangere qui proviendra
//dela table users 
/* 

 connection.query(
   `CREATE TABLE IF NOT EXISTS reservation (
     idReservation INT UNSIGNED  NOT NULL AUTO_INCREMENT,
     ref_Reservation  VARCHAR(250)   NOT NULL DEFAULT '',
     telephone     VARCHAR(30)  NOT NULL, 
     id INT (11) NOT NULL, 
     PRIMARY KEY  (idReservation)
   )`, (err, result) => {
   if (err) {
     return console.log(err)
   }
   return console.log('table creer avec succes' + result)
 });
 */

//ajout de cle primaire a la table reservation
/*
 connection.query(
   `Alter table reservation add foreign key(id) references users(id)`,(err,result)=>{
     if(err){
      return console.log(err)
     }
     return console.log("mise a jour effectue "+result)
   }
 )
 */

//rajout de colonne
/*
dd
 connection.query(`ALTER TABLE reservation
 ADD nbre_place_reserve INT NOT NULL  `,(err,result)=>{
   if(err){
     return console.log(err)
   }
   return console.log("colonne ajouter avec succe"+result)
 });
 */

// ajout colonne idService
/*
dd
 connection.query(`ALTER TABLE reservation
 ADD  idService INT UNSIGNED  NOT NULL  `,(err,result)=>{
   if(err){
     return console.log(err)
   }
   return console.log("colonne ajouter avec succe"+result)
 });
 */

//ajout de cle primaire a la table reservation
/* not create
 connection.query(
   `Alter table reservation add foreign key(idService) references service(idService)`,(err,result)=>{
     if(err){
      return console.log(err)
     }
     return console.log("mise a jour effectue "+result)
   }
 )
 */



//Creation de la table service
/*
dd
 connection.query(
   `CREATE TABLE IF NOT EXISTS service (
     idService INT UNSIGNED  NOT NULL AUTO_INCREMENT,
     Name_Service  VARCHAR(250)   NOT NULL DEFAULT '',
     Description_Service  VARCHAR(250)   NOT NULL DEFAULT '',
     Prix_du_service     DECIMAL(7,2)  NOT NULL, 
     image_du_service LONGBLOB NOT NULL , 
     PRIMARY KEY  (idService)
   )`, (err, result) => {
   if (err) {
     return console.log(err)
   }
   return console.log('table creer avec succes' + result)
 });
 */

// rajout de colonne
/*
 connection.query(`ALTER TABLE service
 ADD nbre_place INT NOT NULL  `,(err,result)=>{
   if(err){
     return console.log(err)
   }
   return console.log("colonne ajouter avec succe"+result)
 });
 */
/*
dd
 connection.query(`ALTER TABLE service
 ADD heure_depart DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00' `,(err,result)=>{
   if(err){
     return console.log(err)
   }
   return console.log("colonne ajouter avec succe"+result)
 });
 */

//creation de la table reservation_service
/*
 connection.query(`CREATE TABLE reservation_service  (
   idReservation   INT UNSIGNED  NOT NULL,
   idService  INT UNSIGNED  NOT NULL,

   PRIMARY KEY ( idReservation, idService),

   FOREIGN KEY ( idReservation)  REFERENCES  reservation  ( idReservation) on delete cascade on update cascade,
   FOREIGN KEY (idService) REFERENCES service (idService) on delete cascade on update cascade)`
 ,(error,result)=>{
 if(error){
   return console.log(error)
 }
 return console.log(result)
 });
*/


//creation de la table payement
/*
dd
 connection.query(
   `CREATE TABLE IF NOT EXISTS payement (
     idPayement INT UNSIGNED  NOT NULL AUTO_INCREMENT,
     idReservation   INT UNSIGNED  NOT NULL,
     date_payement DATETIME NOT NULL DEFAULT NOW(),
     FOREIGN KEY ( idReservation)  REFERENCES  reservation  ( idReservation) on delete cascade on update cascade,
     PRIMARY KEY  (idPayement)
   )`, (err, result) => {
   if (err) {
     return console.log(err)
   }
   return console.log('table creer avec succes' + result)
 });
 */

 //rajout de colonne
 /*
 not create
 connection.query(`ALTER TABLE service
 ADD nbre_place INT NOT NULL  `,(err,result)=>{
   if(err){
     return console.log(err)
   }
   return console.log("colonne ajouter avec succe"+result)
 });
 */


//creation de la table TEMOIGNAGE
/*
dd
 connection.query(
   `CREATE TABLE  temoignage (
     idtemoignage INT UNSIGNED  NOT NULL AUTO_INCREMENT,
     dcrpt_temoignage   varchar(255)  NOT NULL,
     id int(11) NOT NULL,
    
     date_temoignage DATETIME NOT NULL DEFAULT NOW(),
     PRIMARY KEY  (idtemoignage),
     FOREIGN KEY (id)  REFERENCES  users  (id) on delete cascade on update cascade
   )`, (err, result) => {
   if (err) {
     return console.log(err)
   }
   return console.log('table creer avec succes' + result)
 });
 */



//creation de la table propos

// connection.query(
//   `CREATE TABLE apropos  (
//     idPropos INT UNSIGNED  NOT NULL AUTO_INCREMENT,
//     description   longtext COLLATE utf8mb4_unicode_ci  NOT NULL,
//     image LONGBLOB  , 
//     PRIMARY KEY  (idPropos)
//   )`, (err, result) => {
//   if (err) {
//     return console.log(err)
//   }
//   return console.log('table creer avec succes' + result)
// });







let db = {};
//res.status.send('we cannot find that')
//manque insert
db.modifyPassword = (password) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE users SET password = ?', [password], (error) => {
      if (error) {

        return reject(error);
      }

      return resolve('la mise a jour est effectue est succes');
    });
  });
};

db.Apropos = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT description,image FROM apropos ', (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve(users);
    });
  });
};

db.insertPropo = (description, image) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO apropos (description,image) VALUES (?, ?)', [description,image], (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result.insertId);
    });
  });
};

db.inserTemoignage = (description, user) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO temoignage (dcrpt_temoignage,id ) VALUES (?, ?)', [description,user], (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result);
    });
  });
};

db.AllTemoignage = () => {
  return new Promise((resolve, reject) => {

    connection.query('SELECT dcrpt_temoignage ,username,name FROM `temoignage` INNER JOIN users ON temoignage.id=Users.id', (error, users) => {
      if (error) {
        return reject(error)
      }
      if (users[0] === undefined) {

        return reject('vous n\'avez pas encore fait de transaction ')
      }
      return resolve(users)
    });
  })
}




db.insertUser = (name, email, password, username) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO Users (name, email, password,username) VALUES (?, ?,?,?)', [name, email, password, username], (error, result) => {
      if (error) {
        return reject(error);
      }

      return resolve(result.insertId);
    });
  });
};

db.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Users WHERE email = ?', [email], (error, users) => {
      if (error) {
        return reject(error);
      }
      if (users[0] === undefined) {

        return reject(false);
      }
      return resolve(users[0]);
    });
  });
};

db.insertService = (Name_Service, Prix_Service, Description_Service, image, heure_depart, nbre_place) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO service (Name_Service,Description_Service,Prix_du_service,image_du_service,heure_depart,nbre_place) VALUES (?, ?, ?,?,?,?)', [Name_Service, Description_Service, Prix_Service, image, heure_depart, nbre_place], (error, result) => {
      if (error) {

        return reject(error);
      }

      return resolve("le service a bien ete cree");
    });
  });
};


db.allService = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM service ', (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve(users);
    });
  });
};

db.updateService = (Name_Service, Prix_Service, image, Description_Service, heure_depart, nbre_place, result) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE service SET Name_Service = ?, Prix_du_Service=?,image_du_service= ?, Description_Service= ?,  heure_depart=?,nbre_place=? WHERE idService = ?', [Name_Service, Prix_Service, image, Description_Service, heure_depart, nbre_place, result], (error) => {
      if (error) {

        return reject(error);
      }

      return resolve('la mise a jour est effectue est succes');
    });
  });
};


db.getOne = (idService) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT idService FROM service WHERE idService = ?', [idService], (error, users) => {
      if (error) {

        return reject(error);
      }
      if (users[0] === undefined) {

        return reject(false);
      }

      return resolve(users[0].idService);


    });
  });

}

db.getOneService = (idService) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT idService FROM service WHERE idService = ?', [idService], (error, users) => {
      if (error) {

        return reject(error);
      }

      if (users[0] === undefined) {

        return reject('le service n\'existe pas')
      }



      return resolve(users[0].idService);


    });
  });

}



db.deleteService = (idService) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM service WHERE idservice = ?', [idService], (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve('le service est supprime avec succes');
    });
  });
};


//reservation
db.reservation = (idClient, telephone, ref_reservation1, nbre_place_reserve, idService) => {
  return new Promise((resolve, reject) => {
    connection.query('insert into reservation (id ,ref_Reservation ,telephone ,nbre_place_reserve,idService) values(?,?,?,?,?)', [idClient, ref_reservation1, telephone, nbre_place_reserve, idService], (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve(users.insertId);
    });
  });
};
// db.reservation_service = (idClient, idService) => {
//   return new Promise((resolve, reject) => {
//     connection.query('insert into reservation_service (idReservation ,idService) values(?,?)', [idClient, idService], (error, users) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve(users);
//     });
//   });
// };

db.payement = (idReservation) => {
  return new Promise((resolve, reject) => {
    connection.query('insert into payement (idReservation ) values(?)', [idReservation], (error, users) => {
      if (error) {
        return reject(error);
      }
      return console.log(resolve(users));
    });
  });
};


db.AllServiceWithid = (idService) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT Name_Service,Description_Service, Prix_du_service FROM service WHERE idService = ?', [idService], (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve(users);
    });
  });
};

db.transaction = (id) => {
  return new Promise((resolve, reject) => {

    connection.query('SELECT telephone,nbre_place_reserve,Name_Service,Description_Service,Prix_du_service,date_payement FROM `reservation` INNER JOIN service ON reservation.idService=service.idService INNER JOIN Users ON Users.id=reservation.id INNER JOIN payement ON payement.idReservation=reservation.idReservation WHERE Users.id=?', [id], (error, users) => {
      if (error) {
        return reject(error)
      }
      if (users[0] === undefined) {

        return reject('vous n\'avez pas encore fait de transaction ')
      }
      return resolve(users)
    });
  })
}



module.exports = { connection, db };
