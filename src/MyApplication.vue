<template>
    <div class="applications">
      <h1>My Applications</h1>
      
      <div v-if="applications.length === 0">No applications available.</div>
      
      <div v-for="application in applications" :key="application.applicationId" class="application-card">
        <p><strong>Cat name:</strong> {{ application.catName }} </p> 
        <p><strong>Application Date:</strong> {{ formatDate(application.applicationDate) }}</p>
        <p><strong>Adoption Date:</strong> {{ formatDate(application.adoptionDate) }}</p>
        <p><strong>Adoption Fee:</strong> {{ application.adoptionFee }}</p>
        
        <p v-if="application.applicationStatus === 'Pending'">
          Status: Pending
        </p>
        <p style="color:green" v-if="application.applicationStatus === 'Approved'">
          Status: Approved
        </p>
        <p style="color:red" v-if="application.applicationStatus === 'Rejected'">
          Status: Rejected
        </p>

        <button v-if="application.applicationStatus !== 'Approved'" @click="deleteApplication(application.applicationId)" class="btn-delete">Delete</button>
      </div>

    </div>
</template>
  
  <script>
    import { ref, onMounted } from 'vue';
    import api from './api';
    import { useRoute, useRouter } from 'vue-router';
  
  export default {
    name: 'MyApplications',
    data() {
      return {
        userId: null,
        applications: [],
        currentPage: 1,
        pageSize: 100,
        totalPages: 1,
        totalApplications: 0 // Store the total count of applications
      };
    },
    methods: {
      // Fetch total applications count to calculate totalPages
      async fetchTotalApplications() {
        try {
            const route = useRoute();
            const userId = parseInt(route.params.id);
            this.userId = userId;
            const response = await api.get(`/adoption-applications/by-adopter/${userId}`);

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
          const response = await api.get(`/adoption-applications/by-adopter/${this.userId}`, {
            params: { pageNumber: this.currentPage, pageSize: this.pageSize }
          });
          this.applications = response.data.data; // Use the 'data' field from the API response
        } catch (error) {
          console.error('Error fetching applications:', error);
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
        return date ? new Date(date).toLocaleDateString(undefined, options) : "Undetermined";
      },

      async deleteApplication(applicationId) {
        if (window.confirm("Are you sure to want to delete this application")) {
            try {
                const result = await api.delete(`/adoption-applications/${applicationId}`);
                this.fetchApplications();
                window.alert(`Application deleted!`);
            }
            catch (error)
            {
                console.error('Error deleting applications:', error);
            }
        }
      },
    },
    mounted() {
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

  .btn-delete {
    background-color: rgb(255, 64, 64);
    padding: 1%
  }
  </style>
  