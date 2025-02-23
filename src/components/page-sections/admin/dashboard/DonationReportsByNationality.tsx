"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSWR } from "@/hooks/use-swr";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const COLORS = [
  "hsl(var(--primary))",
  "oklch(0.897 0.196 126.665)",
  "oklch(0.707 0.165 254.624)",
  "oklch(0.702 0.183 293.541)",
  "oklch(0.837 0.128 66.29)",
];
const RADIAN = Math.PI / 180;

export default function DonationReportByNationality() {
  const { data, isLoading } = useSWR("/reports/donations/nationality-graph");

  return (
    <Card className="rounded-xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex-1">
          <CardTitle> Top Nations </CardTitle>
          <CardDescription />
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div> Loading... </div>
        ) : (
          <div className="h-[325px] w-full">
            <PieChartGraph data={data?.data?.results} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const PieChartGraph = ({
  data,
}: {
  data: { graphData: Record<string, any>[]; totalDonation: number };
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={300} height={300}>
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.05)" }}
          content={({ ...props }) => <CustomizedTooltip {...props} />}
        />

        <Legend
          iconSize={10}
          iconType="diamond"
          formatter={(_val, entry) => (
            <span className="text-xs text-gray-500">
              {entry.payload && "nationality" in entry.payload
                ? entry.payload?.nationality
                : (null as any)}
            </span>
          )}
        />

        <Pie
          dataKey="total_amount"
          startAngle={360}
          endAngle={0}
          data={data.graphData?.map((d) => ({
            ...d,
            total_amount: Number(d.total_amount),
          }))}
          cx="50%"
          cy="50%"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.graphData?.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomizedTooltip = <TValue extends ValueType, TName extends NameType>({
  active,
  payload,
  label,
}: TooltipProps<TValue, TName>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border bg-white p-4">
        <ul>
          {Array.isArray(payload) &&
            payload.map((p, index) => (
              <li
                key={index}
                className="grid grid-cols-[1fr_50px] gap-5 text-xs font-medium text-gray-500"
              >
                <div className="flex-1"> {p.payload?.nationality} </div>
                <div className="whitespace-nowrap text-right font-bold text-gray-700">
                  ৳ {p.value}
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  return null;
};
