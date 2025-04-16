" use client "
import { DashboardHub } from "../../components/dashboard/dashboardhub/dashboardhub";
import { Orders } from "../../components/dashboard/orders/orders";
import { Transaction } from "../../components/dashboard/transaction";


const Dashboard = () => {
  return (
    <main className=" p-6 overflow-y-auto">
      <Transaction />
      <Orders />
      <DashboardHub />
 
      

  </main>
  );
}
export default Dashboard;



