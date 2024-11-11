<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="passwordHash" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>

    <!-- Display error message if any -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import api from './api';

export default {
  data() {
    return {
      email: '',      // Bound to the email input
      passwordHash: '',   // Bound to the password input
      errorMessage: '' // To display error messages
    };
  },
  methods: {
    async loginUser() {
      try {
        // Sending POST request to the login endpoint
        const response = await api.post('/authentication/login', {
          email: this.email,
          passwordHash: this.passwordHash
        });
        console.log(response.data);

        // Assuming the response contains a JWT token
        const token = response.data.token;

        // Store the token in localStorage (or Vuex store)
        localStorage.setItem('jwt', token);

        var userRole = jwtDecode(token).role;
        localStorage.setItem('userRole', userRole);

        // Redirect to a protected route after successful login
        this.$router.push('/');

      } catch (error) {
        // Handle errors such as incorrect email/password
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      }
    }
  }
};
</script>

<style>
.error {
  color: red;
  margin-top: 10px;
}
</style>

  
<style scoped>
  .login {
    max-width: 400px;
    margin: 2.5% auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  button {
    padding: 10px;
    background-color: #ffab00;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e69500;
  }
  </style>
  