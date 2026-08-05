"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [service, setService] = useState<string>("")

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
  ]

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">

        {/* LEFT: CALENDAR */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* RIGHT: BOOKING FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Book Appointment</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* SERVICE */}
            <div>
              <p className="mb-2 text-sm font-medium">Service</p>
              <Select onValueChange={setService}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="haircut">Haircut</SelectItem>
                  <SelectItem value="beard">Beard Trim</SelectItem>
                  <SelectItem value="full">Full Grooming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* TIME SLOTS */}
            <div>
              <p className="mb-2 text-sm font-medium">Available Times</p>

              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {/* USER INFO */}
            <div className="space-y-3">
              <div>
                <p className="mb-1 text-sm font-medium">Name</p>
                <Input placeholder="Your name" />
              </div>

              <div>
                <p className="mb-1 text-sm font-medium">Email</p>
                <Input type="email" placeholder="you@example.com" />
              </div>
            </div>

            {/* SUMMARY */}
            <div className="text-sm text-muted-foreground">
              {date && selectedTime && service && (
                <p>
                  Booking for{" "}
                  <strong>{service}</strong> on{" "}
                  <strong>{format(date, "PPP")}</strong> at{" "}
                  <strong>{selectedTime}</strong>
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <Button className="w-full">
              Confirm Booking
            </Button>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}