<template>
  <div class="cat-card">
    <img :src="cat.Image" alt="cat image" />
    <h3>{{ cat.name }}</h3>
    <p>Gender: {{ cat.gender || 'Unknown.' }}</p>
    <p>{{ cat.age || 'Unknown.' }} year(s) old</p>

    <div class="card-button">
      <router-link :to="`/adopt/application/${cat.catId}`" class="adopt-button">Adopt Me</router-link>
      <br>
      <router-link :to="`/cat-profile/${cat.catId}`" class="view-profile-button">View Profile</router-link>
    </div>
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
  background-color: #e1e1e1;
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px;
  width: 200px;
  text-align: center;
  color: rgb(36, 36, 36);
}

.cat-card img {
  width: 100%;
  height: auto;
}

.card-button {
  margin-top: 2%;
  display: block;
}

.adopt-button {
  background-color: #ffab00;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  min-width: 100%;
}

.view-profile-button {
  min-width: 100%;
  background-color: #ffab00;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
}
</style>
