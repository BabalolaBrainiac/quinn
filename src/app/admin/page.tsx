import { mockBookings, mockCustomRequests } from "@/lib/data";
import { formatNaira, formatShortDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    label: "Total Bookings",
    value: mockBookings.length,
    sub: `${mockBookings.filter((b) => b.status === "confirmed").length} confirmed`,
  },
  {
    label: "Pending Quotes",
    value: mockCustomRequests.filter((r) => r.status === "pending").length,
    sub: "Awaiting your review",
  },
  {
    label: "Revenue (confirmed)",
    value: formatNaira(
      mockBookings
        .filter((b) => b.status === "confirmed")
        .reduce((s, b) => s + b.amount, 0)
    ),
    sub: "Paid & confirmed",
  },
  {
    label: "Custom Requests",
    value: mockCustomRequests.length,
    sub: `${mockCustomRequests.filter((r) => r.status === "quoted").length} quoted`,
  },
];

const statusVariant: Record<string, "success" | "warning" | "error" | "muted"> = {
  confirmed: "success",
  pending: "warning",
  completed: "muted",
  cancelled: "error",
};

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-light text-[#f0ece4]">Dashboard</h1>
        <p className="text-sm text-[#666666] mt-1">Quinn&apos;s Artistry — Admin Overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111111] border border-[#1c1c1c] p-5"
          >
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#666666] mb-2">
              {stat.label}
            </p>
            <p className="font-display text-3xl font-light text-[#f0ece4] mb-1">
              {stat.value}
            </p>
            <p className="text-[11px] text-[#444444]">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="mb-8">
        <h2 className="text-xs tracking-[0.2em] uppercase text-[#888888] mb-4">
          Recent Bookings
        </h2>
        <div className="border border-[#1c1c1c] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1c1c1c]">
                {["Client", "Design", "Service", "Date", "Amount", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase text-[#444444] font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-[#1c1c1c] last:border-0 hover:bg-[#0e0e0e] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="text-[#f0ece4] text-sm">{booking.clientName}</div>
                    <div className="text-[10px] text-[#666666]">{booking.clientEmail}</div>
                  </td>
                  <td className="px-4 py-3 text-[#888888] text-xs">{booking.designTitle}</td>
                  <td className="px-4 py-3">
                    <Badge variant={booking.serviceType === "home" ? "gold" : "muted"}>
                      {booking.serviceType}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[#888888] text-xs">
                    {formatShortDate(booking.date)} · {booking.time}
                  </td>
                  <td className="px-4 py-3 text-[#c4a35a] text-sm">
                    {formatNaira(booking.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[booking.status] ?? "muted"}>
                      {booking.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending custom requests */}
      <div>
        <h2 className="text-xs tracking-[0.2em] uppercase text-[#888888] mb-4">
          Pending Custom Requests
        </h2>
        <div className="border border-[#1c1c1c] overflow-hidden">
          {mockCustomRequests.filter((r) => r.status === "pending").length === 0 ? (
            <p className="px-4 py-6 text-sm text-[#444444]">No pending requests.</p>
          ) : (
            mockCustomRequests
              .filter((r) => r.status === "pending")
              .map((req) => (
                <div
                  key={req.id}
                  className="border-b border-[#1c1c1c] last:border-0 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#f0ece4]">{req.clientName}</p>
                      <p className="text-[11px] text-[#666666] mt-0.5">
                        {req.placement} · {req.size} · {req.colorPreference}
                      </p>
                      <p className="text-xs text-[#888888] mt-2 max-w-md leading-relaxed line-clamp-2">
                        {req.description}
                      </p>
                    </div>
                    <Badge variant="warning">{req.status}</Badge>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
