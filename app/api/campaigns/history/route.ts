import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("campaign_generations")
    .select("id, brief, result_markdown, model, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(100)

  if (error) {
    console.error("campaign_generations select:", error)
    return NextResponse.json(
      { error: "Could not load history. Ensure the database migration has been applied." },
      { status: 500 }
    )
  }

  return NextResponse.json({ items: data ?? [] })
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")?.trim() ?? ""
  if (!id || !UUID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  const { error } = await supabase
    .from("campaign_generations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    console.error("campaign_generations delete:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
