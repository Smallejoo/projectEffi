// test.js
const axios = require('axios');

const itemsToAdd = [
  {
    name: 'Item 1',
    price: 10,
    img: 'https://example.com/image1.jpg'
  },
  {
    name: 'Item 2',
    price: 20,
    img: 'https://example.com/image2.jpg'
  }
];

axios.post('http://localhost:3000/getitems/add', itemsToAdd)
  .then(response => {
    console.log('Response from server:', response.data);
  })
  .catch(error => {
    console.error('Error adding items:', error.response ? error.response.data : error.message);
  });
