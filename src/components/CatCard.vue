<template>
  <div class="cat-card">
    <img :src="cat.Image" alt="cat image" />
    <h3>{{ cat.name }}</h3>
    <p>Gender: {{ cat.gender || 'Unknown.' }}</p>
    <p>{{ cat.age || 'Unknown.' }} year(s) old</p>

    <div class="card-button">
      <router-link :to="`/cat-profile/${cat.catId}`" class="view-profile-button">View Profile</router-link>
      <br>
      <router-link v-if="!sent" :to="`/adopt/application/send/${cat.catId}`" class="adopt-button">Adopt Me</router-link>
      <router-link v-else :to="`/adopt/application/user/${userId}`" class="application-sent-button">Application sent</router-link>
    </div>
  </div>
</template>

<script>
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import { ref, onMounted } from 'vue';

export default {
  name: 'CatCard',
  props: {
    cat: Object
  },
  setup(props) {
    const token = localStorage.getItem('jwt');
    const userId = token ? jwtDecode(token).unique_name : null;
    const sent = ref(false);
    const applicationStatus = ref('');

    // Check if there's an existing adoption application for this user and cat
    onMounted(async () => {
      if (userId) {
        try {
          const response = await api.get(`/adoption-applications/by-adopter-and-cat/${userId}?catId=${props.cat.catId}`);
          if (response.data.success && response.data.data) 
          {
            sent.value = true;
            applicationStatus.value = response.data.data.applicationStatus;
          }
        }
        catch (error) {
          // 404 specifically is intentional
          if (error.response && error.response.status === 404) {
            sent.value = false;
          } 
          else {
            console.error("An error occurred:", error);
          }
        }
      }
    });

    return {
      sent,
      userId,
      applicationStatus
    };
  }
};
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

.adopt-button, .view-profile-button {
  background-color: #ffab00;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  min-width: 100%;
}

.application-sent-button {
  background-color: #00c63f;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  min-width: 100%;
}
</style>
