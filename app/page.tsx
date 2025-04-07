import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-between p-4">
      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <h1 className="mb-2 text-3xl font-bold">Akamai v3 Tools</h1>
        <p className="mb-4 text-muted-foreground">
          Online tools for working with Akamai v3 sensor data
        </p>
        <p className="mb-4 text-muted-foreground">
          encryption, decryption, and hash extraction
        </p>
        <p className="mb-8 text-muted-foreground">
          <a 
            href="https://medium.com/@glizzykingdreko/akamai-v3-sensor-data-deep-dive-into-encryption-decryption-and-bypass-tools-da0adad2a784" 
            className="hover:underline text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about Akamai bot detection
          </a>
        </p>
        <div className="grid w-full max-w-4xl gap-6 md:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Decrypt Payload</CardTitle>
              <CardDescription>Decrypt sensor data with script content</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                Convert encrypted sensor data back to readable JSON format. Useful for security research and debugging.
              </p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/decrypt" className="w-full">
                <Button className="w-full">Open Tool</Button>
              </Link>
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Encrypt Payload</CardTitle>
              <CardDescription>Encrypt JSON data with script content and optional cookie hash</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                Convert JSON data into encrypted format for Akamai v3 sensor data. Perfect for testing and development.
              </p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/encrypt" className="w-full">
                <Button className="w-full">Open Tool</Button>
              </Link>
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Extract Cookie Hash</CardTitle>
              <CardDescription>Extract hash from cookie bm_sz's string</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                Parse cookie string and extract the bm_sz hash value. Essential for working with Akamai's bot detection.
              </p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/extract" className="w-full">
                <Button className="w-full">Open Tool</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      <footer className="w-full max-w-4xl mt-12 py-6 border-t flex flex-col items-center justify-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2 mb-2">
          <Github size={16} />
          <span>
            Open Source Project by{" "}
            <a
              href="https://github.com/glizzykingdreko/"
              className="font-medium hover:underline text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GlizzyKingDreko
            </a>
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a
            href="https://github.com/glizzykingdreko/akamai-v3-sensor-data-helper"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NPM Module
          </a>
          <a
            href="https://github.com/glizzykingdreko/akamai-v3-tools"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </a>
        </div>
      </footer>
    </main>
  )
}

