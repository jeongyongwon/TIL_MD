<template>
  <div id="app">
    <p class="error">
      {{errorMessage}}
    </p>
    <video>
      playsinline autoplay
    </video>
    <button type="button" v-if="!streamActive()" @click="startStream">Start Camera</button>
    <button type="button" v-if="streamActive()" @click="stoppStream">Stopp Camera</button>
    <hr />
    <ul id="log">
      <li v-for="entry in logs" :key="entry">
        {{entry.timestamp}}: {{entry.message}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
    constraints: {
      audio: false,
      video: {
        mandatory: {
          maxWidth: 640,
          maxHeight: 360
        }
      }
    },
    errorMessage: "",
    logs: [],
    stream: undefined
    }
  }, 
  created: function () {
    this.log("App created");
  },
  methods: {
    error(message, error) {
      this.errorMessage = message;
      this.log("Error:" + message);
      if (typeof error !== "undefined") {
        console.error(error);
      }
    },
    log(message) {
      this.logs.push({ timestamp: new Date(), message: message });
    },

    handleError(error) {
      if (error.name === "ConstraintNotSatisfiedError") {
        let v = this.constraints.video;
        this.error(
          `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
        );
      } else if (error.name === "PermissionDeniedError") {
        this.error(
          "Permissions have not been granted to use your camera and " +
            "microphone, you need to allow the page access to your devices in " +
            "order for the demo to work."
        );
      }
      this.error(`getUserMedia error: ${error.name}`, error);
    },

    handleSuccess() {
      const video = document.querySelector("video");
      console.log(video)
      video.srcObject = this.stream;
      
      video.play();
      const tracks = this.stream.getTracks();
      this.log(`Using video device: ${tracks[0].label}`);
      window.stream = this.stream; // make variable available to browser console
    },

    async startStream() {
      try {
        this.stream = navigator.mediaDevices.getUserMedia(
          this.constraints
        );
        this.log("Camera started");
        this.handleSuccess();
      } catch (err) {
        this.handleError(err);
      }
    },

    streamActive() {
      return this.stream && this.stream.active;
    },

    stoppStream() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => {
          track.stop();
        });
        this.log("Camera stopped");
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
}
</style>
