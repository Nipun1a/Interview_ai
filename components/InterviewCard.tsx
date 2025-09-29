import React from 'react'

const InterviewCard = ({InterviewId, userId, role, type, techstack, createdAt}: InterviewCardProps) =>{
    const feedback = null as Feedback | null;
    //const feedback = null as Feedback | null;
    const normalizedDate = /mix/gi.test(type)? 'Mixed': type;
    const formattedDate = new Date(createdAt).toLocaleDateString
} => {
  return (
    <div>
      Interview Card
    </div>
  )
}

export default InterviewCard
