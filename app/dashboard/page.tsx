"use client"

import { useState, useEffect, useCallback } from "react"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Sparkles, History, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type HistoryItem = {
  id: string
  brief: string
  result_markdown: string
  model: string
  created_at: string
}

export default function DashboardPage() {
  const [brief, setBrief] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveWarning, setSaveWarning] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [historyLoading, setHistoryLoading] = useState(true)
  const [historyError, setHistoryError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [mainTab, setMainTab] = useState("generator")

  const loadHistory = useCallback(async () => {
    setHistoryError(null)
    setHistoryLoading(true)
    try {
      const res = await fetch("/api/campaigns/history")
      const data = (await res.json()) as {
        items?: HistoryItem[]
        error?: string
      }
      if (!res.ok) {
        setHistoryError(data.error ?? "Could not load history.")
        setHistory([])
        return
      }
      setHistory(data.items ?? [])
    } catch {
      setHistoryError("Network error loading history.")
      setHistory([])
    } finally {
      setHistoryLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadHistory()
  }, [loadHistory])

  async function generate() {
    setError(null)
    setSaveWarning(null)
    setLoading(true)
    setResult(null)
    setSelectedId(null)
    try {
      const res = await fetch("/api/campaigns/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      })
      const data = (await res.json()) as {
        markdown?: string
        error?: string
        saved?: boolean
        saveError?: string
        id?: string
      }
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.")
        return
      }
      setResult(data.markdown ?? "")
      if (data.saved === false && data.saveError) {
        setSaveWarning(data.saveError)
      } else {
        void loadHistory()
        if (data.id) setSelectedId(data.id)
      }
    } catch {
      setError("Network error. Check your connection.")
    } finally {
      setLoading(false)
    }
  }

  function openHistoryItem(item: HistoryItem) {
    setSelectedId(item.id)
    setResult(item.result_markdown)
    setBrief(item.brief)
    setSaveWarning(null)
    setMainTab("generator")
  }

  async function removeHistoryItem(id: string) {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/campaigns/history?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      })
      if (!res.ok) return
      setHistory((h) => h.filter((x) => x.id !== id))
      if (selectedId === id) {
        setSelectedId(null)
        setResult(null)
      }
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#ecedee]">
          Tools
        </h1>
        <p className="text-[#9ba1a6] mt-1 text-sm">
          Campaign generator 
        </p>
      </div>

      <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
        <TabsList className="bg-[#1c1c1c] border border-[#2e2e2e] p-1 h-auto flex-wrap gap-1">
          <TabsTrigger
            value="generator"
            className="data-[state=active]:bg-brand data-[state=active]:text-white text-[#9ba1a6]"
          >
            Campaign generator
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-brand data-[state=active]:text-white text-[#9ba1a6]"
          >
            History
          </TabsTrigger>
          <TabsTrigger
            value="how"
            className="data-[state=active]:bg-brand data-[state=active]:text-white text-[#9ba1a6]"
          >
            How it works
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="mt-6 space-y-6">
          <Card className="border-[#2b2f31] bg-[#1a1d1e]/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#ecedee] text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand" />
                Your brief
              </CardTitle>
              <CardDescription className="text-[#9ba1a6]">
                Problem statements, campaign objectives, audience, constraints, or wild ideas — the
                more context, the sharper the three options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g. Launch a regional coffee brand aimed at night-shift workers. We need earned attention, not discounting. Tone: honest, gritty, warm…"
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="min-h-[200px] border-[#2b2f31] bg-[#151718] text-[#ecedee] placeholder:text-[#6b7280]"
              />
              <Button
                type="button"
                onClick={() => void generate()}
                disabled={loading || brief.trim().length < 20}
                className="bg-brand hover:opacity-90 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  "Generate 3 campaign options"
                )}
              </Button>
              {error ? (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}
              {saveWarning ? (
                <p className="text-sm text-amber-400" role="status">
                  {saveWarning}
                </p>
              ) : null}
            </CardContent>
          </Card>

          {result ? (
            <Card className="border-[#2b2f31] bg-[#1a1d1e]/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#ecedee] text-lg">Output</CardTitle>
                <CardDescription className="text-[#9ba1a6]">
                  Reference campaigns, SCAMPER synthesis, and three full campaign routes.
                  {selectedId ? " (from history)" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[min(70vh,720px)] rounded-md border border-[#2b2f31] bg-[#151718]">
                  <pre className="p-4 text-sm text-[#d1d5db] whitespace-pre-wrap font-sans leading-relaxed">
                    {result}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="border-[#2b2f31] bg-[#1a1d1e]/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#ecedee] text-lg flex items-center gap-2">
                <History className="h-5 w-5 text-brand" />
                Saved generations
              </CardTitle>
              <CardDescription className="text-[#9ba1a6]">
                Every run is stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void loadHistory()}
                  disabled={historyLoading}
                  className="border-[#2b2f31] text-[#ecedee] hover:bg-[#232323]"
                >
                  Refresh
                </Button>
              </div>
              {historyError ? (
                <p className="text-sm text-red-400">{historyError}</p>
              ) : null}
              {historyLoading ? (
                <p className="text-sm text-[#9ba1a6]">Loading…</p>
              ) : history.length === 0 ? (
                <p className="text-sm text-[#9ba1a6]">
                  No saved runs yet. Generate a campaign on the first tab — it will appear here.
                </p>
              ) : (
                <ScrollArea className="h-[min(60vh,480px)] rounded-md border border-[#2b2f31]">
                  <ul className="divide-y divide-[#2b2f31]">
                    {history.map((item) => (
                      <li
                        key={item.id}
                        className={cn(
                          "flex items-stretch border-b border-[#2b2f31] last:border-b-0",
                          selectedId === item.id && "bg-[#202425]/50"
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => openHistoryItem(item)}
                          className="flex-1 min-w-0 text-left px-4 py-3 hover:bg-[#202425] transition-colors"
                        >
                          <p className="text-xs text-[#6b7280] tabular-nums">
                            {format(new Date(item.created_at), "MMM d, yyyy · HH:mm")}
                          </p>
                          <p className="text-sm text-[#ecedee] line-clamp-2 mt-1">{item.brief}</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => void removeHistoryItem(item.id)}
                          disabled={deletingId === item.id}
                          className="shrink-0 px-3 self-stretch flex items-center text-[#6b7280] hover:text-red-400 hover:bg-[#2b2f31] disabled:opacity-50"
                          aria-label="Delete this run"
                        >
                          {deletingId === item.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="how" className="mt-6">
          <Card className="border-[#2b2f31] bg-[#1a1d1e]/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#ecedee] text-lg">How it works</CardTitle>
              <CardDescription className="text-[#9ba1a6]">
                End-to-end flow from your brief to structured concepts.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[#c4c9cc] text-sm space-y-4 leading-relaxed">
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  <strong className="text-[#ecedee]">Sign in</strong> — The header login opens a
                  secure session (Supabase Auth). Only signed-in users can reach this dashboard and
                  call the generator API.
                </li>
                <li>
                  <strong className="text-[#ecedee]">Write the brief</strong> — Include the problem,
                  objectives, audience, tone, channels, and any references. The model uses this as
                  the single source of truth.
                </li>
                <li>
                  <strong className="text-[#ecedee]">Benchmark lens</strong> — DeepSeek considers
                  roughly ten well-known campaigns that share relevant DNA with your brief, to
                  avoid generic territory.
                </li>
                <li>
                  <strong className="text-[#ecedee]">SCAMPER pass</strong> — Substitute, Combine,
                  Adapt, Modify, Put to other uses, Eliminate, Reverse — used to force differentiated
                  angles before drafting.
                </li>
                <li>
                  <strong className="text-[#ecedee]">Three options</strong> — Each option mirrors your
                  portfolio campaign structure: narrative hook, pillars, theme, mantra, phased
                  assets with sample copy, and CTAs — ready to stress-test or hand to design.
                </li>
                <li>
                  <strong className="text-[#ecedee]">History</strong> — Each completed generation is
                  saved to your Supabase project (table{" "}
                  <code className="text-[#c4c9cc]">campaign_generations</code>). Open the History tab
                  to reload or delete past runs.
                </li>
              </ol>
              <p className="text-[#9ba1a6] pt-2 border-t border-[#2b2f31]">
                Tip: Regenerate with tighter objectives or channel constraints if you want more
                channel-specific craft (e.g. OOH-only, launch week timeline).
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
