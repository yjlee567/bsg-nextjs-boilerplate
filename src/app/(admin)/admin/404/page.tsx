import { DashboardLayout } from "@/layout";
import NotFoundPage from "@/components/pages/shared/NotFoundPage";

const NotFound = () => {
  return (
    <DashboardLayout title="404">
      <NotFoundPage />
    </DashboardLayout>
  );
};

export default NotFound;
