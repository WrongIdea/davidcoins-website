import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const [{ data: events }, { data: photos }] = await Promise.all([
    supabaseAdmin.from("events").select("*").order("display_order", { ascending: true }),
    supabaseAdmin.from("gallery").select("*").order("display_order", { ascending: true }),
  ]);

  return <AdminDashboard events={events ?? []} photos={photos ?? []} />;
}
