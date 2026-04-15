<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useApuntesStore } from '@/stores/apuntesStore';
import { useTagStore } from '@/stores/tagStore';
import FormInput from '../FormInput.vue';
import FormArea from '../FormArea.vue';

const props = defineProps({
  idLibro: String
});

const apuntesStore = useApuntesStore();
const tagStore = useTagStore();

const emit = defineEmits(['close']);

const apunteRef = ref({
  id: null,
  titulo: "",
  contenido: "",
  libroId: null,
  tagId: null,
});

const guardarApunte = () => {

  if (apunteRef.value.titulo === "" || apunteRef.value.contenido === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (!tagStore.tagActivo) {
  alert("Debes seleccionar un tag");
  return;
}

  apunteRef.value.id = uuidv4();
  apunteRef.value.libroId = props.idLibro;
  apunteRef.value.tagId = tagStore.tagActivo?.id;

  // acá irá la acción de la store
  apuntesStore.agregarApunte({ ...apunteRef.value });

  apunteRef.value.titulo = "";
  apunteRef.value.contenido = "";
  apunteRef.value.id = null;
  apunteRef.value.tagId = null;

  emit('close');
};
</script>

<template>
  <div class="modal-apuntes">

    <div class="modal-apuntes__fields">
      <FormInput
        nombre="Titulo"
        tipo="text"
        v-model="apunteRef.titulo"
      />
      <FormArea
        nombre="Contenido"
        v-model="apunteRef.contenido"
      />
    </div>

    <div class="modal-apuntes__footer">
      <button class="modal-apuntes__btn" @click="guardarApunte">
        Guardar
      </button>
    </div>

  </div>
</template>

<style scoped>
.modal-apuntes {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.modal-apuntes__fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 20px;
}

.modal-apuntes__footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid var(--md-sys-color-outline);
}

.modal-apuntes__btn {
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

.modal-apuntes__btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--md-sys-color-on-primary);
  opacity: 0;
  transition: opacity 200ms;
}

.modal-apuntes__btn:hover::before  { opacity: 0.08; }
.modal-apuntes__btn:active::before { opacity: 0.12; }
</style>