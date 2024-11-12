<template>
  <div class="application-page">
    <h1>Create Appointment</h1>
    <form @submit.prevent="createAppointment">
      <div class="form-group">
        <label for="catId">Cat ID:</label>
        <input type="number" v-model="catId" required />
      </div>
      
      <div class="form-group">
        <label for="purpose">Purpose:</label>
        <input type="text" v-model="purpose" required />
      </div>
      
      <div class="form-group">
        <label for="userId">User ID:</label>
        <input type="number" v-model="userId" required />
      </div>

      <div class="form-group">
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
import { useRoute } from "vue-router";

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
  mounted() {
    this.setup();
  },
  methods: {
    setup() {
      const applicationId = parseInt(useRoute().query.applicationId);
      if (applicationId) this.initializeAppointments(applicationId);
    },

    async initializeAppointments(applicationId) {
      try {
        const response = await api.get(`/adoption-applications/${applicationId}`);
        if (response.data.success && response.data.data.applicationStatus === 'Approved') {
          const applicationData = response.data.data;
          this.userId = applicationData.adopterId;
          this.catId = applicationData.catId;
        } 
        else 
        {
          this.errorMessage = "Application not approved.";
        }
      } catch (error) {
        this.errorMessage = "Error fetching application data.";
      }
    },

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

.success, .error {
  margin-top: 15px;
}

.success p {
  color: green;
}

.error {
  color: red;
}
</style>
