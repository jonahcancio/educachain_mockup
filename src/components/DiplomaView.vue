<template>
  <b-container>
    <b-card>
      <h4 class="mb-4">Company: View Diploma</h4>
      <b-row align-h="center" class="mb-4">
        <b-col cols="2">
          <label>File Hash:</label>
        </b-col>
        <b-col>
          <b-form-input v-model="hash" type="text" />
        </b-col>
      </b-row>
      <b-alert :show="accessGranted && this.fileObj != null" dismissible variant="success">
        File Access Granted!
      </b-alert>
      <b-alert :show="!accessGranted" dismissible variant="danger">
        Insufficient Access Privileges!
      </b-alert>
      <b-row align-h="center" class="mb-3">
        <b-img
          width="500px"
          rounded
          class="border border-secondary p-1 rounded"
          :src="blobUrl"
          alt="image preview"
        />
      </b-row>
      <b-row>
        <b-button block @click="viewFile" variant="primary">View File</b-button>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import axios from "axios";

const reader = new FileReader();

export default {
  created() {
    reader.onload = event => {
      this.fileBuff = event.target.result;
    };
  },
  data() {
    return {
      accessGranted: true,
      fileObj: null,
      fileBuff: null,
      hash: localStorage.getItem("hash"),
      // fileUrl: "@/assets/kaguya_chan.jpg"
    };
  },
  methods: {
    viewFile() {
      // this.fileUrl = `https://ipfs.infura.io/ipfs/${this.hash}`;
      axios.get(`https://ipfs.infura.io/ipfs/${this.hash}`, {responseType: "blob"}).then(res => {
        console.log(res);
        this.fileObj = res.data
        reader.readAsArrayBuffer(res.data);
      });
    }
  },
  computed: {
    blobUrl() {
      return this.fileObj && this.accessGranted && URL.createObjectURL(this.fileObj)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
