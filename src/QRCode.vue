<template>
  <div>
    <h1>Generate Banking QR Code with VietQR API</h1>
    <form @submit.prevent="generateQRCode">
      <label for="accountNo">Account Number:</label>
      <input type="text" v-model="accountNo" required />

      <label for="accountName">Account Name:</label>
      <input type="text" v-model="accountName" required />

      <label for="amount">Amount:</label>
      <input type="number" v-model="amount" required />

      <label for="addInfo">Additional Info:</label>
      <input type="text" v-model="addInfo" />

      <button type="submit">Generate QR Code</button>
    </form>
    <img :src="qrDataURL" alt="QR Code" />

    <!-- <div v-if="qrDataURL">
      <h2>Your QR Code:</h2>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      accountNo: "",
      accountName: "",
      amount: "",
      addInfo: "",
      qrDataURL: null
    };
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
        accountNo: this.accountNo,
        accountName: this.accountName,
        amount: this.amount,
        addInfo: this.addInfo,
        acqId: "970422",    // Replace with the correct acquirer ID if different
        template: "compact"  // Choose the desired template type
      };

      try {
        const response = await axios.post(apiEndpoint, data, { headers });
        this.qrDataURL = response.data.qrDataURL || response.data.data.qrDataURL || null;  // Adjust to match the API's response structure
        console.log(this.qrDataURL)
        console.log(qrDataURL)
        console.log(response.data);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    }
  }
};
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: auto;
  }
  label, input, button {
    margin: 5px 0;
  }
  img {
    margin-top: 20px;
    max-width: 200px;
    border: 1px solid #ddd;
    padding: 10px;
  }
</style>
