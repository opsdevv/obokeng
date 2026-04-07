import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { CAMPAIGN_STYLE_REFERENCE } from "@/lib/campaign-style-reference"

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions"

const SYSTEM_PROMPT = `You are a senior creative strategist. You produce original marketing campaign concepts that feel fresh, specific, and executable—not generic.

WORKFLOW (follow in order):
1) Briefly absorb the user's problem statement, objectives, and any guidance.
2) Internally consider 10 well-known or benchmark marketing campaigns from history or recent years that share relevant DNA (audience, category, tone, or mechanic). You do not need to cite URLs; name the campaign/brand and one line on why it is relevant.
3) Apply the SCAMPER lens (Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse) to stress-test angles and unlock differentiated ideas—not as a table dump, but as concise creative reasoning that informs the three options.
4) Produce exactly THREE distinct campaign options. Each must be a full campaign in the structural style described in STYLE_REFERENCE: narrative opening, pillars, theme, mantra, phased plan with goals/copy approach/sample lines, and CTAs. Options should diverge meaningfully (e.g. one challenger/earned, one community ritual, one proof/product truth).

Output format: valid Markdown only. Use this structure for the full response:

## Reference campaigns (10)
Short numbered list: name — one-line relevance each.

## SCAMPER synthesis
One tight section (roughly 150–250 words) showing how SCAMPER opened the three directions.

## Option 1: [Campaign title]
(full campaign in STYLE_REFERENCE structure)

---

## Option 2: [Campaign title]
(full campaign in STYLE_REFERENCE structure)

---

## Option 3: [Campaign title]
(full campaign in STYLE_REFERENCE structure)

STYLE_REFERENCE:
${CAMPAIGN_STYLE_REFERENCE}
`

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const key = process.env.DEEPSEEK_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: "Server missing DEEPSEEK_API_KEY" },
      { status: 500 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const brief =
    typeof body === "object" &&
    body !== null &&
    "brief" in body &&
    typeof (body as { brief: unknown }).brief === "string"
      ? (body as { brief: string }).brief.trim()
      : ""

  if (!brief || brief.length < 20) {
    return NextResponse.json(
      { error: "Add a brief of at least 20 characters (problem, objectives, ideas)." },
      { status: 400 }
    )
  }

  if (brief.length > 12000) {
    return NextResponse.json({ error: "Brief is too long." }, { status: 400 })
  }

  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `User brief:\n\n${brief}`,
        },
      ],
      temperature: 0.85,
      max_tokens: 8192,
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error("DeepSeek error:", res.status, errText)
    return NextResponse.json(
      { error: "Generation failed. Try again shortly." },
      { status: 502 }
    )
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const text = data.choices?.[0]?.message?.content?.trim()
  if (!text) {
    return NextResponse.json(
      { error: "Empty response from model." },
      { status: 502 }
    )
  }

  const { data: row, error: insertError } = await supabase
    .from("campaign_generations")
    .insert({
      user_id: user.id,
      brief,
      result_markdown: text,
      model: "deepseek-chat",
    })
    .select("id, created_at")
    .single()

  if (insertError) {
    console.error("campaign_generations insert:", insertError)
    return NextResponse.json({
      markdown: text,
      saved: false,
      saveError:
        "Generation succeeded but was not saved. Apply the Supabase migration for campaign_generations.",
    })
  }

  return NextResponse.json({
    markdown: text,
    saved: true,
    id: row.id,
    createdAt: row.created_at,
  })
}
