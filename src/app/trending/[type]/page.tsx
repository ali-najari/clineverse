import { notFound } from "next/navigation";
import AppLayout from "@/shared/components/app-layout";
import type { TrendingMediaType } from "@/modules/trending-page/models";
import TrendingMediaPageModule from "@/modules/trending-media-page";

interface TrendingPageProps {
  params: Promise<{
    type: string;
  }>;
}

const TrendingMediaPage = async ({ params }: TrendingPageProps) => {
  const { type } = await params;

  const mediaTypeMap: Record<string, TrendingMediaType> = {
    movies: "movie",
    tv: "tv",
  };

  const mediaType = mediaTypeMap[type];

  if (!mediaType) {
    notFound();
  }

  return (
    <AppLayout>
      <TrendingMediaPageModule mediaType={mediaType} />
    </AppLayout>
  );
};

export default TrendingMediaPage;
