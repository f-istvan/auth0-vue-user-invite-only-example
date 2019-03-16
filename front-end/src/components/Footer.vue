<template>
  <div>
    <footer>
      <span class="left">Developer: f.istvan1984@gmail.com</span>
      <span class="right">Vesrsion: 1.0.0</span>
    </footer>
  </div>
</template>

<script>
</script>

<style scoped>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: #f8f8f8;
  color: #555;
  display: table;
}

footer span {
  display: table-cell;
  vertical-align: middle;
}

footer span.left {
  text-align: left;
  padding-left: 20px;
}

footer span.right {
  text-align: right;
  padding-right: 20px;
}
</style>
