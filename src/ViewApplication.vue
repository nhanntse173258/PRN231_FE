<template>
    <div class="applications">
      <h1>Pending Adoption Applications</h1>
      
      <div v-if="applications.length === 0">No applications available.</div>
      
      <div v-for="application in applications" :key="application.applicationId" class="application-card">
        <p><strong>Cat ID:</strong> {{ application.catId }} 
          <router-link class="cat-profile" :to="`../cat-profile/${application.catId}`">Profile</router-link>
        </p> 
        <p><strong>Adopter ID:</strong> {{ application.adopterId }}</p>
        <p><strong>Application Date:</strong> {{ formatDate(application.applicationDate) }}</p>
        <p><strong>Adoption Fee:</strong> {{ application.adoptionFee }}</p>
        
        <p v-if="application.applicationStatus === 'Pending'">
          Status: Pending
          <button @click="approveApplication(application.applicationId)">
            Approve
          </button>
        </p>
        <p style="color:green" v-if="application.applicationStatus === 'Approved'">
          Status: Approved
        </p>
        <p style="color:red" v-if="application.applicationStatus === 'Rejected'">
          Status: Rejected
        </p>
      </div>
  
      <!-- Pagination Controls -->
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import api from './api';
  
  export default {
    name: 'AdoptionApplications',
    data() {
      return {
        applications: [],
        currentPage: 1,
        pageSize: 5,
        totalPages: 1,
        totalApplications: 0 // Store the total count of applications
      };
    },
    methods: {
      // Fetch total applications count to calculate totalPages
      async fetchTotalApplications() {
        try {
          const response = await api.get('/adoption-applications', {
            params: { pageNumber: 1, pageSize: 10000 } // Request a large page size to fetch all applications
          });

          this.totalApplications = response.data.data.length;
          this.totalPages = Math.ceil(this.totalApplications / this.pageSize); // Calculate total pages
          this.fetchApplications(); // Fetch applications for the current page
        } catch (error) {
          console.error('Error fetching total applications:', error);
        }
      },
  
      // Fetch applications for the current page
      async fetchApplications() {
        try {
          const response = await api.get('/adoption-applications', {
            params: { pageNumber: this.currentPage, pageSize: this.pageSize }
          });
          this.applications = response.data.data; // Use the 'data' field from the API response
        } catch (error) {
          console.error('Error fetching applications:', error);
        }
      },
  
      // Approve adoption application
      async approveApplication(applicationId) {
        try {
          await api.put(`/adoption-applications/approve/${applicationId}`);
          // Refetch applications after approval
          this.fetchApplications();
        } catch (error) {
          console.error('Error approving application:', error);
        }
      },
  
      // Change page for pagination
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
          this.fetchApplications(); // Fetch applications for the new page
        }
      },
  
      // Format date for display
      formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      }
    },
    mounted() {
        if (localStorage.getItem('userRole') != 'Staff') this.$router.push('/home');
      this.fetchTotalApplications(); // Fetch total applications initially to calculate total pages
    }
  };
  </script>
  
  <style scoped>
  .applications {
    padding: 20px;
  }
  
  .application-card {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  
  .pagination button {
    margin: 0 10px;
  }
  
  .cat-profile {
    color: rgb(255, 190, 69);
    padding: 1%;
    margin-left: 1%;
    text-decoration: underline;
  }
  </style>
  