import React, { useState } from 'react';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Transports from './components/pages/Transports';
import TransportEdit from './components/pages/TransportEdit';
//import Sales from './pages/Sales';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/transports'exact element={<Transports/>} />
          <Route path='/transports/add'exact element={<TransportEdit/>} />
          <Route path='/transports/edit/:id'exact element={<TransportEdit/>} />
          {/* <Route path='/sales' component={Sales} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//connectng to database
const express = require('express');
const res = require('express/lib/response');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ABCRecycling'
});

//connection
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL Connected!');
});

const app = express();

//create db
app.get('/createdb', (req, res) => {
    let sql = 'CREAE DATABASE ABCRecycling';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    })
}) 

//create table
app.get('/createcartable', () => {
    let sql = 'create table cars(carId int, registrationNumber varchar(20), overviewDate date)';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Cars created...');
    })
})

//insert example
app.get('/addcar', (req, res) => {
    let car1 = {carId: 1, registrationNumber: 'WL19283'};
    let sql = 'INSERT INTO cars SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Cars created...');
    })
})

//select example
app.get('/getcars/:id', (req, res) => {
    let sql = `select * from cars where id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Car fetched...');
    })
})

//update example
app.get('/updatecar/:id', (req, res) => {
    let newId = 'Updated';
    let sql = `update Cars set title = '${newId}' where carId = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Car updated...');
    })
})

//delete example
app.get('/deletecar/:id', (req, res) => {
    let sql = `delete from cars where id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Car deleted...');
    })
})

app.listen('3306', () => {
    console.log('Server started on port 3306');
});


