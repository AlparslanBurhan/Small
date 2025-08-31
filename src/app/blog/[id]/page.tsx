import BlogDetayClient from "@/components/BlogDetayClient";
import { BlogPageParams } from "@/types/interfaces";

export default async function BlogDetayPage({ params }: { params: Promise<BlogPageParams> }) {
  const { id } = await params;
  return <BlogDetayClient id={id} />;
}
