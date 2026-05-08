"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function login(_: unknown, formData: FormData) {
  const password = formData.get("password") as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Incorrect password" };
  }
  const store = await cookies();
  store.set("admin_session", process.env.ADMIN_SESSION_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/admin/login");
}

export async function addEvent(_: unknown, formData: FormData) {
  const { error } = await supabaseAdmin.from("events").insert({
    date: formData.get("date") || "TBA",
    month: formData.get("month") || "TBA",
    name: formData.get("name"),
    venue: formData.get("venue") || "TBA",
    city: formData.get("city") || "South Africa",
    tickets: formData.get("tickets") || null,
    display_order: Date.now(),
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteEvent(id: string) {
  await supabaseAdmin.from("events").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function uploadPhoto(_: unknown, formData: FormData) {
  const file = formData.get("photo") as File;
  if (!file || file.size === 0) return { error: "No file selected" };

  const bytes = await file.arrayBuffer();
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("gallery")
    .upload(filename, Buffer.from(bytes), { contentType: file.type });

  if (uploadError) return { error: uploadError.message };

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from("gallery")
    .getPublicUrl(filename);

  await supabaseAdmin.from("gallery").insert({
    url: publicUrl,
    alt: "David Coins",
    span: "",
    display_order: Date.now(),
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deletePhoto(id: string, url: string) {
  const filename = url.split("/").at(-1);
  if (filename) await supabaseAdmin.storage.from("gallery").remove([filename]);
  await supabaseAdmin.from("gallery").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
}
