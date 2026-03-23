<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const route = useRoute();

// controlar visibilidad al hacer scroll
const visible = ref(true);
let lastScroll = 0;

const handleScroll = () => {
  const current = window.scrollY;

  if (current > lastScroll && current > 50) {
    visible.value = false; // baja → ocultar
  } else {
    visible.value = true; // sube → mostrar
  }

  lastScroll = current;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav :class="['nav', { 'nav--hidden': !visible }]">
    <div class="nav__logo">
      <h3 class="nav__title">Biblioteca Spa</h3>
    </div>
    <div class="nav__items">
      <router-link to="/" class="nav__item">
        Inicio
        <span
          class="nav__indicator"
          :class="{ active: route.path === '/' }"
        ></span>
      </router-link>

      <router-link to="/lista" class="nav__item">
        Lista
        <span
          class="nav__indicator"
          :class="{ active: route.path === '/lista' }"
        ></span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 1000;

  display: flex;
  gap: 24px;
  padding: 12px 24px;
  justify-content: space-between;

  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);

  transition: transform 300ms ease;
}

.nav__logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav__title {
  font-size: var(--md-sys-typescale-title-medium-size);
  font-weight: 800;
}

/* ocultar navbar */
.nav--hidden {
  transform: translateY(-100%);
}

/* items */

.nav__items {
  display: flex;
  gap: var(--md-sys-typescale-display-small-size);
}

.nav__item {
  position: relative;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  padding: 8px 4px;
  cursor: pointer;
  font-size: var(--md-sys-typescale-title-medium-size);
}

/* indicador base */
.nav__indicator {
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 3px;

  background-color: var(--md-sys-color-on-primary);
  border-radius: 2px;

  opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: all 200ms ease;
}

/* activo */
.nav__indicator.active {
  opacity: 1;
  transform: scaleX(1);
}
</style>
