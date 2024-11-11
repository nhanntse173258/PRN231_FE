<template>
    <div class="new-cat-page">
      <h1>Add a New Cat</h1>
      <form @submit.prevent="submitCatForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" v-model="catData.name" id="name" required />
        </div>
  
        <div class="form-group">
          <label for="age">Age</label>
          <input type="number" v-model="catData.age" id="age" required />
        </div>
  
        <div class="form-group">
          <label for="gender">Gender</label>
          <input type="text" v-model="catData.gender" id="gender" required />
        </div>
  
        <div class="form-group">
          <label for="breed">Breed</label>
          <input type="text" v-model="catData.breed" id="breed" required />
        </div>
  
        <div class="form-group">
          <label for="isAdopted">Is Adopted</label>
          <input type="checkbox" v-model="catData.isAdopted" id="isAdopted" />
        </div>
  
        <div class="form-group">
          <label for="shelterId">Shelter ID</label>
          <input type="number" v-model="catData.shelterId" id="shelterId" required />
        </div>
  
        <div class="form-group">
          <label for="images">Cat Images</label>
          <input type="file" @change="handleFileChange" multiple />
        </div>
  
        <button type="submit">Add Cat</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  import api from './api';
  
  export default {
    name: 'NewCatPage',
    setup() {
        
        if (localStorage.getItem('userRole') != 'Staff') this.$router.push('/home')

        const catData = reactive({
            name: '',
            age: 0,
            gender: '',
            breed: '',
            isAdopted: false,
            shelterId: 0,
        });
    
        const message = ref('');
        const images = ref([]);
    
        const handleFileChange = (event) => {
            images.value = Array.from(event.target.files); // Store selected files
        };
    
        const submitCatForm = async () => {
            try {
            const response = await api.post('/cats', catData);
            const catId = response.data.data.catId;
    
            console.log(catId);

            if (images.value.length > 0) 
            {
                await uploadImages(catId);
            } 
            else 
            {
                message.value = 'Cat added successfully!';
            }
            } catch (error) {
            console.error("Error adding cat:", error);
            message.value = 'Failed to add cat. Please try again.';
            }
        };
    
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
            message.value = 'Cat and images uploaded successfully!';
            } catch (error) 
            {
            console.error("Error uploading images:", error);
            message.value = 'Failed to upload one or more images.';
            }
        };

        return {
            catData,
            message,
            handleFileChange,
            submitCatForm,
        };
    },
  };
  </script>
  
  <style scoped>
  .new-cat-page {
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
  
  input[type="text"],
  input[type="number"],
  input[type="file"],
  input[type="checkbox"] {
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
  