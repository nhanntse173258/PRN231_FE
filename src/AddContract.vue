<template>
  <div>
    <h1>Create Adoption Contract</h1>
    <form @submit.prevent="createAdoptionContract">
      <div>
        <label for="applicationId">Application ID:</label>
        <input type="number" v-model="form.applicationId" required />
      </div>

      <div>
        <label for="contractFile">Contract File (optional):</label>
        <input type="text" v-model="form.contractFile" required />
      </div>

      <div>
        <label for="contractText">Contract Text:</label>
        <textarea v-model="form.contractText" required></textarea>
      </div>

      <div>
        <label for="signedDate">Signed Date:</label>
        <input type="date" v-model="form.signedDate" required />
      </div>

      <div>
        <label for="witness">Witness:</label>
        <input type="text" v-model="form.witness" required />
      </div>

      <button type="submit">Create Contract</button>
    </form>

    <div v-if="successMessage" class="success">
      <p>{{ successMessage }}</p>
    </div>

    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import api from "./api"; // Assuming api.js is configured correctly

export default {
  data() {
    return {
      form: {
        applicationId: null,
        contractFile: '',
        contractText: '',
        signedDate: '',
        witness: '',
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.contractFile = file;
      }
    },
    async createAdoptionContract() {
      this.successMessage = '';
      this.errorMessage = '';

      const formData = new FormData();
      formData.append('ApplicationId', this.form.applicationId);
      formData.append('ContractText', this.form.contractText);
      formData.append('SignedDate', this.form.signedDate);
      formData.append('Witness', this.form.witness);
      if (this.form.contractFile) {
        formData.append('ContractFile', this.form.contractFile);
      }

      try {
        const response = await api.post("/appointment/create-appointment", {
            applicationId: this.applicationId,
            contractFile: this.contractFile,
            contractText: this.contractText,
            signedDate: this.signedDate,
            witness: this.witness
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
        this.errorMessage = error.response?.data?.message || 'An error occurred';
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
