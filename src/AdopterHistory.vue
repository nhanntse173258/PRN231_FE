<template>
    <div class="adopter-history">
      <h1>Adoption and Appointment History</h1>
  
      <section v-if="applications.length">
        <h2>Adoption Applications</h2>
        <ul>
          <li v-for="application in applications" :key="application.applicationId">
            <strong>Cat Name:</strong> {{ application.catName }} <br />
            <strong>Application Date:</strong> {{ formatDate(application.applicationDate) }} <br />
            <strong>Status:</strong> {{ application.applicationStatus }}
          </li>
        </ul>
      </section>
      
      <section v-if="appointments.length">
        <h2>Appointments</h2>
        <ul>
          <li v-for="appointment in appointments" :key="appointment.appointmentId">
            <strong>Cat Name:</strong> {{ appointment.catName }} <br />
            <strong>Purpose:</strong> {{ appointment.purpose }} <br />
            <strong>Appointment Date:</strong> {{ formatDate(appointment.appointmentDate) }}
          </li>
        </ul>
      </section>
  
      <p v-if="!applications.length && !appointments.length">No adoption applications or appointments found.</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import api from './api';
  import { jwtDecode } from 'jwt-decode';
  
  export default {
    name: 'AdopterHistory',
    setup() {
      let userId = null;
      const token = localStorage.getItem('jwt');  
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
      const applications = ref([]);
      const appointments = ref([]);
  
      onMounted(async () => {
        
        try {
          const adopterId = userId;
  
          // Fetch adoption applications
          const appResponse = await api.get(`/adoptionApplications/by-adopter/${adopterId}`);
          if (appResponse.data.success) applications.value = appResponse.data.data;
  
          // Fetch appointments
          const aptResponse = await api.get(`/appointment/get-by-adopter/${adopterId}`);
          if (aptResponse.data.success) appointments.value = aptResponse.data.data;
        } catch (error) {
          console.error("Failed to fetch history data:", error);
        }
      });
  
      // Helper function to format dates
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
      };
  
      return {
        applications,
        appointments,
        formatDate
      };
    }
  };
  </script>
  
  <style scoped>
  .adopter-history {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  
  section {
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  </style>
  