import { useDashboardData } from "../hooks/useDashboardData";
import BarChart from "../features/Dashboard/BarChart";
import DoughnutChart from "../features/Dashboard/DoughnutChart";

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

  // SAFE VALUES — ništa se ne ruši dok loaduje
  const users: User[] = data?.data ?? [];
  const services: Service[] = data?.services ?? [];
  const totals = data?.totals ?? {
    active_clients: 0,
    inactive_clients: 0,
    total_clients: 0,
  };

  if (isError) return <div>Error: {error?.message ?? "Unknown error"}</div>;

  const servicePalette = ["#027A48", "#039855", "#12B76A", "#6CE9A6"];

  return (
    <div className="p-8 grid grid-cols-3 gap-4 auto-rows-[520px]">
      <div className="col-span-2">
        <BarChart
          heading="Clients per User"
          labels={users.map((u) => u.name)}
          dataValues={[
            users.map((u) => u.active_clients),
            users.map((u) => u.inactive_clients),
          ]}
          datasetLabels={["Active Clients", "Inactive Clients"]}
          colors={["#12B76A", "#D1FADF"]}
          stacked
        />
      </div>

      <div className="col-span-1">
        <DoughnutChart
          heading="Clients Overview"
          labels={["Active Clients", "Inactive Clients"]}
          dataValues={[totals.active_clients, totals.inactive_clients]}
          centerText={{
            label: "Total Clients",
            value: totals.total_clients,
          }}
        />
      </div>

      <DoughnutChart
        heading="Clients per Service"
        labels={services.map((s) => s.name)}
        dataValues={services.map((s) => s.clients_count)}
        colors={services.map(
          (_, i) => servicePalette[i % servicePalette.length]
        )}
        centerText={{
          label: "Total Clients",
          value: totals.total_clients,
        }}
      />

      <div className="col-span-2">
        <BarChart
          heading="Revenue per Service"
          labels={services.map((s) => s.name)}
          dataValues={services.map((s) => s.total_earned)}
          colors={services.map(
            (_, i) => servicePalette[i % servicePalette.length]
          )}
        />
      </div>
    </div>
  );
}

export default Home;
