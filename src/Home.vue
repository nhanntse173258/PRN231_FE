<template>
    <div class="home">
      <section class="hero">
        <h1>Welcome to Cat Adoption</h1>
        <p>Find your perfect feline friend today!</p>
        <router-link to="/adopt" class="cta-button">Adopt a Cat</router-link>
      </section>
  
      <section class="featured-cats">
        <h2>Featured Cats</h2>
        <div class="cat-list">
          <CatCard v-for="cat in featuredCats" :key="cat.id" :cat="cat" />
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import CatCard from './components/CatCard.vue';
  
  export default {
    name: 'Home',
    components: {
      CatCard
    },
    data() {
      return {
        featuredCats: [
          { id: 1, name: 'Fluffy', description: 'A playful kitten.' },
          { id: 2, name: 'Whiskers', description: 'Loves cuddles.' },
          // Add more cats here
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .hero {
    background-image: url('/path/to/hero-image.jpg');
    background-size: cover;
    color: white;
    padding: 50px;
    text-align: center;
  }
  
  .cta-button {
    background-color: #ffab00;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
  }
  
  .featured-cats {
    padding: 20px;
  }
  
  .cat-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  </style>
  