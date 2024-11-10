<template>
  <div class="adopt">
    <h1>Adopt a Cat</h1>
    <div class="cat-list">
      <CatCard v-for="cat in cats" :key="cat.catId" :cat="cat" />
    </div>
  </div>
</template>

<script>
import CatCard from './components/CatCard.vue';
import api from './api';

export default {
  name: 'Adopt',
  components: {
    CatCard
  },
  data() {
    return {
      cats: [] // Initialize an empty array for cats
    };
  },
  created() {
    // Fetch cats data
    api.get('/cats')
      .then(response => {
        if (response.data.success) {
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
            const catImage = images.find(image => image.entityId == cat.catId);
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
};
</script>

<style scoped>
.cat-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
