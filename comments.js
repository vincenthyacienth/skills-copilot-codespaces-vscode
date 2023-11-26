// Create web server 

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');

const PORT = 3004;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Get all comments for a specific product
app.get('/comments/:product_id', (req, res) => {
  const { product_id } = req.params;
  axios.get(`http://localhost:3001/comments/${product_id}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error getting comments from database: ', err);
      res.sendStatus(500);
    });
});

// Create a new comment for a specific product
app.post('/comments/:product_id', (req, res) => {
  const { product_id } = req.params;
  axios.post(`http://localhost:3001/comments/${product_id}`, req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error creating comment in database: ', err);
      res.sendStatus(500);
    });
});

// Update a comment for a specific product
app.put('/comments/:product_id/:comment_id', (req, res) => {
  const { product_id, comment_id } = req.params;
  axios.put(`http://localhost:3001/comments/${product_id}/${comment_id}`, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error updating comment in database: ', err);
      res.sendStatus(500);
    });
});

// Delete a comment for a specific product
app.delete('/comments/:product_id/:comment_id', (req, res) => {
  const { product_id, comment_id } = req.params;
  axios.delete(`http://localhost:3001/comments/${product_id}/${comment_id}`)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error deleting comment in database: ', err);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});