
import PersonPageModule from "@/modules/person-page";
import AppLayout from "@/shared/components/app-layout";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const PersonPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const personId = Number(id);

  if (!Number.isInteger(personId) || personId <= 0) {
    return <div>Invalid person ID.</div>;
  }

  return (
    <AppLayout>
      <PersonPageModule personId={personId} />
    </AppLayout>
  );
};

export default PersonPage;
