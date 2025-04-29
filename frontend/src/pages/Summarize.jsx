import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function Summarize() {
  const [newsText, setNewsText] = useState("");
  const [summary, setSummary] = useState("");
  const [factCheck, setFactCheck] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze =async () => {
    setLoading(true);

    // Mocked Response after 2 seconds (you'll later replace it with real API call)
    setTimeout(async () => {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newsContent: newsText }),
      });

      const data = await res.json();

      setSummary(data.summary || "This is a short summary of the news you entered. (Generated content here...)");
      setFactCheck(data.factCheck || "News appears authentic ✅");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
     
      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">News Summarizer </h2>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Textarea
            placeholder="Paste your news article here..."
            className="h-40 resize-none"
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
          />
          <div className="flex justify-center mt-4">
            <Button onClick={handleAnalyze} disabled={loading} className="bg-yellow-400 hover:bg-yellow-500 text-black">
              {loading ? "Analyzing..." : "Analyze News"}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {summary && (
          <div className="mt-10 grid gap-6">
            <Card className="border-l-4 border-blue-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">📝 Summarized News</h3>
                <p className="text-gray-700">{summary}</p>
              </CardContent>
            </Card>

            
          </div>
        )}
      </main>

      
    </div>
  );
}

