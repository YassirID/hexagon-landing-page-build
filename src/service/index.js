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
    if (response.data && Array.isArray(response.data.data)) {
      const vision =
        response.data.data.find((item) => item.type === 1)?.value || "";
      const mission =
        response.data.data.find((item) => item.type === 2)?.value || "";
      return { vision, mission };
    } else {
      console.error(
        "Invalid data structure for vision-mission:",
        response.data
      );
      return { vision: "No vision data", mission: "No mission data" };
    }
  } catch (error) {
    console.error("Error fetching vision/mission data:", error);
    return {
      vision: "Failed to load vision.",
      mission: "Failed to load mission.",
      error: true,
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
    if (response.data && Array.isArray(response.data.data)) {
      const ourValues = response.data.data.filter((item) => item.type === 1);
      const workValues = response.data.data.filter((item) => item.type === 2);
      return { ourValues, workValues };
    } else {
      console.error("Invalid data structure for values:", response.data);
      return { ourValues: [], workValues: [] };
    }
  } catch (error) {
    console.error("Error fetching value data:", error);
    return { ourValues: [], workValues: [], error: true };
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
      // Memperbaiki URL gambar dari relatif menjadi absolut
      return response.data.data.map((client) => ({
        ...client,
        foto_client: `https://content.hexagon.co.id/storage/${client.foto_client}`,
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
    if (response.data && Array.isArray(response.data.data)) {
      // Memperbaiki URL gambar dari relative menjadi absolute
      return response.data.data.map((gallery) => ({
        ...gallery,
        image: `https://content.hexagon.co.id/storage/${gallery.image}`,
      }));
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

export const fetchTeams = async () => {
  try {
    const response = await axiosInstance.get("/api/teams");
    if (response.data && Array.isArray(response.data.data)) {
      // Memperbaiki URL gambar dari relative menjadi absolute
      return response.data.data.map((team) => ({
        ...team,
        foto_orang: `https://content.hexagon.co.id/storage/${team.foto_orang}`,
      }));
    } else {
      console.error("Invalid data structure for teams:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching teams data:", error);
    return { error: "Failed to fetch teams data. Please try again later." };
  }
};
