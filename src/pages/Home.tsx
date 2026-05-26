import { useDashboardData } from "../hooks/useDashboardData";
import BarChart from "../features/Dashboard/BarChart";
import DoughnutChart from "../features/Dashboard/DoughnutChart";
import { useEffect, useState } from "react";

interface Service {
  id: number;
  name: string;
  clients_count: number;
  total_earned: number;
}

interface User {
  id: number;
  name: string;
  active_clients: number;
  inactive_clients: number;
}

function Home() {
  const { data, isError, error } = useDashboardData();

  const users: User[] = data?.data ?? [];
  const services: Service[] = data?.services ?? [];
  const totals = data?.totals ?? {
    active_clients: 0,
    inactive_clients: 0,
    total_clients: 0,
  };

  // 🔥 THEME DETECTION
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (isError) return <div>Error: {error?.message ?? "Unknown error"}</div>;

  // 🎨 CHART COLOR SYSTEM

  // 🔵 Bar (clients)
  const barColors = isDark
    ? ["#2563eb", "#7c3aed"] // blue + purple
    : ["#21409a", "#D1E9FF"];

  // 🍩 Overview donut
  const overviewColors = isDark
    ? ["#3b82f6", "#8b5cf6"]
    : ["#21409a", "#D1E9FF"];

  // 🧩 Services palette
  const servicePalette = isDark
    ? ["#2563eb", "#7c3aed", "#06b6d4", "#f59e0b"] // blue, purple, cyan, yellow
    : ["#21409a", "#175cd3", "#53b1fd", "#fdb022"];

  return (
    <div
      className="
      p-8 grid grid-cols-3 gap-4 auto-rows-[520px]
      bg-white
      dark:bg-[var(--color-sectionBg)]
    "
    >
      {/* 📊 CLIENTS PER USER */}
      <div className="col-span-2">
        <BarChart
          isDark={isDark}
          heading="Clients per User"
          labels={users.map((u) => u.name)}
          dataValues={[
            users.map((u) => u.active_clients),
            users.map((u) => u.inactive_clients),
          ]}
          datasetLabels={["Active Clients", "Inactive Clients"]}
          colors={barColors}
          stacked
        />
      </div>

      {/* 🍩 OVERVIEW */}
      <div className="col-span-1">
        <DoughnutChart
          isDark={isDark}
          heading="Clients Overview"
          labels={["Active Clients", "Inactive Clients"]}
          dataValues={[totals.active_clients, totals.inactive_clients]}
          colors={overviewColors}
          centerText={{
            label: "Total Clients",
            value: totals.total_clients,
          }}
        />
      </div>

      {/* 🧩 CLIENTS PER SERVICE */}
      <DoughnutChart
        isDark={isDark}
        heading="Clients per Service"
        labels={services.map((s) => s.name)}
        dataValues={services.map((s) => s.clients_count)}
        colors={services.map(
          (_, i) => servicePalette[i % servicePalette.length],
        )}
        centerText={{
          label: "Total Clients",
          value: totals.total_clients,
        }}
      />

      {/* 💰 REVENUE */}
      <div className="col-span-2">
        <BarChart
          isDark={isDark}
          heading="Revenue per Service"
          labels={services.map((s) => s.name)}
          dataValues={services.map((s) => s.total_earned)}
          colors={services.map(
            (_, i) => servicePalette[i % servicePalette.length],
          )}
          darkColors={["#fdb022"]}
          barThickness={100}
        />
      </div>
    </div>
  );
}

export default Home;
