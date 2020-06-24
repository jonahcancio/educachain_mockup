<template>
  <b-container>
    <b-card>
      <h4 class="mb-4">Student: Upload Diploma</h4>
      <b-row align-h="center" class="mb-1">
        <b-form-file v-model="fileObj" />
      </b-row>
      <b-row align-h="center" class="mb-3">
        <b-img
          width="500px"
          class="border border-secondary p-1 rounded"
          :src="fileUrl"
          alt="image preview"
        />
      </b-row>
      <b-row class="mb-2">
        <b-button block @click="uploadFile" variant="primary">Upload File</b-button>
      </b-row>
      <b-alert :show="uploadSuccess" dismissible variant="success">
        File Upload Successful!
      </b-alert>
      <b-row>
        <b-form-group block label="File Hash:" label-for="hash-result" label-cols="2" class="w-100">
          <b-form-input readonly id="hash-result" trim v-model="hash"></b-form-input>
        </b-form-group>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import ipfsClient from "ipfs-http-client";
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

// import axios from "axios";

const reader = new FileReader();

export default {
  created() {
    reader.onload = event => {
      const result = event.target.result;
      console.log(result);
      this.fileBuff = result;
    };
  },
  data() {
    return {
      fileObj: null,
      fileUrl: "@/assets/kaguya_chan.jpg",
      fileBuff: "",
      hash: "",
      uploadSuccess: false
    };
  },
  watch: {
    fileObj(file) {
      if (file) {
        this.fileUrl = URL.createObjectURL(file);
        reader.readAsArrayBuffer(file);
      }
    }
  },
  methods: {
    async uploadFile() {
      console.log(this.fileBuff);
      for await (const res of ipfs.add(this.fileBuff)) {
        console.log(res);
				this.hash = res.path;
				localStorage.setItem("hash", res.path)
				this.uploadSuccess = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
