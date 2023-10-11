
<template>
  <div class="app">
    <Sidebar />
    <router-view />
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';


</script>

<style lang="scss">
:root {
  --primary: #f5f5f5;
  --secondary: #e0e0e0;
  --accent: #ff5252;
  --accent-hover: #c53e3e;
  --dark: #212121;
  --light: #757575;
  --text-primary: #212121;
  --text-secondary: #757575;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Sora', sans-serif;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 768px) {
      padding: 6rem;
    }
  }
}
</style>
