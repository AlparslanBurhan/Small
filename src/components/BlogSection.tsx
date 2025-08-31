"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import CardList from "@/components/CardList";
import { useBlogStore } from "@/store/blogStore";

export default function BlogSection() {
  const [scrollTrigger, isInView] = useInView({rootMargin:"150px"});

  const { blogs, blogsFav, fav, loadMoreBlog, loadFavorites, setFav } = useBlogStore();

  useEffect(() => {
    if (isInView && !fav) loadMoreBlog();
  }, [isInView, fav]);

  useEffect(() => {
    if (fav && blogs.length > 0) loadFavorites();
  }, [fav, blogs]);

  useEffect(() => {
    const savedScroll = localStorage.getItem("scrollPosition");
    if (savedScroll) {
      setTimeout(() => window.scrollTo(0, Number(savedScroll)), 100);
    }

    const handleBeforeUnload = () => {
      localStorage.setItem("scrollPosition", String(window.scrollY));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const categories = ["All", "Favorite"];

  return (
    <>
      <div className="w-60 max-w-5xl px-4 my-6">
        <TabGroup onChange={(index) => setFav(categories[index] === "Favorite")}>
          <TabList className="flex space-x-2 justify-center bg-white/10 backdrop-blur-md rounded-full p-1 shadow-md">
            {categories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium rounded-full transition-all 
                  ${selected ? "bg-white/20 text-white" : "text-gray-300 hover:text-white"}`
                }
              >
                {category}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>
      <div className="w-full max-w-5xl px-4">
        <CardList carddatas={fav ? blogsFav : blogs} />
      </div>
      <button ref={scrollTrigger} className="invisible"></button>
    </>
  );
}
