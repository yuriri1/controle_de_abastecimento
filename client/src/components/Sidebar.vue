<template>
  <aside :class="`${is_open && 'is_open'}`">
    <div class="menu-burger">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">
          menu
        </span>
      </button>
    </div>
    <h3>MENU</h3>
    <div class="menu">
      <router-link class="button" to="/">
        <span class="material-icons">home</span>
        <span class="text-aside">Home</span>
      </router-link>
      <router-link class="button" to="/modelo">
        <span class="material-icons">car_repair</span>
        <span class="text-aside">Modelo</span>
      </router-link>
      <router-link class="button" to="/veiculo">
        <span class="material-icons">directions_car</span>
        <span class="text-aside">Veiculo</span>
      </router-link>
      <router-link class="button" to="/abastecimento">
        <span class="material-icons">local_gas_station</span>
        <span class="text-aside">Abastecimento</span>
      </router-link>
      <router-link class="button" to="/consulta">
        <span class="material-icons">query_stats</span>
        <span class="text-aside">Consulta</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const is_open = ref(false);

const ToggleMenu = () => {
  is_open.value = !is_open.value;
}
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: var(--dark);
  color: var(--primary);

  transition: 0.2s ease-out;

  .menu-burger {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: inherit;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2.5rem;
        color: var(--light);
      }

      &:hover {
        .material-icons {
          color: var(--accent);
          transform: scale(1.1);
        }
      }
    }
  }

  h3,
  .button .text-aside {
    opacity: 0;
    transition: 0.3s;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--light);
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 1.5rem;
        margin-right: 1rem;
        color: var(--light);
      }

      .text-aside {
        font-size: 1.2rem;
        font-weight: 500;
        color: var(--light);
      }

      &:hover,
      &.router-link-active {
        background-color: var(--accent);
        border-radius: 0.5rem;

        .material-icons,
        .text-aside {
          color: var(--dark);
        }
      }

      &.router-link-active {
        .material-icons {
          transform: scale(1.1);
        }
      }

    }
  }

  &.is_open {
    width: var(--sidebar-width);

    .menu-burger {
      top: -3rem;
    }

    h3,
    .button .text-aside {
      opacity: 1;
    }
  }


  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }


}
</style>