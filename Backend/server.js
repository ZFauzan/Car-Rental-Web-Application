const express = require('express')
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000

require('dotenv').config()
   const mysql = require('mysql2');
const { Console } = require('console');
const e = require('express');
const { resolve } = require('path');

   var connection = mysql.createConnection({
      host: 'us-east.connect.psdb.cloud',
      user: '9s6afonv37ew9npefe1i',
      database: 'wheelstogo',
      password: 'pscale_pw_uoPfKWfnlcMraYMYBhxJZyyatXRjBVBxMSXgNZqrlFw',
      ssl: {}
  });

// Returns all the vehicles at a particular branch
app.get('/getVehicles*', async (req, res) => {
   res.sendFile('./views/reservationDetails.html', {root: __dirname});
   const valuesArray = req.originalUrl.split("/")
   let branchId = valuesArray[2]
   let val = await getVehicles(branchId);
   console.log(req.protocol + "://" + req.headers.host + val);
   ;})


app.get('/getCustomer*', async (req, res) => {
   res.sendFile('./views/reservationDetails.html', {root: __dirname});
   const valuesArray = req.originalUrl.split("/")
   let firstName = valuesArray[2]
   let lastName = valuesArray[3]
   let val = await getCustomer(firstName, lastName);
   console.log(req.protocol + "://" + req.headers.host + val);
   ;})

app.get('/getRentalInfo*', async (req, res) => {
   res.sendFile('./views/reservationDetails.html', {root: __dirname});
   const valuesArray = req.originalUrl.split("/")
   let reservationId = valuesArray[2]
   let val = await getRentalInfo(reservationId);
   console.log(req.protocol + "://" + req.headers.host + val);
   ;})

//   postRentalInfo/101/00/000/000/2022-11-30/2022-12-05/2022-10-29
app.get('/postRentalInfo*', async (req, res) => {
   res.sendFile('./views/reservationDetails.html', {root: __dirname});
   const valuesArray = req.originalUrl.split("/")
   let reservationId = valuesArray[2]; 
   let branchId = valuesArray[3];
   let customerId = valuesArray[4]; 
   let carModelId = valuesArray[5]; 
   let datePickup = valuesArray[6];
   let dateDropoff = valuesArray[7]; 
   let dateReservation= valuesArray[8]; 
   let val = await postRentalInfo(reservationId, branchId, customerId, carModelId, datePickup, dateDropoff, dateReservation);
   console.log(req.protocol + "://" + req.headers.host + val);
   ;})

//   postCustomerInfo/2029/Erix/Munoz/1977-07-01/664/emunoz@email.ca/4163471991/false
//    customerId, firstName, lastName, dateBirth, licenseNumber, email, phoneNumber, statusEmailSub
app.get('/postCustomerInfo*', async (req, res) => {
   res.sendFile('./views/reservationDetails.html', {root: __dirname});
   const valuesArray = req.originalUrl.split("/")
   let customerId = valuesArray[2]; 
   let firstName = valuesArray[3];
   let lastName = valuesArray[4]; 
   let dateBirth = valuesArray[5]; 
   let licenseNumber = valuesArray[6];
   let email = valuesArray[7]; 
   let phoneNumber= valuesArray[8]; 
   let statusEmailSub= valuesArray[9]; 
   let val = await postCustomerInfo(customerId, firstName, lastName, dateBirth, licenseNumber, email, phoneNumber, statusEmailSub);
   console.log(req.protocol + "://" + req.headers.host + val);
   ;})


// to query all branches
app.get("/get-branches", async (req, res) => {
    connection.query(`SELECT * FROM branches`, function (err, rows) {
        if (err) throw err
        //console.log(rows) 
        res.json({ rows });
    });
  });

// to query all car models for a given branch in a specific sort order
// example::: http://localhost:5000/get-cars/10/Price will return all car models for branch#10 and order the results by priceDaily
app.get("/get-cars*", async (req, res) => {
    const valuesArray = req.originalUrl.split("/");
    console.log(valuesArray);
    branch = valuesArray[2];
    sortType = getSortQuery(valuesArray[3]); // see helper function below
    connection.query(`SELECT cm.*, c.priceDaily, c.trips FROM cars c, carModels cm WHERE c.modelId=cm.modelId AND c.branchId=${branch} ${sortType}`, function (err, rows) {
        if (err) throw err
        res.json({ rows });
    });
  });

function getSortQuery(sortType){ //helper function for get-cars*
    switch(sortType){
        case "Make": return " ORDER BY cm.make";
        case "Price": return " ORDER BY c.priceDaily";
        case "Seatcount": return " ORDER BY cm.seatCapacity DESC";
        default: return "ORDER BY c.trips DESC";
    }
}
     
// to query all customers
app.get("/get-customers", async (req, res) => {
    connection.query(`SELECT * FROM customers`, function (err, rows) {
        if (err) throw err
        res.json({ rows });
    });
  });

// to DELETE LAST CUSTOMER (make variable later)
app.get("/delete-last-customer", async (req, res) => {
    connection.query(`DELETE FROM customers WHERE customerId=69696969`, function (err, rows) {
        if (err) throw err
        res.json({ rows });
    });
  });
  
// to query all reservations
app.get("/get-reservations", async (req, res) => {
    connection.query(`SELECT * FROM reservations`, function (err, rows) {
        if (err) throw err
        res.json({ rows });
    });
  });

// to query reservation
app.get("/get-rental*", async (req, res) => {
    const valuesArray = req.originalUrl.split("/");
    console.log(valuesArray);
    rentalId = valuesArray[2];
    connection.query(`SELECT r.*, c.*, cm.*, car.priceDaily, b.*, c.phoneNumber AS 'customerPhone', b.phoneNumber AS 'branchPhone' FROM reservations r, customers c, carModels cm, cars car, branches b WHERE r.reservationId=${rentalId} AND r.customerId=c.customerId AND r.carModelId=cm.modelId AND car.modelId=r.carModelId AND r.branchId=car.branchId AND r.branchId=b.branchId`, function (err, rows) {
        if (err) throw err
        res.json({ rows });
    });
  });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Can get all vehicles based on branch but need to incorporate the dates some how
async function getVehicles(branch){
   return new Promise(resolve => {
      connection.query(`SELECT * FROM cars WHERE branchId = ${branch}`, function (err, rows) {
      if (err) throw err
      let newPath = "?"
      rows.forEach(function(item, index){
         if (index == 0){
            newPath = newPath.concat("modelId=" + item.modelId + "&priceDaily=" + item.priceDaily+ "&trips=" + item.trips)
         }else{
            newPath = newPath.concat("&modelId=" + item.modelId + "&priceDaily=" + item.priceDaily+ "&trips=" + item.trips)
         }
      });
      resolve(newPath);
   });
})
}

// Gets customer info
async function getCustomer(firstName, lastName){
   return new Promise(resolve => {
      connection.query(`SELECT * FROM customers WHERE firstName = '${firstName}' AND lastName = '${lastName}'`, function (err, rows) {
         if (err) throw err
         let newPath = "?"
         newPath = newPath.concat("customerId=" + rows[0].customerId + "&firstName=" + rows[0].firstName + "&lastName=" + 
         rows[0].lastName + "&dateBirth=" + rows[0].dateBirth.toISOString() + "&licenseNumber=" + rows[0].licenseNumber + "&email=" + 
         rows[0].email + "&phoneNumber=" + rows[0].phoneNumber + "&statusEmailSub=" + rows[0].statusEmailSub)
         resolve(newPath)
      });
   })
}


// Gets the rental information for that one ID
// Test with http://localhost:3000/getRentalInfo/3919801
async function getRentalInfo(resID){
   return new Promise(resolve => {
   connection.query(`SELECT * FROM reservations WHERE reservationId = ${resID}`, function (err, rows) {
      if (err) throw err
      let newPath = "?"
      newPath = newPath.concat("reservationId=" + rows[0].reservationId + "&branchId=" + rows[0].branchId + "&customerId=" + rows[0].customerId +
      "&carModelId=" + rows[0].carModelId + "&datePickup=" + rows[0].datePickup.toISOString() + "&dateDropoff=" + rows[0].dateDropoff.toISOString() +
      "&dateReservation=" + rows[0].dateReservation.toISOString() + "&status=" + rows[0].status)
      resolve(newPath) 
   });
})
}

// Creates a new reservation in the database, determines the status of the reservation as well based on todays date
async function postRentalInfo(reservationId, branchId, customerId, carModelId, datePickup, dateDropoff, dateReservation){
   return new Promise(resolve => {
   let date = new Date().toISOString().slice(0, 10)
   let status = ''
    if (date >= datePickup & date <= dateDropoff){
      status = 'Ongoing'
    }else if(date > dateDropoff){
      status = 'Complete'
    }else{
      status = 'Scheduled'
    }

    //console.log("POST RENTAL");
    //console.log(`${reservationId}, ${branchId}, ${customerId}, ${carModelId}, '${datePickup}', '${dateDropoff}', '${dateReservation}', '${status}'`);
   connection.query(`INSERT INTO 
   reservations(reservationId, branchId, customerId, carModelId, datePickup, dateDropoff, dateReservation, status)
   VALUES (${reservationId}, ${branchId}, ${customerId}, ${carModelId}, '${datePickup}', '${dateDropoff}', '${dateReservation}', '${status}')`, function (err){
      if (err){
         let errorTxt = err.sqlMessage;
         let codeErr = errorTxt.substring(errorTxt.indexOf("code"));
         let errorArrays = codeErr.split(" ");
         resolve(`&RentalCreationFailure/${errorTxt}`);
      }else{
      resolve("&RentalCreatedSuccesfully");
      }
 });
})
}

 // Creates a new customer in the database
 async function postCustomerInfo(customerId, firstName, lastName, dateBirth, licenseNumber, email, phoneNumber, statusEmailSub){
   return new Promise(resolve => {

    console.log("POST CUSTOMER");
    console.log(`${customerId}, '${firstName}', '${lastName}', '${dateBirth}', '${licenseNumber}', '${email}', ${phoneNumber}, ${statusEmailSub})`);
   connection.query(`INSERT INTO 
  customers(customerId, firstName, lastName, dateBirth, licenseNumber, email, phoneNumber, statusEmailSub)
  VALUES (${customerId}, '${firstName}', '${lastName}', '${dateBirth}', '${licenseNumber}', '${email}', ${phoneNumber}, ${statusEmailSub})`, function (err){
   if (err){
      console.log("erriwoo", err);
      let errorTxt = err.sqlMessage;
      let codeErr = errorTxt.substring(errorTxt.indexOf("code"));
      let errorArrays = codeErr.split(" ");
      resolve(`&RentalCreationFailure/${errorArrays[2]}`);
   }else{
   resolve("&CustomerCreatedSuccesfully");
   }
  });
})
}