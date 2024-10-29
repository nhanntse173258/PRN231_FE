<template>
    <div class="cat-card">
      <img :src="cat.image || 'placeholder.jpg'" alt="cat image" />
      <h3>{{ cat.name }}</h3>
      <p>{{ cat.description }}</p>
      <router-link :to="'/adopt/' + cat.id" class="adopt-button">Adopt Me</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CatCard',
    props: {
      cat: Object
    }
  }
  </script>
  
  <style scoped>
  .cat-card {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 15px;
    margin: 10px;
    width: 200px;
    text-align: center;
  }
  
  .cat-card img {
    width: 100%;
    height: auto;
  }
  
  .adopt-button {
    background-color: #ffab00;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
  }
  </style>
  