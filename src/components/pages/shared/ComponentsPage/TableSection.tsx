import React from "react";
import Section from "@/components/shared/Section";
import { Table } from "@/components/ui";
import { Column, Row } from "@/types/ui";

const TableSection = () => {
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
      dataAlign: "center",
      width: 150,
      render: (item, data, idx) => {
        // console.log(item, data, idx);
        return <span>{item}</span>;
      },
    },
  ];

  const rows: Row[] = [
    {
      id: "INV001",
      invoice: "INV001",
      status: "Paid",
      method: "Credit Card",
      amount: "$250.00",
    },
    {
      id: "INV001231",
      invoice: "INV001231",
      status: "Not Paid",
      method: "Credit Card",
      amount: "$250.00",
    },
    {
      id: "INV0123301",
      invoice: "INV0123301",
      status: "Paid",
      method: "Credit Card",
      amount: "$250.00",
    },
    {
      id: "INV234001",
      invoice: "INV234001",
      status: "Not Paid",
      method: "Cash",
      amount: "$250.00",
    },
  ];

  return (
    <Section title="Table">
      <Table columns={column} rows={rows} />
    </Section>
  );
};

export default TableSection;
