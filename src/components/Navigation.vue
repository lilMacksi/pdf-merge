<template>
  <nav  id="top-nav" style="margin: 0 !important">
    <div class="row">
      <div class="col-xs-8 col-md-10">
        <router-link :to="'/'"><h1 style="margin-bottom: 0;" class="sc-navy margin-1" id="home">PDF Tool</h1></router-link>
      </div>
      <div class="col-xs-4 col-md-2 text-align-center">
        <router-link :to="'/faq'"><h2 id="faq" class="text-align-right margin-1 margin-right-4">FAQ</h2></router-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navigation',
}
</script>
<style scoped>
a{
  text-decoration: none;
  color: black !important;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li h1 {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}

#faq:hover {
  color: rgb(0, 17, 85) !important;
}

#home:hover {
  color: black !important;
}
</style>