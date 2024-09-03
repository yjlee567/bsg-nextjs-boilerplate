import { DashboardLayout } from "@/layout";
import ForbiddenPage from "@/components/pages/shared/ForbiddenPage";

const Forbidden = () => {
  return (
    <DashboardLayout title="403">
      <ForbiddenPage />
    </DashboardLayout>
  );
};

export default Forbidden;
