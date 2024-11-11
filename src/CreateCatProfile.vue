<template>
    <div class="new-cat-profile-page">
      <h1>Create Cat Profile</h1>
      <form @submit.prevent="submitCatProfileForm">
        <div class="form-group">
          <label for="catId">Cat ID</label>
          <input type="number" v-model="catProfileData.catId" id="catId" disabled required/>
        </div>
  
        <div class="form-group">
          <label for="healthStatus">Health Status</label>
          <input type="text" v-model="catProfileData.healthStatus" id="healthStatus" required />
        </div>
  
        <div class="form-group">
          <label for="arrivalDate">Arrival Date</label>
          <input type="datetime-local" v-model="catProfileData.arrivalDate" id="arrivalDate" required />
        </div>
  
        <div class="form-group">
          <label for="vaccinationStatus">Vaccination Status</label>
          <input type="text" v-model="catProfileData.vaccinationStatus" id="vaccinationStatus" required />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="catProfileData.description" id="description" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="images">Upload Cat Images</label>
          <input type="file" @change="handleFileChange" multiple />
        </div>
  
        <button type="submit">Create Cat Profile</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from 'vue';
  import api from './api';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'New Cat Profile Page',

    setup() {
        const route = useRoute();
        // Check if the user is 'Staff' from localStorage
        if (localStorage.getItem('userRole') !== 'Staff') {
            this.$router.push('/home');
        }

        // Initialize the cat profile data
        const catProfileData = reactive({
            catId: parseInt(route.params.id),
            healthStatus: '',
            arrivalDate: '',
            vaccinationStatus: '',
            description: ''
        });
    
        const message = ref('');
        const images = ref([]); // Store selected image files
    
        // Handle file input changes
        const handleFileChange = (event) => {
            images.value = Array.from(event.target.files); // Store selected files
        };
    
        // Submit form to create cat profile
        const submitCatProfileForm = async () => {
            try {
            // First, create the cat profile
            const response = await api.post('/catProfiles', catProfileData);
    
            if (response.data.success) {
                const catId = response.data.data.catId;
                message.value = 'Cat profile created successfully!';
    
                // If there are images, upload them
                if (images.value.length > 0) {
                await uploadImages(catId);
                }
            } else {
                message.value = `Error: ${response.data.message}`;
            }
            } catch (error) {
            console.error('Error creating cat profile:', error);
            message.value = 'Failed to create cat profile. Please try again.';
            }
        };
    
        // Upload images to the server
        const uploadImages = async (catId) => {
            try {
            for (const file of images.value) {
                const formData = new FormData();
                formData.append('file', file);
                
                const url = `/Image/upload?entityId=${catId}&entityType=Cat`;
                await api.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            message.value = 'Images uploaded successfully!';
            } catch (error) {
            console.error('Error uploading images:', error);
            message.value = 'Failed to upload one or more images.';
            }
        };
    
        return {
            catProfileData,
            message,
            images,
            handleFileChange,
            submitCatProfileForm
        };
    }
  };
  </script>
  
  <style scoped>
  .new-cat-profile-page {
    max-width: 500px;
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
  
  input[type="text"],
  input[type="number"],
  input[type="datetime-local"],
  textarea,
  input[type="file"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
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
  