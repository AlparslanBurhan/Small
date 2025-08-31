import AuthorInfo from "@/components/AuthorInfo";
import BlogSection from "@/components/BlogSection";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <AuthorInfo />
      <BlogSection />
    </div>
  );
}
