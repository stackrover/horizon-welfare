"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSWR } from "@/hooks/use-swr";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const PERIOD = [
  { label: "Last 7 Days", value: "last_7_days" },
  { label: "Last 30 Days", value: "last_30_days" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "Last 3 Months", value: "last_3_months" },
  { label: "Last 6 Months", value: "last_6_months" },
  { label: "This Year", value: "this_year" },
  { label: "Last Year", value: "last_year" },
  { label: "Last 5 Years", value: "last_5_years" },
];

// Helper function to format large numbers using Intl.NumberFormat
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
};

export const DonationOverviewCharts = () => {
  const [period, setPeriod] = React.useState("last_30_days");

  const { data, isLoading } = useSWR("/donations/reports", { period });

  return (
    <Card className="rounded-xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex-1">
          <CardTitle> Donation reposts </CardTitle>
          <CardDescription></CardDescription>
        </div>

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="">
            {PERIOD.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div> Loading... </div>
        ) : (
          <div className="h-[300px]">
            <BarChartGraph data={data?.data?.results || []} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const BarChartGraph = ({ data }: { data: Record<string, any>[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="period"
          tickLine={false}
          tick={{ fontSize: "12px", fontWeight: "500" }}
          axisLine={{ stroke: "lightgray" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickCount={15}
          tick={{ fontSize: "12px", fontWeight: "500" }}
          tickFormatter={formatNumber}
        />
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.05)" }}
          content={({ ...props }) => <CustomizedTooltip {...props} />}
        />
        <Legend
          iconSize={10}
          iconType="diamond"
          formatter={(val: any) => (
            <span className="text-xs text-gray-500">{val}</span>
          )}
        />
        <Bar
          dataKey="BDT"
          fill="hsl(var(--primary))"
          name="BDT (Bangladeshi Taka)"
        />
        <Bar dataKey="USD" fill="#9ae600" name="USD (US Dollar)" />
        <Bar dataKey="Others" fill="#7c86ff" name="Other Currencies" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomizedTooltip = <TValue extends ValueType, TName extends NameType>({
  active,
  payload,
  label,
}: TooltipProps<TValue, TName>) => {
  console.log({ active, payload, label });
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border bg-white p-4">
        <p className="mb-1.5 text-xs font-semibold text-gray-500">
          Date: <span> {label} </span>
        </p>
        <ul>
          {Array.isArray(payload) &&
            payload.map((p, index) => (
              <li
                key={index}
                className="grid grid-cols-[1fr_50px] gap-5 text-xs font-medium text-gray-500"
              >
                <div className="flex-1"> {p.name} </div>
                <div className="text-right font-bold text-gray-700">
                  {p.value}
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  return null;
};
