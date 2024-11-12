<template>
    <div>
      <!-- Use the ImageUpload component -->
      <ImageUpload :entityId="entityId" :entityType="entityType" />
    </div>
  </template>
  
  <script>
  // Importing the ImageUpload component
  import ImageUpload from '@/components/ImageUpload.vue';
  
  export default {
    components: {
      ImageUpload, // Register the ImageUpload component
    },
    data() {
      return {
        entityId: 1, // Dynamic or static entityId (for testing it's static)
        entityType: 'cat', // Dynamic or static entityType (for testing it's static)
      };
    },
  };
  </script>
  
  <style scoped>
  /* Your page styles */
  </style>
  