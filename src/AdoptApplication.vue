<template>
    <div class="application-page">
      <h1>Adoption Application</h1>
      <form @submit.prevent="submitApplication">
        <div class="form-group">
          <label for="catId">Cat ID</label>
          <input type="number" v-model="catId" id="catId" disabled />
        </div>
  
        <div class="form-group">
          <label for="userId">User ID</label>
          <input type="number" v-model="userId" id="userId" disabled />
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
  import { useRoute, useRouter } from 'vue-router';
  import api from './api';
  import { jwtDecode } from 'jwt-decode';

  export default {
      name: 'AdoptionApplicationPage',
      setup() {
        const route = useRoute();
        const router = useRouter();

        const catId = parseInt(route.params.id); // Extracts catId from the route
        const token = localStorage.getItem('jwt');
        const message = ref('');

        let userId = null;

        if (token) {
          try 
          {
            const decoded = jwtDecode(token);
            userId = decoded.unique_name;
          } 
          catch (error) 
          {
            console.error("Failed to decode token:", error);
            message.value = 'Invalid or expired token. Please log in again.';
            router.push('/login'); // Redirect to login if token is invalid
          }
        } 
        else {
          message.value = 'Please log in to access this page.';
          router.push('/login'); // Redirect to login if no token is found
        }

        const applicationData = reactive({
          userId: userId,
          adoptionFee: 0,
          applicationDate: new Date().toISOString().split('T')[0], // Default to today's date
          adoptionDate: null,
        });

        const submitApplication = async () => {
          try {
            const response = await api.post(`/adoptionApplications`, {
              catId: catId,
              adopterId: userId,
              adoptionFee: applicationData.adoptionFee,
              applicationDate: applicationData.applicationDate,
              adoptionDate: applicationData.adoptionDate,
            });

            if (response.data.data) message.value = 'Application submitted successfully!';
            console.log(response);
          } catch (error) {
            message.value = 'Failed to submit application. Please try again.';
            console.error(error);
          }
        };

        return {
          catId,
          userId,
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
    margin: 2.5% auto;
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
  