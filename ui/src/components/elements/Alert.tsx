import { NextPage } from 'next'
import { ExclamationIcon } from '@heroicons/react/solid'

interface AlertProps {
    message: string
}

export const Alert : NextPage<AlertProps> = ({
    message
}) => {
  return (
    <div className="bg-yellow-100 rounded p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}