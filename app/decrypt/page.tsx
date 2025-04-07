"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Storage keys
const STORAGE_KEYS = {
  SENSOR_DATA: "decrypt_sensor_data",
  SCRIPT_CONTENT: "decrypt_script_content",
  OUTPUT: "decrypt_output",
}

// API endpoint
const API_ENDPOINT = "/api/decrypt"

// Function to format JSON with syntax highlighting
const formatJSON = (json: string) => {
  try {
    const parsed = JSON.parse(json)
    const formatted = JSON.stringify(parsed, null, 2)
    
    // Apply syntax highlighting to the content
    const highlightedContent = formatted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'text-foreground'
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-primary' // Keys
          } else {
            cls = 'text-green-600 dark:text-green-400' // String values
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-orange-600 dark:text-orange-400' // Booleans
        } else if (/null/.test(match)) {
          cls = 'text-muted-foreground' // Null values
        } else if (/^-?\d+$/.test(match)) {
          cls = 'text-blue-600 dark:text-blue-400' // Numbers
        }
        return `<span class="${cls}">${match}</span>`
      })
    
    return highlightedContent
  } catch (e) {
    return json
  }
}

export default function DecryptPage() {
  const [sensorData, setSensorData] = useState("")
  const [scriptContent, setScriptContent] = useState("")
  const [output, setOutput] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Load saved values from localStorage on component mount
  useEffect(() => {
    const savedSensorData = localStorage.getItem(STORAGE_KEYS.SENSOR_DATA)
    const savedScriptContent = localStorage.getItem(STORAGE_KEYS.SCRIPT_CONTENT)
    const savedOutput = localStorage.getItem(STORAGE_KEYS.OUTPUT)

    if (savedSensorData) setSensorData(savedSensorData)
    if (savedScriptContent) setScriptContent(savedScriptContent)
    if (savedOutput) setOutput(savedOutput)
  }, [])

  // Save values to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SENSOR_DATA, sensorData)
  }, [sensorData])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCRIPT_CONTENT, scriptContent)
  }, [scriptContent])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OUTPUT, output)
  }, [output])

  const handleDecrypt = async () => {
    if (!sensorData || !scriptContent) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sensor_data: sensorData,
          script_content: scriptContent,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setOutput(result.data.output)
        setScriptContent(result.data.script)
        toast({
          title: "Decryption complete",
          description: "The payload has been successfully decrypted.",
        })
      } else {
        toast({
          title: "Decryption failed",
          description: result.message || "There was an error decrypting the payload.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Decryption error:", error)
      toast({
        title: "Decryption failed",
        description: "There was an error connecting to the server.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setSensorData("")
    setScriptContent("")
    setOutput("")

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.SENSOR_DATA)
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
        description: "The decrypted data has been copied to your clipboard.",
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
        <h1 className="text-2xl font-bold">Decrypt Payload</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        {/* Column 1 - Inputs (30% width) */}
        <div className="space-y-4 lg:col-span-3">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sensor Data
            </label>
            <Textarea
              placeholder="Paste encrypted sensor data here..."
              className="min-h-[100px]"
              value={sensorData}
              onChange={(e) => setSensorData(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Script Content
            </label>
            <Textarea
              placeholder="Paste script content here..."
              className="min-h-[100px]"
              value={scriptContent}
              onChange={(e) => setScriptContent(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDecrypt} className="flex-1" disabled={isLoading}>
              {isLoading ? "Processing..." : "Decrypt"}
            </Button>
            <Button variant="outline" onClick={handleClear} className="flex-1" disabled={isLoading}>
              Clear
            </Button>
          </div>
        </div>

        {/* Column 2 - Output (70% width) */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Decrypted Output
            </label>
            {output && (
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            )}
          </div>
          <Card className="overflow-hidden">
            <pre className="p-4 overflow-auto bg-muted/50 rounded-md min-h-[400px] max-h-[600px] font-mono text-sm">
              {output ? (
                <div className="whitespace-pre" dangerouslySetInnerHTML={{ __html: formatJSON(output) }} />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Decrypted output will appear here
                </div>
              )}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  )
}

