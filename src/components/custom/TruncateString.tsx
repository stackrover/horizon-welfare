import { TruncateStringProps } from "@/types/types";
import _ from "lodash";
import React from "react";

export function TruncateString({
  children,
  length,
  separator,
}: TruncateStringProps) {
  const truncatedStr = _.truncate(children, {
    length: length,
    separator: separator,
  });
  return <React.Fragment>{truncatedStr}</React.Fragment>;
}
