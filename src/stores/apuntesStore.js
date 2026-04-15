import { defineStore } from "pinia";
import { useTagStore } from "./tagStore";

export const useApuntesStore = defineStore("apuntes", {
  state: () => ({
    apuntes: [],
  }),

  getters: {
    getTotalApuntes: (state) => state.apuntes.length,
    getApuntesById: (state) => (id) =>
      state.apuntes.find((apunte) => apunte.id === id),
    getApuntesByLibroId: (state) => (idLibro) =>
      state.apuntes.filter((apunte) => apunte.libroId === idLibro),
  },

  actions: {
    agregarApunte(apunte) {
      this.apuntes.push(apunte);
    },

    eliminarApunte(apunteId) {
      this.apuntes = this.apuntes.filter((a) => a.id !== apunteId);
    },

    editarApunte(apunte) {
      const existente = this.apuntes.find((a) => a.id === apunte.id);

      if (existente) {
        existente.titulo = apunte.titulo;
        existente.contenido = apunte.contenido;
      }
    },
  },
});
