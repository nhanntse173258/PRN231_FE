<template>
    <div class="cat-profile" v-if="catData">
      <!--<h2>{{ catData.name || 'No Name Available' }}</h2>-->
      <img :src="catData.image || 'default-image.jpg'" alt="cat image" />
      <p><strong>Health Status:</strong> {{ catData.healthStatus }}</p>
      <p><strong>Arrival Date:</strong> {{ formattedArrivalDate }}</p>
      <p><strong>Vaccination Status:</strong> {{ catData.vaccinationStatus }}</p>
      <p><strong>Description:</strong> {{ catData.description }}</p>
    </div>
    <p v-else>Loading...</p> <!-- Optional loading message -->
    <router-link to="/" class="back-button">Back to Home</router-link>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import api from '../api';
  
  export default {
    name: 'CatProfile',
    props: ['catId'],
    setup(props) {
      const catData = ref({});
  
      // Fetch the cat profile data when the component mounts
      onMounted(async () => {
        try {
          const response = await api.get(`/catProfiles/cat-id/${props.catId}`);
          catData.value = response.data.data; // Assuming response.data contains the profile data
          console.log('catData:', catData.value);
        } catch (error) {
          console.error('Failed to fetch cat data:', error);
        }
      });
  
      // Format arrival date to a readable format
      const formattedArrivalDate = computed(() => {
        if (catData.value.arrivalDate) {
          return new Date(catData.value.arrivalDate).toLocaleDateString();
        }
        return 'N/A';
      });
  
      return {
        catData,
        formattedArrivalDate,
      };
    },
  };
  </script>
  
  <style scoped>
  .cat-profile {
    max-width: 500px;
    margin: auto;
    text-align: center;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .cat-profile img {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .back-button {
    background-color: #ffab00;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
  }
  
  p {
    color: #FFF;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }
  </style>
  