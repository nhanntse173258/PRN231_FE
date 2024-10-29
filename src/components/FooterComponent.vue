<template>
    <footer class="footer">
      <p>&copy; 2024 Cat Adoption. All rights reserved.</p>
      <p><a href="/privacy-policy">Privacy Policy</a></p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent'
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #333;
    color: white;
    padding: 20px 0;
    position: relative;
    bottom: 0;
    width: 100%;
  }
  
  .footer a {
    color: #ffab00;
    text-decoration: none;
  }
  </style>
  