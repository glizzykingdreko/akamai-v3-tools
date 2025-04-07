"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Storage keys
const STORAGE_KEYS = {
  COOKIE_STRING: "extract_cookie_string",
  OUTPUT: "extract_output",
}

// API endpoint
const API_ENDPOINT = "/api/extract"

export default function ExtractPage() {
  const [cookieString, setCookieString] = useState("")
  const [output, setOutput] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Load saved values from localStorage on component mount
  useEffect(() => {
    const savedCookieString = localStorage.getItem(STORAGE_KEYS.COOKIE_STRING)
    const savedOutput = localStorage.getItem(STORAGE_KEYS.OUTPUT)

    if (savedCookieString) setCookieString(savedCookieString)
    if (savedOutput) setOutput(savedOutput)
  }, [])

  // Save values to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_STRING, cookieString)
  }, [cookieString])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OUTPUT, output)
  }, [output])

  const handleExtract = async () => {
    if (!cookieString) {
      toast({
        title: "Missing cookie string",
        description: "Please enter a cookie string.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cookie: cookieString,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setOutput(result.value)
        toast({
          title: "Extraction complete",
          description: "The bm_sz hash has been successfully extracted.",
        })
      } else {
        toast({
          title: "Extraction failed",
          description: result.message || "Could not extract bm_sz hash from the cookie string.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Extraction error:", error)
      toast({
        title: "Extraction failed",
        description: "There was an error connecting to the server.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setCookieString("")
    setOutput("")

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.COOKIE_STRING)
    localStorage.removeItem(STORAGE_KEYS.OUTPUT)

    toast({
      title: "Cleared",
      description: "All fields have been cleared.",
    })
  }

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output)
      toast({
        title: "Copied to clipboard",
        description: "The bm_sz hash has been copied to your clipboard.",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Extract bm_sz Hash</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <Label htmlFor="cookie-string">Cookie String</Label>
          <Textarea
            id="cookie-string"
            placeholder="Paste cookie string here..."
            className="min-h-[100px]"
            value={cookieString}
            onChange={(e) => setCookieString(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleExtract} className="flex-1" disabled={isLoading}>
            {isLoading ? "Processing..." : "Extract Hash"}
          </Button>
          <Button variant="outline" onClick={handleClear} className="flex-1" disabled={isLoading}>
            Clear
          </Button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Extracted bm_sz Hash</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            )}
          </div>
          <Card className="overflow-hidden">
            <pre className="p-4 overflow-auto bg-muted/50 rounded-md min-h-[100px]">
              {output ? (
                <code className="text-sm break-all whitespace-pre-wrap">{output}</code>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Extracted hash will appear here
                </div>
              )}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  )
}

