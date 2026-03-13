"use client";

import { Calendar, dateFnsLocalizer, View, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'
import { ScheduleEvent } from '@/app/actions/schedule'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

interface CalendarViewProps {
    events: ScheduleEvent[];
}

export function CalendarView({ events }: CalendarViewProps) {
    const [view, setView] = useState<View>(Views.MONTH);
    const [date, setDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

    const eventStyleGetter = (event: ScheduleEvent) => {
        let style = {
            backgroundColor: '#3b82f6', // blue-500 default
            borderRadius: '4px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };

        if (event.type === 'DEADLINE') {
            style.backgroundColor = '#ef4444'; // red-500
        } else if (event.type === 'CLASS') {
            style.backgroundColor = '#8b5cf6'; // violet-500
        }

        return {
            style: style
        };
    };

    return (
        <>
            <Card className="border-white/10 bg-white/5 h-[calc(100vh-250px)] min-h-[600px]">
                <CardContent className="p-4 h-full text-sm">
                    <style jsx global>{`
                    .rbc-calendar { font-family: inherit; }
                    .rbc-toolbar button { color: inherit; border-color: rgba(255,255,255,0.1); }
                    .rbc-toolbar button:hover, .rbc-toolbar button:active, .rbc-toolbar button.rbc-active { 
                        background-color: rgba(255,255,255,0.1); 
                        color: white; 
                    }
                    .rbc-month-view, .rbc-time-view, .rbc-header, .rbc-time-header-content { 
                        border-color: rgba(255,255,255,0.1); 
                    }
                    .rbc-day-bg + .rbc-day-bg { border-left-color: rgba(255,255,255,0.1); }
                    .rbc-off-range-bg { background-color: rgba(0,0,0,0.2); }
                    .rbc-today { background-color: rgba(139, 92, 246, 0.1); }
                    /* Text colors */
                    .rbc-day-slot .rbc-time-slot { border-color: rgba(255,255,255,0.05); }
                    .rbc-label { color: #94a3b8; }
                    .rbc-date-cell { padding: 4px; }
                    .rbc-event { min-height: 24px; }
                `}</style>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%' }}
                        view={view}
                        onView={setView}
                        date={date}
                        onNavigate={setDate}
                        eventPropGetter={eventStyleGetter}
                        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                        popup
                        onSelectEvent={(event) => setSelectedEvent(event)}
                        components={{
                            event: ({ event }) => (
                                <div className="flex flex-col text-xs leading-tight p-0.5">
                                    <span className="font-semibold">{event.title}</span>
                                    {event.meetLink && <span className="opacity-75 text-[10px]">Google Meet</span>}
                                </div>
                            )
                        }}
                    />
                </CardContent>
            </Card>

            <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedEvent?.title}</DialogTitle>
                        <DialogDescription>Event Details</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <h4 className="font-medium text-muted-foreground mb-1">Date</h4>
                                <p>{selectedEvent?.start && format(selectedEvent.start, 'PPP')}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-muted-foreground mb-1">Time</h4>
                                <p>
                                    {selectedEvent?.start && format(selectedEvent.start, 'p')} -
                                    {selectedEvent?.end && format(selectedEvent.end, 'p')}
                                </p>
                            </div>
                        </div>

                        {selectedEvent?.meetLink && (
                            <div className="pt-2">
                                <Button asChild className="w-full gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                                    <a href={selectedEvent.meetLink} target="_blank" rel="noopener noreferrer">
                                        <Video className="w-4 h-4" />
                                        Join Google Meet
                                    </a>
                                </Button>
                            </div>
                        )}

                        {selectedEvent?.resource?.description && (
                            <div className="pt-2 p-3 bg-muted rounded-md text-sm">
                                <p className="whitespace-pre-wrap">{selectedEvent.resource.description}</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
// Helper imports required
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
