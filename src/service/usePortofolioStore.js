// stores/usePortofolioStore.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const usePortofolioStore = defineStore('portofolio', {
  state: () => ({
    projectList: [],
    selectedProject: null,
  }),

  actions: {
async fetchProjectList() {
  try {
    const response = await axios.get('https://api.hexagon.co.id/api/Portofolio/');
    if (response.data && response.data.data) {
      this.projectList = response.data.data.map(item => ({
        id: item.portofolio_id,
        tag: item.Kategori,
        title: item.judul_porto,
        description: item.ket_porto,
        image: item.images?.[0] || '', 
        ...item 
      }));
    } else {
      console.error('Struktur data API tidak sesuai');
    }
  } catch (error) {
    console.error('Gagal mengambil data project:', error);
  }
},

    async fetchProjectById(id) {
      try {
        const response = await axios.get(`https://api.hexagon.co.id/api/Portofolio/${id}`);
        if (response.data && response.data.data) {
          this.selectedProject = response.data.data;
        } else {
          console.error('Struktur data API tidak sesuai');
        }
      } catch (error) {
        console.error('Gagal mengambil data project berdasarkan ID:', error);
      }
    },

    clearSelectedProject() {
      this.selectedProject = null;
    }
  }
});
