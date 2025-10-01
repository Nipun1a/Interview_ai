import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';
import dayjs from 'dayjs';

function Page() {
  return (
    <>
      {/* HERO / CTA */}
      <section className="card-cta flex items-center justify-between">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Practice Interviews with AI</h2>
          <p className="text-lg">
            Get personalized feedback and improve your interview skills with our AI-powered platform.
          </p>

          <Button asChild className="btn btn-primary max-sm:w-full">
            <Link href="/interview">Get Started</Link>
          </Button>
        </div>

        <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
      </section>

      {/* YOUR INTERVIEWS */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-sections grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyInterviews.length > 0 ? (
            dummyInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interviewId={interview.id}
                userId={interview.userId}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={new Date(interview.createdAt)}
              />
            ))
          ) : (
            <p>You haven't taken any interviews yet.</p>
          )}
        </div>
      </section>

      {/* TAKE INTERVIEW */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-sections">
          <p>There are no interviews available</p>
        </div>
      </section>
    </>
  );
}

export default Page;
