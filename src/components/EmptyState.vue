<template>
  <div @dragover.prevent @drop.prevent="addFile">
    <div class="row">
      <h2 class="font font--serif">Bitte wähle die Dokumente aus, welche du zusammenführen möchtest. Drag’n’Drop funktioniert natürlich auch.<br> <span class="text-small font font--sans" v-if="selectedFiles.length > 0">(Um ein Dokument wieder zu entfernen, einfach draufklicken)</span></h2>
    </div>
    <div class="files bg-sc-navy">
      <label for="file-upload" class="custom-file-upload" style="margin-bottom: 0;">
        <p class="text-align-center"><sdx-icon icon-name="icon-upload" size="6" color-class="sc-white" sr-hint="Upload"></sdx-icon></p>
      </label>
      <div class="padding-1" style="max-height: 15vw; overflow: auto;">
        <p v-for="(f, i) in selectedFiles" :key="i" @click="remove(i)" style="margin-bottom: 5px" class="white text-align-center file-names">{{f.name}}</p>
      </div>
    </div>
    <input id="file-upload" accept="application/pdf" @change="addFile" class="row" type="file" multiple />
    <div class="margin-top-2">
      <sdx-button-group layout="fill">
        <sdx-button theme="primary" @click="mergeFiles" :disabled="selectedFiles.length < 2" label="Zusammenführen"></sdx-button>
      </sdx-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  data() {
    return {
      selectedFiles: []
    }
  },
  methods: {
    mergeFiles() {
      this.$emit("merge", this.selectedFiles)
    },
    addFile(e) {
      let files = e.target.files || e.dataTransfer.files;
      if(!files) return;
      Array.from(files).forEach(el => {
        if (el.name.endsWith(".pdf")) {
          this.selectedFiles.push(el)
        }
      })
    },
    remove(i) {
      this.selectedFiles.splice(i, 1)
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
  height: 100%;
}

.files {
  border-radius: 5px;
}

.file-names {
  transition: 0.4s;
}

.file-names:hover {
  background-color: #0048CF;
  cursor: pointer;
}
</style>
