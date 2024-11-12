<template>
    <div>
      <h1>Generate Banking QR Code</h1>
      <img v-if="qrDataURL" :src="qrDataURL" alt="QR Code" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      amount: {
        type: Number,
        required: true
      },
      addInfo: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        qrDataURL: null
      };
    },
    watch: {
        addInfo(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.generateQRCode();  // Regenerate QR code when description changes
      }
    },
    amount(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.generateQRCode();  // Regenerate QR code when amount changes
      }
    }
    },
    methods: {
      async generateQRCode() {
        const apiEndpoint = "https://api.vietqr.io/v2/generate";
        const headers = {
          "x-client-id": "49c63d6b-3569-431b-886f-d223c5973b57",
          "x-api-key": "d983e42b-fcc7-4365-a66b-f4cf9e3ebf56",
          "Content-Type": "application/json"
        };
  
        const data = {
          accountNo: '0943496481',
          accountName: 'BUI THIEN PHUOC',
          amount: this.amount,
          addInfo: this.addInfo,
          acqId: "970422", // Replace with the correct acquirer ID if different
          template: "compact" // Choose the desired template type
        };
  
        try {
          const response = await axios.post(apiEndpoint, data, { headers });
          this.qrDataURL = response.data.qrDataURL || response.data.data.qrDataURL || null; // Adjust if necessary
          console.log(response.data);
        } catch (error) {
          console.error("Error generating QR code:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
    img {
      margin-top: 20px;
      max-width: 200px;
      border: 1px solid #ddd;
      padding: 10px;
    }
  </style>
  