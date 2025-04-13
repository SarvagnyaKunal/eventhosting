import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileDown } from "lucide-react"
import Link from "next/link"

export default function BrochuresPage() {
  // In a real app, this would come from an API or database
  const brochures = [
    {
      id: "1",
      title: "TechFest 2024 Main Brochure",
      description: "Complete guide to all events, schedules, and venues.",
      fileSize: "2.4 MB",
      fileType: "PDF",
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "Hackathon Guide",
      description: "Detailed information about the hackathon, rules, and judging criteria.",
      fileSize: "1.8 MB",
      fileType: "PDF",
      downloadUrl: "#",
    },
    {
      id: "3",
      title: "Workshop Schedule",
      description: "Complete schedule of all workshops with timings and prerequisites.",
      fileSize: "1.2 MB",
      fileType: "PDF",
      downloadUrl: "#",
    },
    {
      id: "4",
      title: "Campus Map",
      description: "Map of the campus with event locations marked.",
      fileSize: "3.5 MB",
      fileType: "PDF",
      downloadUrl: "#",
    },
    {
      id: "5",
      title: "Sponsorship Deck",
      description: "Information for potential sponsors and partners.",
      fileSize: "4.2 MB",
      fileType: "PDF",
      downloadUrl: "#",
    },
    {
      id: "6",
      title: "Accommodation Guide",
      description: "Information about accommodation options near the venue.",
      fileSize: "1.5 MB",
      fileType: "PDF",
      downloadUrl: "#",
    },
  ]

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Brochures & Resources</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Download brochures and resources for TechFest 2024.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brochures.map((brochure) => (
          <Card key={brochure.id}>
            <CardHeader>
              <CardTitle>{brochure.title}</CardTitle>
              <CardDescription>{brochure.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p>File Size: {brochure.fileSize}</p>
                <p>Format: {brochure.fileType}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={brochure.downloadUrl} className="w-full">
                <Button className="w-full">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
