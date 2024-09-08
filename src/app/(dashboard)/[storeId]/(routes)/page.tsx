import prisma from '@/lib/prismadb';

export default async function DashboardPage({ params }: { params: { storeId: string } }) {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div>
      <h2>Active Store: {store?.name}</h2>
    </div>
  );
}
