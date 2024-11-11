<template>
  <header class="header">
    <nav class="navbar">
      <a href="/" class="logo">Cat Adoption</a>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/adopt">Adopt a Cat</router-link></li>
        <li><router-link to="/about">About Us</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <!-- Check if the user is logged in -->
        <li v-if="isLoggedIn">
          <button @click="logout">Logout</button>
        </li>
        <li v-else>
          <router-link to="/login">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      // Check if the JWT token is in localStorage
      isLoggedIn: !!localStorage.getItem('jwt'),
    };
  },
  methods: {
    logout() {
      // Remove the JWT token from localStorage to log out the user
      localStorage.removeItem('jwt');
      localStorage.removeItem('userRole');
      // Redirect the user to the home page or login page
      this.$router.push('/login');
      // After logout, set isLoggedIn to false to update the UI
      this.isLoggedIn = false;
    }
  },
  watch: {
    // Watch for changes to the JWT token and update the UI accordingly
    '$route'(to, from) {
      this.isLoggedIn = !!localStorage.getItem('jwt');
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #ffab00;
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  list-style-type: none;
}

.nav-links li {
  display: inline;
  margin-left: 20px;
}

.nav-links a,
.nav-links button {
  text-decoration: none;
  color: white;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
