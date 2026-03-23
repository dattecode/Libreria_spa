import { defineStore } from "pinia";

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
    eliminarApunte(id) {
      this.apuntes = this.apuntes.filter((apunte) => apunte.id !== id);
    },
    editarApunte(apunte) {
      const existente = this.apuntes.find((a) => a.id === apunte.id);

      if (existente) {
        existente.titulo = apunte.titulo;
        existente.contenido = apunte.contenido;
      }
    }
  },
});
