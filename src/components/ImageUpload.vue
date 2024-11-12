<template>
    <div>
      <button @click="openWidget">Upload Images to Cloudinary</button>
      <div v-if="imageUrls.length">
        <h3>Uploaded Images:</h3>
        <div v-for="(url, index) in imageUrls" :key="index">
          <img :src="url" alt="Uploaded Image" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api'; // Assuming you have an API utility for making requests
  
  export default {
    props: {
      entityId: {
        type: Number,
        required: true,
      },
      entityType: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        imageUrls: [], // Array to store the uploaded image URLs
      };
    },
    methods: {
      openWidget() {
        const widget = cloudinary.createUploadWidget(
          {
            cloudName: 'dfu0epi1z', // Your Cloudinary cloud name
            uploadPreset: 'vue-demo', // Your Cloudinary upload preset
            sources: ['local', 'url', 'image_search', 'camera'], // Cloudinary sources
            googleApiKey: 'AIzaSyBTsMLI0pgw6f9jGpXw3OVeJP4D7tNq9LE', // Google API key (if used)
            cropping: true,
            multiple: true, // Allow multiple images to be uploaded
          },
          (error, result) => {
            if (!error && result && result.event === 'success') {
              // When upload is successful, get the image URLs
              this.imageUrls.push(result.info.secure_url); // Add the image URL to the list
              this.saveImageUrlsToDatabase();
            } else if (error) {
              console.error('Upload Failed: ', error);
            }
          }
        );
  
        // Open the widget
        widget.open();
      },
  
      // Save image URLs to the backend database
      async saveImageUrlsToDatabase() {
        try {
          const payload = {
            entityId: this.entityId,
            entityType: this.entityType,
            imageUrls: this.imageUrls, // Send all the image URLs to the backend
          };
  
          // API call to backend to store the image URLs
          const response = await api.post('/Image/upload-from-url', payload);
  
          if (response.data.success) {
            console.log('Image URLs saved to database:', this.imageUrls);
          } else {
            console.error('Failed to save image URLs to database');
          }
        } catch (error) {
          console.error('Error saving image URLs to database:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    background-color: #ff6a00;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #ff8c00;
  }
  
  img {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
  }
  </style>
  