<template>
  <div class="container margin-top-2">
    <file-upload v-if="!this.mergedFileBytes" @loading="changeLoading" @merge="onFileChange"/>
    <sdx-backdrop class="hydrated" style="opacity: 1; display: block;" v-if="loading">
      <sdx-loading-spinner size="large" sr-hint="Loading. Please wait." class="hydrated"></sdx-loading-spinner>
    </sdx-backdrop>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="row" v-if="this.mergedFileBytes">
          <h2 class="col-xs-12">Reihenfolge</h2>
          <p class="col-xs-12">Ziehe die Dokumente einfach in die gewünschte Reihenfolge.</p>
          <div class="col-xs-12 margin-bottom-2">
            <sdx-button-group layout="fullwidth" v-if="this.mergedFileBytes">
              <sdx-button theme="secondary" @click="reset" label="Neue Dateien zusammenfügen"></sdx-button>
              <sdx-button theme="secondary" @click="downloadMergedFile" label="Download"></sdx-button>
            </sdx-button-group>
          </div>
          <div class="col-xs-12 row">
            <sdx-input-item type="checkbox" class="col-xs-12 col-md-6" :checked="customName" :change-callback.prop="onCustomNameChange">
              Dokumentname festlegen
            </sdx-input-item>
            <sdx-input
                v-if="customName"
                class="col-xs-12"
                :changeCallback.prop="onNameChange"
                :value="name"
                label="Dokumentname"
            ></sdx-input>
          </div>
          <draggable v-model="fileArray" class="row col-xs-12 bg-sc-navy margin-1" draggable=".item" @change="draggableChanged" @start="drag=true" @end="drag=false">
            <div v-for="(el, i) in fileArray" class="item col-xs-12 col-md-6 padding-3" :key="el.name">
              <p class="text-truncate text-smaller white"> <strong>{{i+1}}.</strong> {{el.name}}</p>
              <pdf
                  :src="previews[el.name]"
              ></pdf>
            </div>
          </draggable>
        </div>
      </div>
      <div class="col-xs-12 col-md-6" v-if="this.mergedFileBytes">
        <h2>Vorschau</h2>
        <div class="row">
          <sdx-button class="col-xs-12 col-md-3" theme="transparent" icon-name="icon-minus" @click="changePage(-1)" icon-size="2" label="Vorherige Seite"></sdx-button>
          <p class="text-align-center col-xs-12 col-md-6" style="margin-bottom: 0">Seite {{ currentPage }}/{{pageCount}}</p>
          <sdx-button class="col-xs-12 col-md-3" theme="transparent" icon-name="icon-plus" @click="changePage(1)" icon-size="2" label="Nächste Seite"></sdx-button>
        </div>
        <pdf
          :src="mergedFileBytes"
          class="text-align-center"
          :page="currentPage"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
        ></pdf>
      </div>
    </div>
  </div>
</template>

<script>
import merge, {download, loadDocument} from "@/js/pdf";
import draggable from 'vuedraggable'
import pdf from "vue-pdf";
import FileUpload from "@/components/FileUpload";

export default {
  name: "Home",
  components: {
    draggable,
    pdf,
    FileUpload,
  },
  data() {
    return {
      mergedFileBytes: null,
      currentPage: 1,
      pageCount: 0,
      fileArray: null,
      previews: [],
      name: 'export',
      customName: false,
      loading: false,
    };
  },
  methods: {
    onNameChange(v) {
      this.name = v;
    },
    onCustomNameChange(v) {
      this.customName = v;
      this.name = v ? '' : 'export';
    },
    changeLoading(l) {
      this.loading = l;
    },
    reset() {
      this.mergedFileBytes = null;
      this.currentPage = 1;
      this.pageCount = 1;
      this.fileArray = null;
      this.previews = [];
      this.customName = false;
      this.name = "export";
    },
    draggableChanged() {
      this.updateFiles(this.fileArray)
    },
    changePage(n) {
      const page = this.currentPage + n;
      if (page === 0 || page > this.pageCount) return;
      this.currentPage = page;
    },
    downloadMergedFile() {
      this.loading = true;
      download(this.mergedFileBytes, this.name).then(() => {
        this.loading = false;
        this.reset();
      })
    },
    async onFileChange(files) {
      if (!files.length) return;
      await this.updateFiles(files);
    },
    async updateFiles(files) {
      try {
        this.loading = true;
        for (const file of files) {
          const fileRead = await this.fileRead([file]);
          const converted = await loadDocument(fileRead[0]);
          this.previews[file.name] = new Uint8Array(converted);
        }
        this.fileArray = Array.from(files);
        const _files = await this.fileRead(this.fileArray);
        this.mergedFileBytes = new Uint8Array(await merge(_files));

        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    async fileRead(files) {
      const _files = files.map((file) => {
        let reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsArrayBuffer(file);
        });
      });
      return await Promise.all(_files);
    },
  },
};
</script>