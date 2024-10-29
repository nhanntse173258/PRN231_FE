<template>
    <div class="adopt">
      <h1>Adopt a Cat</h1>
      <div class="cat-list">
        <CatCard v-for="cat in cats" :key="cat.id" :cat="cat" />
      </div>
    </div>
  </template>
  
  <script>
  import CatCard from './components/CatCard.vue';
  
  export default {
    name: 'Adopt',
    components: {
      CatCard
    },
    data() {
      return {
        cats: [
          { id: 1, name: 'Fluffy', description: 'A playful kitten.', image: 'fluffy.jpg' },
          { id: 2, name: 'Whiskers', description: 'Loves cuddles.', image: 'whiskers.jpg' },
          // Add more cats here
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .cat-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  </style>
  