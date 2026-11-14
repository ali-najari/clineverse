import MediaDetailsPageModule from "@/modules/media-details-page";
import AppLayout from "@/shared/components/app-layout";

interface PageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

const MediaDetailsPage = async ({ params }: PageProps) => {
  const { id, type } = await params;

  const mediaType = type === "movies" ? "movies" : "tv";

  return (
    <AppLayout>
      <MediaDetailsPageModule
        mediaType={mediaType}
        mediaId={Number(id)}
      />
    </AppLayout>
  );
};

export default MediaDetailsPage;