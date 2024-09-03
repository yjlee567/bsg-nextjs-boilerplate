"use client";

import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Widget, Table } from "@/components/ui";
import { Column, Row } from "@/types/ui";
import { useBasePath } from "@/hooks";

interface Props {}

const column: Column[] = [
  {
    id: "invoice",
    label: "Invoice",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "method",
    label: "Method",
  },
  {
    id: "amount",
    label: "Amount",
    dataAlign: "right",
    render: (item, data, idx) => {
      // console.log(item, data, idx);
      return <span>{item}</span>;
    },
  },
];

const rows: Row[] = [
  {
    id: "0",
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  {
    id: "1",
    invoice: "INV001231",
    status: "Not Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  {
    id: "2",
    invoice: "INV0123301",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  {
    id: "3",
    invoice: "INV234001",
    status: "Not Paid",
    method: "Cash",
    amount: "$250.00",
  },
];

const DashboardPage: React.FC<Props> = ({}) => {
  const { basePath } = useBasePath();

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Widget>
          <div className="flex justify-between items-center mb-1">
            <h4>Total Revenue</h4>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </div>
        </Widget>
        <Widget>
          <div className="flex justify-between items-center mb-1">
            <h4>Subscriptions</h4>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </div>
        </Widget>
        <Widget>
          <div className="flex justify-between items-center mb-1">
            <h4>Sales</h4>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </div>
        </Widget>
        <Widget>
          <div className="flex justify-between items-center mb-1">
            <h4>Active Now</h4>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </div>
        </Widget>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Widget
          title="Transactions"
          description="Recent transactions from your store."
          href={`${basePath}/components`}
          gap={4}
        >
          <Table columns={column} rows={rows} defaultColumn={{ width: "auto" }} />
        </Widget>
        <Widget title="Orders" description="Recent orders from your store">
          <p>Content</p>
        </Widget>
      </div>
    </div>
  );
};

export default DashboardPage;
