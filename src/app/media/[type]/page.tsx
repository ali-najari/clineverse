import MediaPageModule from "@/modules/media-page";
import AppLayout from "@/shared/components/app-layout";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

const MediaPage = async ({ params }: PageProps) => {
  const { type } = await params;

  const mediaType = type === "movies" ? "movies" : "tv-shows";

  return (
    <AppLayout>
      <MediaPageModule type={mediaType} />
    </AppLayout>
  );
};

export default MediaPage;