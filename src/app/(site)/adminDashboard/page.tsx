import Breadcrumb from "@/components/Common/Breadcrumb";
import DashboardLayout from "@/components/Admin/index";
import MonthlySalesChart from "@/components/Users/MonthlySalesChart";
import { SalesMetrics } from "@/components/Users/SalesMetrics";
import MonthlyTarget from "@/components/Users/MonthlyTarget";

const AdminPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Admin Dashboard Page" />
      <DashboardLayout>
          <div className="p-4 bg-white shadow-md rounded-lg"> 
          </div>
      {/* <div className="grid grid-cols-12 gap-4 md:gap-6"> */}
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <SalesMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

    {/* </div> */}
      </DashboardLayout>
    </main>
  );
};

export default AdminPage;
