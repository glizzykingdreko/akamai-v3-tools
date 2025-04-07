"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Storage keys
const STORAGE_KEYS = {
  JSON_DATA: "encrypt_json_data",
  COOKIE_VALUE: "encrypt_cookie_value",
  SCRIPT_CONTENT: "encrypt_script_content",
  OUTPUT: "encrypt_output",
}

// API endpoint
const API_ENDPOINT = "/api/encrypt"

export default function EncryptPage() {
  const [jsonData, setJsonData] = useState("")
  const [cookieValue, setCookieValue] = useState("")
  const [scriptContent, setScriptContent] = useState("")
  const [output, setOutput] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Load saved values from localStorage on component mount
  useEffect(() => {
    const savedJsonData = localStorage.getItem(STORAGE_KEYS.JSON_DATA)
    const savedCookieValue = localStorage.getItem(STORAGE_KEYS.COOKIE_VALUE)
    const savedScriptContent = localStorage.getItem(STORAGE_KEYS.SCRIPT_CONTENT)
    const savedOutput = localStorage.getItem(STORAGE_KEYS.OUTPUT)

    if (savedJsonData) setJsonData(savedJsonData)
    if (savedCookieValue) setCookieValue(savedCookieValue)
    if (savedScriptContent) setScriptContent(savedScriptContent)
    if (savedOutput) setOutput(savedOutput)
  }, [])

  // Save values to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JSON_DATA, jsonData)
  }, [jsonData])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_VALUE, cookieValue)
  }, [cookieValue])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCRIPT_CONTENT, scriptContent)
  }, [scriptContent])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OUTPUT, output)
  }, [output])

  const handleEncrypt = async () => {
    if (!jsonData || !scriptContent) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      // Validate JSON input
      JSON.parse(jsonData)

      setIsLoading(true)
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json_data: jsonData,
          script_content: scriptContent,
          ...(cookieValue ? { cookie: cookieValue } : {}),
        }),
      })

      const result = await response.json()

      if (result.success) {
        setOutput(result.data.output)
        toast({
          title: "Encryption complete",
          description: "The JSON has been successfully encrypted.",
        })
      } else {
        toast({
          title: "Encryption failed",
          description: result.message || "There was an error encrypting the JSON.",
          variant: "destructive",
        })
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        toast({
          title: "Invalid JSON",
          description: "Please check that your JSON is valid.",
          variant: "destructive",
        })
      } else {
        console.error("Encryption error:", error)
        toast({
          title: "Encryption failed",
          description: "There was an error connecting to the server.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setJsonData("")
    setCookieValue("")
    setScriptContent("")
    setOutput("")

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.JSON_DATA)
    localStorage.removeItem(STORAGE_KEYS.COOKIE_VALUE)
    localStorage.removeItem(STORAGE_KEYS.SCRIPT_CONTENT)
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
        description: "The encrypted data has been copied to your clipboard.",
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
        <h1 className="text-2xl font-bold">Encrypt Payload</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        {/* Column 1 - Inputs (30% width) */}
        <div className="space-y-4 lg:col-span-3">
          <div>
            <Label htmlFor="json-data">JSON Data</Label>
            <Textarea
              id="json-data"
              placeholder="Paste JSON data to encrypt here..."
              className="min-h-[100px]"
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="cookie-value">Cookie Hash/Value</Label>
            <Input
              id="cookie-value"
              placeholder="Enter cookie hash/value..."
              value={cookieValue}
              onChange={(e) => setCookieValue(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="script-content">Script Content</Label>
            <Textarea
              id="script-content"
              placeholder="Paste script content here..."
              className="min-h-[100px]"
              value={scriptContent}
              onChange={(e) => setScriptContent(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleEncrypt} className="flex-1" disabled={isLoading}>
              {isLoading ? "Processing..." : "Encrypt"}
            </Button>
            <Button variant="outline" onClick={handleClear} className="flex-1" disabled={isLoading}>
              Clear
            </Button>
          </div>
        </div>

        {/* Column 2 - Output (70% width) */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-2">
            <Label>Encryption Output</Label>
            {output && (
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            )}
          </div>
          <Card className="overflow-hidden">
            <pre className="p-4 overflow-auto bg-muted/50 rounded-md min-h-[400px] max-h-[600px]">
              {output ? (
                <code className="text-sm break-all whitespace-pre-wrap">{output}</code>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Encrypted output will appear here
                </div>
              )}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  )
}

