<template>
    <div>
      <h1>Create Appointment</h1>
      <form @submit.prevent="createAppointment">
        <div>
          <label for="catId">Cat ID:</label>
          <input type="number" v-model="catId" required />
        </div>
        
        <div>
          <label for="purpose">Purpose:</label>
          <input type="text" v-model="purpose" required />
        </div>
        
        <div>
          <label for="userId">User ID:</label>
          <input type="number" v-model="userId" required />
        </div>

        <div>
        <label for="appointmentDate">Appointment Date:</label>
        <input type="datetime-local" v-model="appointmentDate" required />
      </div>
        
        <button type="submit">Create Appointment</button>
      </form>
  
      <div v-if="successMessage" class="success">
        <p>{{ successMessage }}</p>
        <p><strong>Appointment ID:</strong> {{ appointmentData.appointmentId }}</p>
        <p><strong>Appointment Date:</strong> {{ appointmentData.appointmentDate }}</p>
        <p><strong>Purpose:</strong> {{ appointmentData.purpose }}</p>
      </div>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import api from "./api"; // Adjust the path based on your project structure
  
  export default {
    data() {
      return {
        catId: null,
        purpose: "",
        userId: null,
        appointmentDate: "",
        successMessage: "",
        errorMessage: "",
        appointmentData: {}
      };
    },
    methods: {
      async createAppointment() {
        this.successMessage = "";
        this.errorMessage = "";
  
        try {
          const response = await api.post("/appointment/create-appointment", {
            catId: this.catId,
            purpose: this.purpose,
            userId: this.userId,
            appointmentDate: this.appointmentDate
          });
  
          if (response.data.success) {
            this.successMessage = response.data.message;
            this.appointmentData = response.data.data;
            // Reset form fields
            this.catId = null;
            this.purpose = "";
            this.userId = null;
          } else {
            this.errorMessage = response.data.error || "Failed to create appointment.";
          }
        } catch (error) {
          this.errorMessage = error.response?.data?.message || "An error occurred.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .success {
    color: green;
    margin-top: 20px;
  }
  .error {
    color: red;
    margin-top: 20px;
  }
  </style>
  