'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  formURL: string;
  imageURL: string;
}

export default function EventCard({ event }: { event: Event }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-xl overflow-hidden bg-white border border-[var(--color-brand-lavender)] shadow-sm hover:shadow-[0_4px_20px_rgba(196,186,234,0.5)] hover:scale-[1.02] transition-all duration-200"
      >
        {/* Image */}
        <div className="relative h-48 w-full">
          {event.imageURL ? (
            <Image src={event.imageURL} alt={event.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--color-brand-pale-blue)]">
              <span className="text-[var(--color-brand-dark-lavender)] text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="p-4">
          <p className="text-xs text-[var(--color-brand-dull-periwinkle)] mb-1">{event.date}</p>
          <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
          <div className="space-y-1 text-sm text-gray-500">
            <p>
              <span className="font-medium text-gray-700">Time:</span> {event.time}
            </p>
            <p>
              <span className="font-medium text-gray-700">Location:</span> {event.location}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">{event.title}</DialogTitle>
            <DialogDescription className="text-[var(--color-brand-dull-periwinkle)]">{event.date}</DialogDescription>
          </DialogHeader>
          <div className="-mx-4 no-scrollbar max-h-[50vh] space-y-2 overflow-y-auto px-4 text-base text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">Time:</span> {event.time}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Location:</span> {event.location}
            </p>
          </div>
          {event.formURL && (
            <a
              href={event.formURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 text-sm text-white rounded-md bg-[var(--color-brand-indigo)] hover:bg-[var(--color-brand-dark-pastel-purple)] transition-colors"
            >
              Sign Up →
            </a>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
