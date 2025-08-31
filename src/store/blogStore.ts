import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCardData, getCardDataById, getFavoriteId } from "@/services/api";
import { CardData } from "@/types/interfaces";
import { LIMIT } from "@/constant/blogLimit";

type BlogState = {
  blogs: CardData[];
  blogsFav: CardData[];
  currentLimit: number;
  reachLimit: boolean;
  fav: boolean;
  loadMoreBlog: () => Promise<void>;
  loadFavorites: () => Promise<void>;
  setFav: (value: boolean) => void;
};

export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      blogs: [],
      blogsFav: [],
      currentLimit: LIMIT,
      reachLimit: false,
      fav: false,

      loadMoreBlog: async () => {
        const { currentLimit, reachLimit, blogs } = get();
        if (reachLimit) return;

        const blogData = await getCardData(currentLimit);
        set({
          blogs: [...blogs, ...blogData],
          currentLimit: currentLimit + 1,
          reachLimit: blogData.length === 0,
        });
      },

      loadFavorites: async () => {
        const favoriteData = await getFavoriteId();
        const favIds = favoriteData[0]?.fav ?? [];
        const favPromises = favIds.map((id: number) => getCardDataById(id));
        const favBlogs = await Promise.all(favPromises);
        set({ blogsFav: favBlogs });
      },

      setFav: (value) => set({ fav: value }),
    }),
    {
      name: "blog-storage",
    }
  )
);
