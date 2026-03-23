<script setup>
import { ref } from "vue";
import FormInput from "./FormInput.vue";
import FormArea from "./FormArea.vue";
import { useApuntesStore } from "@/stores/apuntesStore";

const props = defineProps({
  apunte: {
    type: Object,
    required: true,
  },
});

const apuntesStore = useApuntesStore();

const isEditing = ref(false);

const editingRef = ref({
  titulo: props.apunte.titulo,
  contenido: props.apunte.contenido,
});

const startEditing = () => {
  // al abrir edición, sincronizamos por si el apunte cambió
  editingRef.value.titulo = props.apunte.titulo;
  editingRef.value.contenido = props.apunte.contenido;
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const eliminar = () => {
  apuntesStore.eliminarApunte(props.apunte.id);
};

const guardar = () => {
  // acá irá libroStore.editarApunte cuando la tengas
  editingRef.value.id = props.apunte.id;
  editingRef.value.libroId = props.apunte.libroId;

  apuntesStore.editarApunte({ ...editingRef.value });

  isEditing.value = false;
};
</script>

<template>
  <article class="apunte-card" :class="{ 'apunte-card--editing': isEditing }">
    <!-- ── HEADER: título + acciones ──────────────── -->
    <div class="apunte-card__header">
      <!-- MODO LECTURA: título como texto -->
      <h3 v-if="!isEditing" class="apunte-card__title">
        {{ props.apunte.titulo }}
      </h3>

      <!-- MODO EDICIÓN: título como input -->
      <div v-else class="apunte-card__field">
        <FormInput nombre="Titulo" tipo="text" v-model="editingRef.titulo" />
      </div>

      <!-- ACCIONES — cambian según el modo -->
      <div class="apunte-card__actions">
        <!-- MODO LECTURA -->
        <template v-if="!isEditing">
          <button
            class="apunte-card__btn apunte-card__btn--edit"
            @click="startEditing"
          >
            Editar
          </button>
          <button
            class="apunte-card__btn apunte-card__btn--delete"
            @click="eliminar"
          >
            Eliminar
          </button>
        </template>

        <!-- MODO EDICIÓN -->
        <template v-else>
          <button
            class="apunte-card__btn apunte-card__btn--cancel"
            @click="cancelEditing"
          >
            Cancelar
          </button>
          <button
            class="apunte-card__btn apunte-card__btn--save"
            @click="guardar"
          >
            Guardar
          </button>
        </template>
      </div>
    </div>

    <!-- ── CONTENIDO ────────────────────────────── -->

    <!-- MODO LECTURA: contenido como texto -->
    <p v-if="!isEditing" class="apunte-card__content">
      {{ props.apunte.contenido }}
    </p>

    <!-- MODO EDICIÓN: contenido como textarea -->
    <div v-else class="apunte-card__field">
      <FormArea nombre="Contenido" v-model="editingRef.contenido" />
    </div>
  </article>
</template>

<style scoped>
/* ─────────────────────────────────────────────
   CARD BASE
 
───────────────────────────────────────────── */
.apunte-card {
  background-color: var(--md-sys-color-surface);
  border-radius: var(--md-sys-shape-corner-extra-small);
  box-shadow: var(--md-sys-elevation-level1);
  border-left: 4px solid var(--md-sys-color-primary-container);
  padding: 16px;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  transition:
    border-color 150ms,
    box-shadow 200ms;
}

/* cuando está en edición: borde primario completo y sombra level2 */
.apunte-card--editing {
  border-left-color: var(--md-sys-color-primary);

  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 2px 6px 2px rgba(0, 0, 0, 0.15);
}

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
.apunte-card__header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.apunte-card__title {
  font-size: var(--md-sys-typescale-title-medium-size); /* 16px */
  font-weight: 500;
  color: var(--md-sys-color-on-surface);
  margin: 0;
  line-height: 1.4;
  /* cuando el título es largo no aplasta las acciones */
  flex: 1;
  min-width: 0;
  height: 46px;
}

/* el field de edición también crece */
.apunte-card__field {
  flex: 1;
  height: 70px;
}

/* ─────────────────────────────────────────────
   CONTENIDO
───────────────────────────────────────────── */
.apunte-card__content {
  font-size: var(--md-sys-typescale-body-medium-size); /* 14px */
  font-weight: 400;
  line-height: 1.6;
  color: var(--md-sys-color-on-surface-variant);
  margin: 0;
  height: 56px;
}

/* ─────────────────────────────────────────────
   ACCIONES — Text Buttons
   
   Mismo patrón de CardLibro:
     - sin fondo ni borde
     - state layer con ::before
     - color según rol: primario / error / cancel
───────────────────────────────────────────── */
.apunte-card__actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0; /* las acciones no se comprimen */
}

.apunte-card__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 12px;
  border: none;
  border-radius: var(--md-sys-shape-corner-full);
  font-size: var(--md-sys-typescale-label-large-size); /* 14px */
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  background: transparent;
  position: relative;
  overflow: hidden;
  transition: background 150ms;
  white-space: nowrap;
}

.apunte-card__btn::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 200ms;
  border-radius: inherit;
}

.apunte-card__btn:hover::before {
  opacity: 0.08;
}
.apunte-card__btn:active::before {
  opacity: 0.12;
}

/* Editar → primario */
.apunte-card__btn--edit {
  color: var(--md-sys-color-primary);
}
.apunte-card__btn--edit::before {
  background: var(--md-sys-color-primary);
}

/* Eliminar → error */
.apunte-card__btn--delete {
  color: #b3261e;
}
.apunte-card__btn--delete::before {
  background: #b3261e;
}

/* Cancelar → on-surface-variant, menos énfasis */
.apunte-card__btn--cancel {
  color: var(--md-sys-color-on-surface-variant);
}
.apunte-card__btn--cancel::before {
  background: var(--md-sys-color-on-surface-variant);
}

/* Guardar → filled pequeño, acción principal en edición */
.apunte-card__btn--save {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  padding: 0 16px;
}
.apunte-card__btn--save::before {
  background: var(--md-sys-color-on-primary);
}
</style>
