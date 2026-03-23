<script setup>
import FormInput from '../FormInput.vue';
import FormArea from '../FormArea.vue';
import { ref } from 'vue';
import { useLibroStore } from '@/stores/libroStore';

const props = defineProps({
  idLibro: String
});

const emit = defineEmits(['close']);

const libroStore = useLibroStore();
const libro = libroStore.getLibroById(props.idLibro);

const formLibro = ref({
  id: libro?.id,
  nombre: libro?.nombre || "",
  descripcion: libro?.descripcion || "",
  autor: libro?.autor || ""
});

const guardarLibro = () => {
  libroStore.editarLibro(formLibro.value);
  emit('close');
};
</script>

<template>
  <div class="modal-editar">

    <div class="modal-editar__fields">
      <FormInput nombre="Nombre" tipo="text" v-model="formLibro.nombre" />
      <FormInput nombre="Autor" tipo="text" v-model="formLibro.autor" />
      <FormArea nombre="Descripcion" v-model="formLibro.descripcion" />
    </div>

    <div class="modal-editar__footer">
      <button class="modal-editar__btn" @click="guardarLibro">
        Guardar
      </button>
    </div>

  </div>
</template>

<style scoped>
.modal-editar {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.modal-editar__fields {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-bottom: 20px;
}

.modal-editar__footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid var(--md-sys-color-outline);
}

.modal-editar__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 24px;
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  border-radius: var(--md-sys-shape-corner-full);
  border: none;
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: box-shadow 200ms;
}

.modal-editar__btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--md-sys-color-on-primary);
  opacity: 0;
  transition: opacity 200ms;
}

.modal-editar__btn:hover::before  { opacity: 0.08; }
.modal-editar__btn:active::before { opacity: 0.12; }
</style>