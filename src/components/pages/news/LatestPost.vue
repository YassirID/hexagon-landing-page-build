<script setup>
import LatestNews from "@/components/News/LatestNews.vue";
import BlogPost from "../../News/BlogPost.vue";
</script>

<template>
  <div class="py-24">
    <div class="px-[56px] md:px-[112px]">
      <div class="flex items-center justify-center mb-0">
        <span class="inline text-3xl font-semibold text-[#212529] dark:text-white">Latest Posts</span>
      </div>
    </div>
    <latest-news></latest-news>
  </div>
</template>

