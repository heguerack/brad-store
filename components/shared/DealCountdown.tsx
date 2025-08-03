'use client'

import { Section } from '@react-email/components'
import Link from 'next/link'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'

//Static target date (Replace with desired date)
const TARGET_DATE = new Date('2025-12-20T00:00:00')

const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date()
  //what the following does, is to return the difrence or 0, but not less than 0
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  }
}

export default function DealCountdown() {
  // so the return type is saying apply the type , whixh is the returnType of calculateTiemRemaing, cool cool
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>()

  useEffect(() => {
    //calculate intial time on client
    setTime(calculateTimeRemaining(TARGET_DATE))

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE)
      setTime(newTime)
      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        //if all of them are equal to cero, then we know we are at the end
        clearInterval(timerInterval)
      }
      return () => clearInterval(timerInterval)
    }, 1000)
  }, [])
  if (!time) {
    return (
      <Section className='grid grid-cols-1 md:grid-cols-2  my-20'>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='text-3xl font-bold'> Loading Count Down</h3>
        </div>
      </Section>
    )
  }

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <Section className='grid grid-cols-1 md:grid-cols-2  my-20'>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='text-3xl font-bold'> Deal has ended</h3>
          <p className=''>
            This deal is no longer available. Check out our latest promotions
          </p>

          <div className='text-center'>
            <Button asChild>
              <Link href={'/search'}>Vire Products</Link>
            </Button>
          </div>
          <div className='flex justify-center'>
            <Image
              src={'/images/promo.jpg'}
              alt='promotion'
              width={300}
              height={200}
            />
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section className='grid grid-cols-1 md:grid-cols-2  my-20'>
      <div className='flex flex-col gap-2 justify-center'>
        <h3 className='text-3xl font-bold'> Deal of the Month</h3>
        <p className=''>
          Get ready for a shopping experiance like never before with our Deals
          of the Month! Every purchase comes withe xplusive perks and offers,
          making this month a celebration of savy choices and amazing deal
          Don@apos;t 🛍️
        </p>
        <ul className='grid grid-cols-4'>
          <StatBox label='Days' value={time.days} />
          <StatBox label='Hours' value={time.hours} />
          <StatBox label='Minutes' value={time.minutes} />
          <StatBox label='Seconds' value={time.seconds} />
        </ul>
        <div className='text-center'>
          <Button asChild>
            <Link href={'/search'}>Vire Products</Link>
          </Button>
        </div>
        <div className='felx justify-center'>
          <Image
            src={'/images/promo.jpg'}
            alt='promotion'
            width={300}
            height={200}
          />
        </div>
      </div>
    </Section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className='p-4 w-full text-center'>
    <p className='text-3xl font-bold'>{value}</p>
    <p className=''>{label}</p>
  </li>
)
