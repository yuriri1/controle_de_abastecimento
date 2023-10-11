<template>
  <main class="homepage">
    <div class="img_logo">
      <img src="../assets/logo.png" alt="logo">
    </div>
  </main>
</template>
<script setup>
</script>
<style lang="scss">
.homepage {
  height: 100;
  background-color: var(--primary);
}

.img_logo {
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.img_logo img {
  width: 50%;
  opacity: 0.6;
}
</style>