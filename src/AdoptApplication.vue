<template>
    <div class="application-page">
      <h1>Adoption Application</h1>
      <form @submit.prevent="submitApplication">
        <div class="form-group">
          <label for="catId">Cat ID</label>
          <input type="number" v-model="catId" id="catId" disabled />
        </div>
  
        <div class="form-group">
          <label for="adoptionFee">Adoption Fee</label>
          <input type="number" v-model="applicationData.adoptionFee" id="adoptionFee" disabled />
        </div>
  
        <div class="form-group">
          <label for="applicationDate">Application Date</label>
          <input type="date" v-model="applicationData.applicationDate" id="applicationDate" disabled />
        </div>
  
        <div class="form-group">
          <label for="adoptionDate">Adoption Date (Leave blank if you haven't decided)</label>
          <input type="date" v-model="applicationData.adoptionDate" id="adoptionDate" />
        </div>
  
        <button type="submit">Submit Application</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import api from './api';

  export default {
    name: 'AdoptionApplicationPage',
    setup() {
      const route = useRoute();
      const catId = parseInt(route.params.id);  // Extracts catId from the route
      const userId = 1; // Assume the current user ID is known (e.g., from an auth system)
  
      const applicationData = reactive({
        adoptionFee: 100000,
        applicationDate: new Date().toISOString().split('T')[0], // Default to today's date
        adoptionDate: null,
      });
  
      const message = ref('');
  
      const submitApplication = async () => {
        try {
          const response = await api.post(`/adoptionApplications`, {
            catId: catId,
            adopterId: userId,
            adoptionFee: applicationData.adoptionFee,
            applicationDate: applicationData.applicationDate,
            adoptionDate: applicationData.adoptionDate,
          });
          message.value = 'Application submitted successfully!';
        } catch (error) {
          message.value = 'Failed to submit application. Please try again.';
          console.error(error);
        }
      };
  
      return {
        catId,
        applicationData,
        submitApplication,
        message,
      };
    },
  };
  </script>
  
  <style scoped>
  .application-page {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  input[disabled] {
    background-color: #f0f0f0;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  p {
    margin-top: 15px;
    color: green;
  }
  </style>
  