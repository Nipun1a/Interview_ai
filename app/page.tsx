import link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'

function page() {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Practice Interviews with AI</h2>
          <p className='text-lg'>Get personalized feedback and improve your interview skills with our AI-powered platform.</p>
          <button asChild className='btn btn-primary max-sm: w-full '>
            <link href='/interview'>Get Started</link>

          </button>



        </div>
        <Image src="/robot.png" alt="robo-dude" width={400} height={400} className='max-sm:hidden' />
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interviews-sections'>
          {dummyInterviews.map((interview) => (
            

          ))}
          <p>You haven't taken any interviews yet.</p>
        </div>

      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='interviews-sections'>
          <p> there are no interviews available</p>
        </div>
      </section>
    </>
  )
}

export default page