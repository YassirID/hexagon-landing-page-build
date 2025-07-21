import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ServiceView from "@/views/ServiceView.vue";
import PortolioView from "@/views/PortofolioView.vue";
import AboutUsViewVue from "@/views/AboutUsView.vue";
import NewsView from "@/views/NewsView.vue";
import BlogPostView from "@/views/BlogPostView.vue";
import PortofolioPostView from "@/views/PortofolioPostView.vue";
import CareerView from "@/views/CareerView.vue";
import ContactView from "@/views/ContactView.vue";
import PositionDetailView from "@/views/PositionDetailView.vue";
import FaqView from "@/views/FaqView.vue";
import ProjectDetail  from "@/components/pages/portofolio/projectDetail.vue";

// Array routes
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about-us",
    name: "about-us",
    component: AboutUsViewVue,
  },
  {
    path: "/services",
    name: "services",
    component: ServiceView,
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: PortolioView,
  },
  {
    path: "/news",
    name: "news",
    component: NewsView,
  },
  {
    path: "/career",
    name: "career",
    component: CareerView,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
  {
    path: "/news/:id",
    name: "news-detail",
    component: BlogPostView,
  },
  {
    path: "/faq",
    name: "faq",
    component: FaqView,
  },
  {
    path: "/portfolio/:id",
    name: "portfolio-detail",
    component: ProjectDetail,
    props: true,
  },
  {
    path: "/career/:id",
    name: "position-detail",
    component: PositionDetailView,
    props: true,
  },
];

// Router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; 
    } else {
      return { top: 0 }; 
    }
  },
});

export default router;
