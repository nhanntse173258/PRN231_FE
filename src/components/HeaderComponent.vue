<template>
    <header class="header">
      <nav class="navbar">
        <a href="/" class="logo">Cat Adoption</a>
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/adopt">Adopt a Cat</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent'
  }
  </script>
  
  <style scoped>
  .header {
    background-color: #ffab00;
    padding: 20px;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-links {
    list-style-type: none;
  }
  
  .nav-links li {
    display: inline;
    margin-left: 20px;
  }
  
  .nav-links a {
    text-decoration: none;
    color: white;
  }
  </style>
  