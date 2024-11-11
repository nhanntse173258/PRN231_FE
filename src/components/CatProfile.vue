<template>
  <div class="cat-profile" v-if="catData && catData.arrivalDate">
    <!-- Display Cat Icon -->
    <img :src="catData.icon || 'default-image.jpg'" alt="cat icon" class="cat-icon" />
    
    <p><strong>Health Status:</strong> {{ catData.healthStatus }}</p>
    <p><strong>Arrival Date:</strong> {{ formattedArrivalDate }}</p>
    <p><strong>Vaccination Status:</strong> {{ catData.vaccinationStatus }}</p>
    <p><strong>Description:</strong> {{ catData.description }}</p>
    
    <div>
      <strong>Gallery:</strong>
      <div class="gallery">
        <img v-for="(image, index) in catData.images" :key="index" :src="image" alt="cat image" class="gallery-image" />
      </div>
    </div>
    
    <br />
    <router-link style="margin-right:2%" :to="`/adopt/application/send/${catId}`" class="back-button">Adopt this Cat</router-link>
    <router-link to="/" class="back-button">Back to Home</router-link>
  </div>
  
  <!-- Show if catData is empty or doesn't have an id -->
  <div v-else class="no-profile">
    <p>No profile found for this cat.</p>
    <router-link v-if="isStaff" :to="`./create/${catId}`" class="create-profile-button">Create Profile</router-link>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import api from '../api';
import { useRoute } from 'vue-router';

export default {
  name: 'CatProfile',
  props: [
    'catId'
  ],

  setup(props) {
    const route = useRoute(); // Access the current route

    const catId = route.params.id; // Get the catId from the route

    // Reactive check for staff role
    const isStaff = computed(() => localStorage.getItem('userRole') === 'Staff');
    
    const catData = ref(null);

    // Fetch the cat profile data when the component mounts
    onMounted(async () => {
      try {
        // Fetch the cat profile
        const catDataResponse = await api.get(`/catProfiles/cat-id/${props.catId}`);
        catData.value = catDataResponse.data.data; // Assuming response.data contains the profile data

        // Fetch images associated with the cat profile
        const catImageResponse = await api.get(`/Image/${props.catId}/Cat`);
        if (catImageResponse.data.data) {
          // Assuming the images are returned as an array of objects, each containing imageUrl and isPrimary
          const images = catImageResponse.data.data;

          // Find the image with isPrimary = true, if available
          const primaryImage = images.find(image => image.isPrimary);

          // If a primary image exists, set it as the icon
          if (primaryImage) {
            catData.value.icon = primaryImage.imageUrl;
          } else {
            // If no primary image, just set the first image in the list as the icon
            catData.value.icon = images[0].imageUrl;
          }

          // Assign the images to the gallery
          catData.value.images = images.map(image => image.imageUrl);
        }

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
      isStaff
    };
  },
};
</script>

<style scoped>
.cat-profile {
  max-width: 100%;
  margin: 2.5% auto;
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

.cat-icon {
  max-width: 100%;
  max-height: 100%;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 100%;
}

.gallery-image {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
}

.back-button {
  background-color: #ffab00;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
}

.no-profile {
  text-align: center;
  padding: 20px;
}

.create-profile-button {
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 8px;
  display: inline-block;
  margin-top: 10px;
}

.create-profile-button:hover {
  background-color: #45a049;
}

p {
  color: #FFF;
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
}
</style>
