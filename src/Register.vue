<template>
    <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <div>
          <label for="telephoneNumber">Phone Number:</label>
          <input type="text" v-model="telephoneNumber" id="telephoneNumber" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <router-link to="/login">Login here</router-link></p>
    </div>
  </template>
  
  <script>
  import api from './api';  // Import axios instance
  
  export default {
    data() {
      return {
        telephoneNumber: '',
        email: '',
        password: ''
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await api.post('/authentication/register', {  // Backend register endpoint
            telephoneNumber: this.telephoneNumber,
            email: this.email,
            password: this.password
          });
          
          console.log('Email:', this.email);
          console.log('Password:', this.password);
  
          // Handle success (e.g., navigate to login page)
          console.log('Registration successful', response.data);
          alert('Registration successful! Please log in.');
          this.$router.push('/login');  // Navigate to login page after successful registration
        } catch (error) {
          console.error('Registration failed', error.response);
          console.log('Email:', this.email);
          console.log('Password:', this.password);
          // Handle errors (e.g., display error message)
          alert('Registration failed. Please try again.');
        }
      }
    }
  };
  </script>
  