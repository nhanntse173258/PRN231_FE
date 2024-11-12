<template>
    <div>
      <h1>Donate Now</h1>
  
      <!-- Donation Form -->
      <form @submit.prevent="submitForm">
        <label for="description">Banking Description:</label>
        <input type="text" v-model="addInfo" required placeholder="Enter banking description" />
  
        <label for="amount">Donation Amount (VND):</label>
        <input type="number" v-model="amount" required placeholder="Enter donation amount" />
  
        <button type="submit">Generate QR Code</button>
      </form>
  
      <!-- Show QR Code after form submission -->
      <div v-if="showQrCode">
        <h2>Scan the QR Code to Donate:</h2>
        <QrCodeGenerator
          :addInfo="addInfo"
          :amount="amount"
        />
      </div>
    </div>
  </template>
  
  <script>
  import QrCodeGenerator from '@/components/QRGenerator.vue';
  
  export default {
    components: {
      QrCodeGenerator
    },
    data() {
      return {
        addInfo: "",   // Description for the donation (e.g., account name, bank info)
        amount: 0,         // Donation amount
        showQrCode: false  // Control when to show the QR code
      };
    },
    methods: {
      submitForm() {
        this.showQrCode = true;  // Trigger the QR code generation after the form is submitted
      }
    }
  };
  </script>
  
  <style scoped>
    /* Styling for the form and page */
    h1 {
      text-align: center;
      margin-top: 20px;
    }
  
    form {
      display: flex;
      flex-direction: column;
      max-width: 400px;
      margin: auto;
    }
  
    label, input, button {
      margin: 10px 0;
    }
  
    input {
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  
    button {
      padding: 10px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #45a049;
    }
  
    h2 {
      text-align: center;
      margin-top: 20px;
    }
  
    /* Styling for QR code */
    img {
      display: block;
      margin: 20px auto;
      max-width: 200px;
      border: 1px solid #ddd;
      padding: 10px;
    }
  </style>
  