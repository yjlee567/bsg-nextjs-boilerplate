import { MainPage } from "@/components/pages/admin";
import { DashboardLayout } from "@/layout";

export const metadata = {
  title: "BSG Portal Admin",
  description: "BSG Portal Admin",
};

const Admin = () => {
  return (
    <DashboardLayout title="Home" fixedHeight={false} hasPadding={false}>
      <MainPage />
    </DashboardLayout>
  );
};

export default Admin;
