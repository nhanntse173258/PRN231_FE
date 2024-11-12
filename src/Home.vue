<template>
    <div class="home">
      <section class="hero">
        <h1>Welcome to Cat Adoption</h1>
        <p>Find your perfect feline friend today!</p>

        <div class="cats-buttons">
          <router-link to="/adopt" class="cta-button">Adopt a Cat</router-link>
          <router-link v-if="isStaff" to="/cat/create" class="cta-button">Add a Cat</router-link>
          <router-link v-if="isStaff" to="/adopt/application" class="cta-button">View Applications</router-link>
          <router-link v-if="isStaff" to="/appointment/create" class="cta-button">Add an Appointment</router-link>
          <router-link v-if="isStaff" to="/contract/create" class="cta-button">Add a Contract</router-link>
          <router-link v-else-if="userId" :to="`/adopt/application/user/${userId}`" class="cta-button">My Applications</router-link>
        </div>
        <router-link to="/Donation" class="cta-button">Donation</router-link>
      </section>
  
      <section class="featured-cats">
        <h2>Featured Cats</h2>
        <div class="cat-list">
          <CatCard v-for="cat in cats" :key="cat.id" :cat="cat" />
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import CatCard from './components/CatCard.vue';
  import api from './api';
  import { jwtDecode } from 'jwt-decode';
  export default {
    name: 'Home',
    components: {
      CatCard
    },
    
    data() {
      return {
        userId: null,
        cats: [], // Initialize an empty array for cats
        isStaff: false,
      };
    },
    created() {
      if (localStorage.getItem('userRole') === 'Staff') this.isStaff = true;
      
      const token = localStorage.getItem('jwt');
      this.userId = token ? jwtDecode(token).unique_name : null;

      // Fetch cats data
      api.get('/cats?page=1&pageSize=2')
        .then(response => {
          if (response.data.success) 
          {
            this.cats = response.data.data;

            // Fetch images data
            return api.get('/Image');
          } else {
            console.error("Error fetching cats:", response.data.message);
          }
        })
        .then(response => {
          if (response && response.data.success) {
            const images = response.data.data;

            // Attach images to their respective cats based on entityId
            this.cats = this.cats.map(cat => {
              var catImage = images.find(image => image.entityId === cat.catId && image.entityType === 'Cat' && image.isPrimary);
              if (!catImage) catImage = images.find(image => image.entityId === cat.catId && image.entityType === 'Cat');
              cat.Image = catImage ? catImage.imageUrl : "placeholder.jpg"
              return {
                ...cat
              };
            });
          } 
          else 
          {
            console.error("Error fetching images:", response?.data?.message);
          }
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
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

  .cats-buttons {
    margin-top: 4%;
  }
  </style>
  