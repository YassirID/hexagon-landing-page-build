import { defineStore } from "pinia";
import axiosInstance from "@/axios";

const fetchMainData = async () => {
  try {
    const response = await axiosInstance.get("/api/main");
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      // The error is logged, but we return null to allow the component to handle it gracefully.
      console.error("No data found in /api/main response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error fetching /api/main data:", error);
    return { error: "Failed to fetch main data. Please try again later." };
  }
};
export const fetchAboutData = fetchMainData;
export const fetchContact = fetchMainData;

export const fetchNews = async () => {
  try {
    const response = await axiosInstance.get("/api/news");
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    console.error("Error fetching news data:", error);
    return { error: "Failed to fetch news data. Please try again later." };
  }
};
export const fetchReview = async () => {
  try {
    const response = await axiosInstance.get("/api/reviews");
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    console.error("Error fetching about data:", error);
    return { error: "Failed to fetch review data. Please try again later." };
  }
};
export const fetchVisionMission = async () => {
  try {
    const response = await axiosInstance.get("/api/vision-mission");
    if (response.data) {
      return response.data;
    } else {
      return { vision: "", mission: "" };
    }
  } catch (error) {
    console.error("Error fetching vision/mission data:", error);
    return {
      vision: "Failed to load vision.",
      mission: "Failed to load mission.",
    };
  }
};
export const fetchCareer = async (type) => {
  try {
    const response = await axiosInstance.get("/api/careers", {
      params: { type },
    });

    if (response.data) {
      return response.data.data || []; // Ensure it returns an array
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching career data:", error);
    return [];
  }
};

export const fetchJobDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/careers/${id}`);

    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    console.error("Error fetching job detail:", error);
    return { error: "Failed to fetch job detail. Please try again later." };
  }
};

export const fetchValue = async () => {
  try {
    const response = await axiosInstance.get("/api/values");
    if (response.data) {
      return response.data;
    } else {
      return { ourValues: [], workValues: [] };
    }
  } catch (error) {
    console.error("Error fetching value data:", error);
    return { ourValues: [], workValues: [] };
  }
};
export const fetchOurClient = async (status = null) => {
  try {
    const params = {};
    if (status !== null) {
      params.status = status;
    }
    const response = await axiosInstance.get("/api/clients", { params });
    if (response.data && Array.isArray(response.data.data)) {
      // Memperbaiki URL gambar dari http menjadi https
      return response.data.data.map((client) => ({
        ...client,
        foto_client: client.foto_client.replace(/^http:\/\//i, "https://"),
      }));
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    console.error("Error fetching client data:", error);
    return { error: "Failed to fetch client data. Please try again later." };
  }
};
export const fetchGallery = async (type) => {
  try {
    const response = await axiosInstance.get("/api/galleries");
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("No data found in response");
    }
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return { error: "Failed to fetch gallery data. Please try again later." };
  }
};

export const usePortofolioStore = defineStore("portfolios", {
  state: () => ({
    projects: [],
    projectDetails: null,
  }),
  actions: {
    async fetchProjects() {
      try {
        const response = await axiosInstance.get("/api/portfolios");
        this.projects = response.data.data.map((item) => ({
          id: item.portofolio_id,
          tag: item.category?.nama_kategori || "Uncategorized",
          title: item.judul_porto,
          description: item.ket_porto,
          image:
            item.photos?.length && item.photos[0].nama_foto
              ? `https://content.hexagon.co.id/storage/${item.photos[0].nama_foto}`
              : "",
          urlYoutube: item.url_youtube,
          alt: item.judul_porto,
        }));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    async fetchProjectById(id) {
      try {
        const response = await axiosInstance.get(`/api/portfolios/${id}`);

        if (response.data && response.data.data) {
          const projectData = Array.isArray(response.data.data)
            ? response.data.data[0]
            : response.data.data;
          this.projectDetails = {
            project: projectData.judul_porto,
            image: projectData.photos?.length
              ? `https://content.hexagon.co.id/storage/${projectData.photos[0].nama_foto}`
              : "",
            link: projectData.url_youtube,
            tags: projectData.category
              ? [projectData.category.nama_kategori]
              : [],
            content: projectData.ket_porto,
          };
        } else {
          throw new Error("Invalid data structure received from API");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
        this.projectDetails = null; // Reset state on error
      }
    },
  },
});
