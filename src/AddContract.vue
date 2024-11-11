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
        <input type="file" @change="handleImageChange" />
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
        contractId: '',  // Empty, not needed to send initially
        applicationId: null,
        contractFile: '',
        contractText: '',
        signedDate: '',
        witness: '',
      },
      images: [],  // Store selected images
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    // Handle image file selection
    handleImageChange(event) {
      this.images = Array.from(event.target.files); // Convert FileList to an array
    },

    async createAdoptionContract() {
      this.successMessage = '';
      this.errorMessage = '';

      try {
        // Create the contract first
        const response = await api.post("/AdoptionContract", {
          applicationId: this.form.applicationId,
          contractFile: this.form.contractFile,
          contractText: this.form.contractText,
          signedDate: this.form.signedDate,
          witness: this.form.witness
        });

        console.log('Contract creation response:', response.data); // Log full response for debugging

        // Check if the response indicates success
        if (response.data && response.data.success) {
          // Check for contractId in the response
          const contractId = response.data.data?.contractId; // Accessing the contractId properly
          if (contractId) {
            console.log('Contract created successfully with ID:', contractId);

            // Handle image upload if there are images to upload
            if (this.images.length > 0) {
              try {
                for (const file of this.images) {
                  const formData = new FormData();
                  formData.append('file', file);

                  const url = `/Image/upload?entityId=${contractId}&entityType=AdoptionContract`;
                  await api.post(url, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  });
                }
                this.successMessage = 'Images uploaded successfully!';
              } catch (error) {
                console.error("Error uploading images:", error);
                this.errorMessage = 'Failed to upload one or more images.';
              }
            }

            this.successMessage = response.data.message || 'Contract created successfully!';

            // Reset form fields
            this.form.applicationId = null;
            this.form.contractFile = '';
            this.form.contractText = '';
            this.form.signedDate = '';
            this.form.witness = '';
            this.images = []; // Clear uploaded images
          } else {
            this.errorMessage = 'No contractId returned. Image upload failed.';
          }
        } else {
          // If success is false, display error
          this.errorMessage = response.data.error || "Failed to create contract.";
        }
      } catch (error) {
        console.error('Error creating contract:', error);
        this.errorMessage = error.response?.data?.message || 'An error occurred';
      }
    }
  }
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
