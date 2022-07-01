<template>
  <div class="row flex-items-xs-center margin-top-4">
    <sdx-accordion keep-open>
    <sdx-accordion-item>
      <sdx-accordion-item-header>
        <span id="accordion_3" class="text-h5 navy margin-0" role="heading" aria-level="2">Werden die Dokumente irgendwo hochgeladen?</span>
      </sdx-accordion-item-header>
      <sdx-accordion-item-body>
        <p aria-labelledby="accordion_3" class="text-b2 text-recommended-max-width" role="region"><strong>Nein</strong>. Die Dokumente werden nur lokal auf deinem Rechner verarbeitet und zusammengefügt. Dabei werden sie auf keine Cloud, Datenbank, etc. hochgeladen.</p>
      </sdx-accordion-item-body>
    </sdx-accordion-item>
    <sdx-accordion-item>
      <sdx-accordion-item-header>
        <span id="accordion_4" class="text-h5 navy margin-0" role="heading" aria-level="2">Für was alles kann ich dieses Tool gebrauchen?</span>
      </sdx-accordion-item-header>
      <sdx-accordion-item-body>
        <p aria-labelledby="accordion_4" class="text-b2 text-recommended-max-width" role="region">Das Tool ist dazu da, um <strong>PDFs zusammenzufügen</strong>. Die Anzahl und Grösse der Dokumente ist dabei egal. Grössere Dokumente brauchen logischerweise einfach länger bei der Verarbeitung und beim Download.</p>
      </sdx-accordion-item-body>
    </sdx-accordion-item>
      <sdx-accordion-item>
        <sdx-accordion-item-header>
          <span id="accordion_5" class="text-h5 navy margin-0" role="heading" aria-level="2">Welche Dateiformate werden unterstützt?</span>
        </sdx-accordion-item-header>
        <sdx-accordion-item-body>
          <p aria-labelledby="accordion_5" class="text-b2 text-recommended-max-width" role="region">Es können <b>PDF</b> und <b>ZIP</b> Dateien hochgeladen werden. Ebenfalls gibt es die Möglichkeit ganze <b>Ordner</b> und deren <b>Unterordner</b> hochzuladen.</p>
        </sdx-accordion-item-body>
      </sdx-accordion-item>
  </sdx-accordion>
  </div>
</template>

<script>
export default {
  name: "FAQ"
}
</script>

<style scoped>

</style>