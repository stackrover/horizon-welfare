"use client ";
import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useSWR } from "@/hooks/use-swr";

export default function RecentTransactons() {
  // const { data, isLoading } = useSWR("/donor/donations/recent");

  // console.log({ data, isLoading });

  return (
    <Card>
      <CardHeader>
        <CardTitle> Recent Transactions </CardTitle>
        <CardDescription className="hidden" />
      </CardHeader>

      <CardContent>Hello</CardContent>
    </Card>
  );
}
