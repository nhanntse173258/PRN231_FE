<template>
  <div class="adopt">
    <h1>Adopt a Cat</h1>
    <div class="cat-list">
      <CatCard v-for="cat in cats" :key="cat.catId" :cat="cat" />
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">◄</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">►</button>
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
      cats: [], // Initialize an empty array for cats
      currentPage: 1, // Start with the first page
      totalPages: 1, // Default total pages to 1
    };
  },

  methods: {
    // Fetch all cats to calculate total pages (assuming large page size)
    fetchTotalCats() {
      api.get('/cats?page=1&pageSize=10000')  // Request with large page size to fetch all cats
        .then(response => {
          if (response.data.success) {
            // Calculate total pages
            this.totalPages = Math.ceil(response.data.data.length / 5);
            this.fetchCats();  // Fetch cats data for the current page
          } else {
            console.error("Error fetching cats:", response.data.message);
          }
        })
        .catch(error => {
          console.error("Error fetching total cats:", error);
        });
    },

    // Fetch cats data based on the current page
    fetchCats() {
      api.get(`/cats?page=${this.currentPage}&pageSize=5`)
        .then(response => {
          if (response.data.success) {
            this.cats = response.data.data;
            this.fetchImages(); // Fetch images after cats data
          } else {
            console.error("Error fetching cats:", response.data.message);
          }
        })
        .catch(error => {
          console.error("Error fetching cats:", error);
        });
    },

    // Fetch images and associate them with the cats
    fetchImages() {
      api.get('/Image')
        .then(response => {
          if (response.data.success) {
            const images = response.data.data;

            // Attach images to their respective cats based on entityId
            this.cats = this.cats.map(cat => {
              const catImage = images.find(image => image.entityId === cat.catId && image.entityType === 'Cat');
              cat.Image = catImage ? catImage.imageUrl : "placeholder.jpg";
              return cat;
            });
          } else {
            console.error("Error fetching images:", response.data.message);
          }
        })
        .catch(error => {
          console.error("Error fetching images:", error);
        });
    },

    // Handle page change
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchCats(); // Re-fetch cats based on the new page
      }
    }
  },

  created() {
    this.fetchTotalCats(); // Fetch all cats initially to calculate total pages
  }
};
</script>

<style scoped>
.cat-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px;
  margin: 0 10px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
