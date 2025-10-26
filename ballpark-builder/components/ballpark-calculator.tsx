"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calculator, DollarSign, Package, Users } from "lucide-react"

// Pricing database
const eventPricing = {
  corporate: {
    name: "Corporate Event",
    basePrice: 5000,
    perPersonCost: 75,
    setupFee: 1500,
  },
  wedding: {
    name: "Wedding",
    basePrice: 8000,
    perPersonCost: 120,
    setupFee: 2000,
  },
  conference: {
    name: "Conference",
    basePrice: 15000,
    perPersonCost: 50,
    setupFee: 3000,
  },
  festival: {
    name: "Festival",
    basePrice: 25000,
    perPersonCost: 30,
    setupFee: 5000,
  },
  private: {
    name: "Private Party",
    basePrice: 3000,
    perPersonCost: 90,
    setupFee: 800,
  },
}

const retailPricing = {
  kiosk: {
    name: "Retail Kiosk",
    basePrice: 12000,
    perSqFtCost: 150,
    customizationFee: 2500,
  },
  popup: {
    name: "Pop-up Store",
    basePrice: 8000,
    perSqFtCost: 100,
    customizationFee: 1500,
  },
  boutique: {
    name: "Boutique Build-out",
    basePrice: 35000,
    perSqFtCost: 200,
    customizationFee: 5000,
  },
  display: {
    name: "Display Unit",
    basePrice: 5000,
    perSqFtCost: 120,
    customizationFee: 1000,
  },
  fullStore: {
    name: "Full Store Build",
    basePrice: 75000,
    perSqFtCost: 250,
    customizationFee: 10000,
  },
}

type EventType = keyof typeof eventPricing
type RetailType = keyof typeof retailPricing

export function BallparkCalculator() {
  const [activeTab, setActiveTab] = useState<"event" | "retail">("event")

  // Event state
  const [eventType, setEventType] = useState<EventType>("corporate")
  const [attendees, setAttendees] = useState<string>("")
  const [eventDuration, setEventDuration] = useState<string>("1")

  // Retail state
  const [retailType, setRetailType] = useState<RetailType>("kiosk")
  const [squareFeet, setSquareFeet] = useState<string>("")
  const [customization, setCustomization] = useState<"basic" | "standard" | "premium">("standard")

  // Results
  const [estimate, setEstimate] = useState<number | null>(null)
  const [breakdown, setBreakdown] = useState<{ label: string; amount: number }[]>([])

  const calculateEventEstimate = () => {
    const pricing = eventPricing[eventType]
    const attendeeCount = Number.parseInt(attendees) || 0
    const days = Number.parseInt(eventDuration) || 1

    const base = pricing.basePrice * days
    const perPerson = pricing.perPersonCost * attendeeCount
    const setup = pricing.setupFee

    const total = base + perPerson + setup

    setBreakdown([
      { label: "Base Price", amount: base },
      { label: `Per Person (${attendeeCount} attendees)`, amount: perPerson },
      { label: "Setup Fee", amount: setup },
    ])

    setEstimate(total)
  }

  const calculateRetailEstimate = () => {
    const pricing = retailPricing[retailType]
    const sqFt = Number.parseInt(squareFeet) || 0

    const customizationMultiplier = {
      basic: 0.5,
      standard: 1,
      premium: 1.8,
    }

    const base = pricing.basePrice
    const perSqFt = pricing.perSqFtCost * sqFt
    const customFee = pricing.customizationFee * customizationMultiplier[customization]

    const total = base + perSqFt + customFee

    setBreakdown([
      { label: "Base Price", amount: base },
      { label: `Per Sq Ft (${sqFt} sq ft)`, amount: perSqFt },
      { label: `Customization (${customization})`, amount: customFee },
    ])

    setEstimate(total)
  }

  const handleCalculate = () => {
    if (activeTab === "event") {
      calculateEventEstimate()
    } else {
      calculateRetailEstimate()
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            Project Details
          </CardTitle>
          <CardDescription>Enter your project requirements to get a ballpark estimate</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "event" | "retail")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="event" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Event
              </TabsTrigger>
              <TabsTrigger value="retail" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Retail Build
              </TabsTrigger>
            </TabsList>

            <TabsContent value="event" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select value={eventType} onValueChange={(v) => setEventType(v as EventType)}>
                  <SelectTrigger id="event-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(eventPricing).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendees">Number of Attendees</Label>
                <Input
                  id="attendees"
                  type="number"
                  placeholder="e.g., 100"
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Event Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 1"
                  value={eventDuration}
                  onChange={(e) => setEventDuration(e.target.value)}
                  min="1"
                />
              </div>
            </TabsContent>

            <TabsContent value="retail" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="retail-type">Build Type</Label>
                <Select value={retailType} onValueChange={(v) => setRetailType(v as RetailType)}>
                  <SelectTrigger id="retail-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(retailPricing).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="square-feet">Square Footage</Label>
                <Input
                  id="square-feet"
                  type="number"
                  placeholder="e.g., 500"
                  value={squareFeet}
                  onChange={(e) => setSquareFeet(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customization">Customization Level</Label>
                <Select value={customization} onValueChange={(v) => setCustomization(v as any)}>
                  <SelectTrigger id="customization">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={handleCalculate} className="w-full mt-6" size="lg">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Estimate
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Ballpark Estimate
          </CardTitle>
          <CardDescription>Your estimated project cost breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          {estimate === null ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-slate-100 p-6 mb-4">
                <Calculator className="h-12 w-12 text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm">
                Fill in the project details and click Calculate to see your estimate
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                <p className="text-sm font-medium text-blue-900 mb-2">Total Estimate</p>
                <p className="text-4xl font-bold text-blue-600">{formatCurrency(estimate)}</p>
                <Badge variant="secondary" className="mt-3">
                  Ballpark Range: {formatCurrency(estimate * 0.85)} - {formatCurrency(estimate * 1.15)}
                </Badge>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-700 mb-3">Cost Breakdown</p>
                {breakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0"
                  >
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Note:</strong> This is a ballpark estimate. Final pricing may vary based on specific
                  requirements, location, and current market conditions.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
