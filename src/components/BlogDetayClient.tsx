"use client";

import { getCardDataById, setFav, getFavoriteId } from "@/services/api";
import { FaRegSmile, FaRegClock, FaUser, FaHeart, FaRegHeart } from "react-icons/fa";
import ClapCounter from "@/components/ClapCounter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function BlogDetayClient({ id }: { id: string }) {
    const blogId = Number(id);
    const queryClient = useQueryClient();

    const { data: blog, isLoading: blogLoading } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => getCardDataById(blogId),
    });

    const { data: favData, isLoading: favLoading } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavoriteId,
    });

    const favIds: number[] = favData?.[0]?.fav ?? [];
    const isFav = favIds.includes(blogId);

    const favMutation = useMutation({
        mutationFn: (newFavIds: number[]) => setFav(newFavIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });

    const toggleFav = () => {
        let newFavIds: number[];
        if (isFav) {
            newFavIds = favIds.filter((id) => id !== blogId);
        } else {
            newFavIds = [...favIds, blogId];
        }
        favMutation.mutate(newFavIds);
    };

    if (blogLoading || favLoading) {
        return (
            <main className="max-w-4xl mx-auto p-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-300 text-base">Yükleniyor...</p>
                </div>
            </main>
        );
    }

    if (!blog) {
        return (
            <main className="max-w-4xl mx-auto p-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
                    <p className="text-red-500">Veri bulunamadı</p>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <img
                    src={`/${blog.id % 10}.jpg`}
                    alt={blog.baslik}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                    loading="eager"
                />
            </div>

            <div className="mb-8 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                    {blog.baslik}
                </h1>

                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium space-x-6 flex-wrap">
                    <div className="flex items-center gap-2">
                        <FaRegClock className="text-indigo-500" />
                        <time dateTime={blog.yazilma_tarihi}>
                            {new Date(blog.yazilma_tarihi).toLocaleDateString("tr-TR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaUser className="text-blue-400" />
                        <span>Alparslan Burhan</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaRegSmile className="text-yellow-400" />
                        <ClapCounter initialClaps={blog.clap_sayisi} blogId={blog.id} />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleFav}
                            className="text-red-500 flex items-center gap-1"
                            disabled={favMutation.isPending}
                        >
                            {isFav
                                ? (<><FaHeart /> Favoriden çıkar</>)
                                : (<> <FaRegHeart /> Favorilere ekle</>)
                            }
                        </button>
                    </div>
                </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800">
                <article className="prose prose-lg dark:prose-invert max-w-none text-white">
                    {blog.tum_metin}
                </article>
            </div>
        </main>
    );
}
