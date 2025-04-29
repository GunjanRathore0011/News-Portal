import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FakeNews() {
  const [newsText, setNewsText] = useState("");
  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    setError("");
    setVerdict(null);

    try {
      const response = await fetch("/api/fakeNewsCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newsContent: newsText }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while checking the news.");
      }

      const result = await response.json();
      setVerdict({ label: result.verdict, score: result.confidence });
    } catch (err) {
      setError("Failed to detect news authenticity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">🕵️ Fake News Checker</h2>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Textarea
            placeholder="Paste your news article here..."
            className="h-40 resize-none"
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
          />
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleCheck}
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              {loading ? "Checking..." : "Check Authenticity"}
            </Button>
          </div>
        </div>

        {/* Result Section */}
        {verdict && (
          <div className="mt-10 grid gap-6">
            <Card className="border-l-4 border-blue-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">🔍 Verdict</h3>
                <p className={`text-xl font-bold ${verdict.label === "Real News ✅" ? "text-green-600" : "text-red-600"}`}>
                  {verdict.label}
                </p>
                <p className="text-gray-600 mt-2">
                  Confidence Score: {parseFloat(verdict.score).toFixed(2)}%
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error Section */}
        {error && (
          <div className="mt-6 text-center text-red-500 font-semibold">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
