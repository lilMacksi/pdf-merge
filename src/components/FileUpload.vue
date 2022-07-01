<template>
  <div>
    <div class="row"><h2 class="font font--serif">Bitte wähle die Dokumente aus, welche du zusammenführen möchtest.
      Drag’n’Drop funktioniert natürlich auch.</h2></div>
    <div class="row">
      <label class="col" for="file-upload-folder">
        <h3 class="font font--sans sc-navy" style="cursor: pointer;">
          <sdx-icon icon-name="icon-folder-new" size="6" color-class="int-blue--active" sr-hint="Upload"></sdx-icon>
          Ordner hochladen
        </h3>
      </label>
    </div>
    <div @dragover.prevent @drop.prevent="addFile">
      <div class="col-12">
        <div class="custom-file-upload text-align-center">
          <label for="file-upload" class="flex-items-xs-center mx-auto" style="margin-bottom: 0;">
            <h4 class="text-align-center">
              <sdx-icon icon-name="icon-upload" size="6" color-class="int-blue--active" sr-hint="Upload"></sdx-icon>
            </h4>
          </label>
          <div class="row margin-left-3" style="height: 10vw; overflow: auto;">
            <div v-for="(file, i) in selectedFiles" :key="getRandomKey(file.name)" class="padding-3 file-names" @click="removeFile(i)">
              <sdx-icon icon-name="icon-document-pdf" size="6" color-class="sc-navy" sr-hint="Upload"
                        class="row flex-items-xs-center hydrated"></sdx-icon>
              <p class="text-align-center row text-truncate">{{ file.name }}</p></div>
          </div>
        </div>
      </div>
      <input ref="input" id="file-upload" accept="application/pdf" multiple @change="addFile" class="row" type="file"/>
      <input id="file-upload-folder" type="file" multiple @change="addFile" webkitdirectory class="row">
    </div>
    <div class="col-12">
      <sdx-button-group layout="fill" class="col-xs-12 fill hydrated">
        <sdx-button @click="merge()" theme="primary" :disabled="selectedFiles.length <= 1" label="Zusammenführen" class="disabled hydrated"></sdx-button>
      </sdx-button-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FileUpload',
  data() {
    return {
      selectedFiles: [],
    }
  },
  methods: {
    async addFile(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files) return;
      for (const el of Array.from(files)) {
        if (el.name.endsWith(".pdf")) {
          this.selectedFiles.push(el);
        }
      }
    },
    getRandomKey(key) {
      return `${(Math.random() + 1).toString(36).substring(7)}-${key}`;
    },
    merge() {
      this.$refs.input.value = "";
      this.$emit("merge", this.selectedFiles)
    },
    removeFile(i) {
      this.selectedFiles.splice(i, 1);
    }
  }
}
</script>
<style scoped>
input[type="file"] {
  display: none;
}

.custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  width: 100%;
  min-height: 2vw;
  border: 5px inset #007bff;
}

.files {
  border-radius: 5px;
}

.file-names {
  transition: 0.4s;
  color: black;
}

.folder-upload {
  cursor: pointer;
  color: black;
}

.folder-upload:hover {
  cursor: pointer;
  color: rgb(0, 17, 85);
}

.file-names:hover {
  color: red;
  cursor: pointer;
}
</style>
