import type { Metadata } from "next";
import StratBoardClient from "./StratBoardClient";

export const metadata: Metadata = {
  title: "Strat Board",
  robots: { index: false, follow: false },
};

export default function StratBoardPage() {
  return <StratBoardClient />;
}
