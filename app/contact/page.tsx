'use client'

import { useState } from 'react'
import { LandingNavbar } from "@/components/landing/navbar"
import { Footer } from "@/components/layout/footer"
import { submitLead } from "@/app/actions/submit-lead"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, CheckCircle2, ArrowRight } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    
    // Customize the track field based on the selected program
    const program = formData.get('program') as string
    formData.set('track', `Callback Request - ${program}`)
    
    try {
      const result = await submitLead(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setIsSuccess(true)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <LandingNavbar />
      
      <div className="flex-grow pt-32 pb-20 relative overflow-hidden">
        {/* Subtle Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Let's Talk About Your <span className="text-emerald-500">Career Goals</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Request a callback from our team. We're here to answer your questions and help you decide if SkillCred is the right fit for your career transition.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <Card className="lg:col-span-2 bg-background/50 border-white/5 backdrop-blur-sm">
              <CardContent className="p-8">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center text-center h-full py-12 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                    <h3 className="text-2xl font-semibold">We'll call you within 24 hours!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. One of our career advisors will be in touch with you shortly.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-6 border-emerald-500/20 hover:bg-emerald-500/10"
                      onClick={() => setIsSuccess(false)}
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                        <Input id="name" name="name" required placeholder="John Doe" className="bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                        <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-background" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                        <Input id="phone" name="phone" type="tel" required placeholder="+1 (555) 000-0000" className="bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="program">Program of Interest</Label>
                        <select 
                          id="program" 
                          name="program" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="Product Engineering">Product Engineering</option>
                          <option value="Data & Platform Engineering">Data & Platform Engineering</option>
                          <option value="Embedded & Security Engineering">Embedded & Security Engineering</option>
                          <option value="Not Sure Yet">Not Sure Yet</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Callback Time</Label>
                      <select 
                        id="time" 
                        name="time" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="Morning 9-12">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon 12-4">Afternoon (12 PM - 4 PM)</option>
                        <option value="Evening 4-8">Evening (4 PM - 8 PM)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Context (Optional)</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Tell us a bit about your current background and what you're looking to achieve..." 
                        className="min-h-[120px] bg-background"
                      />
                    </div>

                    {error && (
                      <div className="text-sm text-red-500 font-medium">
                        {error}
                      </div>
                    )}

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Request a Callback"}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Info Panel */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Or reach us directly</h3>
              
              <Card className="bg-background/50 border-white/5 backdrop-blur-sm">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-emerald-500/10">
                    <Phone className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Phone</h4>
                    <p className="text-muted-foreground mt-1">+1 (800) 123-4567</p>
                    <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-white/5 backdrop-blur-sm">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-emerald-500/10">
                    <Mail className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Email</h4>
                    <p className="text-muted-foreground mt-1">hello@skillcred.com</p>
                    <p className="text-xs text-muted-foreground mt-1">We aim to reply within 2 hours</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-white/5 backdrop-blur-sm">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-emerald-500/10">
                    <MapPin className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Office</h4>
                    <p className="text-muted-foreground mt-1">123 Innovation Drive<br />San Francisco, CA 94103</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
