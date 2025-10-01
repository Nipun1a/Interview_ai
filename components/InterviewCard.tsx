// components/InterviewCard.tsx
import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { getRandomInterviewCover } from '../lib/utils';
import Link from 'next/link';
import DisplayTechicons from './DisplayTechicons';

type InterviewCardProps = {
  interviewId: string;
  userId: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt: Date;
};

type Feedback = {
  finalAssessment: string;
  totalScore: number;
  createdAt: Date;
} | null;

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback: Feedback = null;

  const normalizedDate = /mix/gi.test(type) ? 'Mixed' : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt).format('YYYY, MMM DD');

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview relative p-4">
        {/* Badge */}
        <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
          <p className="badge-text">{normalizedDate}</p>
        </div>

        <Image
          src={getRandomInterviewCover()}
          alt="cover"
          width={90}
          height={90}
          className="rounded-full object-cover size-[90px]"
        />

        <h3 className="mt-5 capitalize">{role} Interview</h3>

        <div className="flex flex-row gap-5 mt-3">
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
            <p>{formattedDate}</p>
          </div>

          <div className="flex flex-row gap-2">
            <Image src="/star.svg" alt="star" width={22} height={22} />
            <p>{feedback?.totalScore || '---'}/100</p>
          </div>
        </div>

        <p className="line-clamp-2 mt-5">
          {feedback !== null
            ? feedback.finalAssessment
            : 'No feedback available yet. Complete the interview to receive detailed feedback and improve your skills.'}
        </p>

        <div className="flex flex-row justify-between items-center mt-4">
          <DisplayTechicons techStack={techstack} />
          <Link href={feedback ? `/interviews/${interviewId}/feedback` : `/interviews/${interviewId}`}>
            <button className="btn btn-primary btn-sm">
              {feedback ? 'View Feedback' : 'Continue Interview'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
