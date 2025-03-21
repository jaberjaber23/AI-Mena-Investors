import Image from 'next/image';
import Highlighter from 'react-highlight-words';
import { classNames } from '../utils/utils';
import CheckIcon from './Icons/CheckIcon';
import TwitterIcon from './Icons/TwitterIcon';
import WebsiteIcon from './Icons/WebsiteIcon';

export default function InvestorTable({ angels, search }) {
  // Sort angels by rank in ascending order
  const sortedAngels = [...angels].sort((a, b) => (a.rank || 3) - (b.rank || 3));

  return (
    <div>
      <table className="min-w-full md:divide-y bg-gray-100 md:bg-transparent divide-gray-300 rounded-lg overflow-hidden md:rounded-none">
        <thead className="bg-gray-50 hidden md:table-header-group">
          <tr>
            {/* <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Rank
            </th> */}
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Company
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Check Size
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody className="md:divide-y divide-gray-200 md:bg-white grid grid-cols-1 gap-3 sm:grid-cols-2 md:table-row-group">
          {sortedAngels.map((person: any, index: number) => (
            <tr
              key={person.email}
              className="grid grid-cols-3 gap-1 md:table-row bg-white rounded-lg md:rounded-none md:bg-transparent shadow md:shadow-none border border-gray-200 md:border-x-0 py-3 px-2 md:p-0"
            >
              {/* <td className="col-span-1 row-start-1 whitespace-nowrap px-3 md:px-2 md:py-3 text-sm text-gray-500 font-bold">
                {person.rank || index + 1}
              </td> */}
              <td className="col-span-3 whitespace-nowrap pl-3 md:py-2 md:pl-6 text-sm sm:pl-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <Image
                      className="rounded-full"
                      width={40}
                      height={40}
                      src={person.twitterPicture}
                      alt="twitter avatar"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      <Highlighter
                        searchWords={search.split(' ')}
                        autoEscape={true}
                        textToHighlight={person.name}
                      />
                      {person.twitterVerified && (
                        <CheckIcon className="inline ml-1" />
                      )}
                    </div>
                    <div className="flex space-x-2 items-center mt-1">
                      <a
                        className="text-blue-500"
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">Twitter</span>
                        <TwitterIcon />
                      </a>
                      {person.site && (
                        <a
                          className="text-blue-500"
                          href={person.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="sr-only">Website</span>
                          <WebsiteIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="col-span-1 row-start-2 whitespace-nowrap px-3 md:px-2 md:py-3 text-sm text-gray-500 font-bold md:font-normal">
                <Highlighter
                  searchWords={search.split(' ')}
                  autoEscape={true}
                  textToHighlight={person.company ?? 'Unknown'}
                />
              </td>
              <td className="col-span-3 whitespace-nowrap px-3 md:px-2 md:py-3 text-sm text-gray-500 -mt-2 md:mt-0">
                <Highlighter
                  searchWords={search.split(' ')}
                  autoEscape={true}
                  textToHighlight={person.title ?? 'Investor'}
                />
              </td>
              <td className="col-span-3 row-start-2 whitespace-nowrap px-0 md:px-2 md:py-3 text-sm text-gray-500 justify-self-end">
                <span
                  className={classNames(
                    person.checkSize === 'Small'
                      ? 'bg-green-100 text-green-800'
                      : person.checkSize === 'Medium'
                      ? 'bg-blue-100 text-blue-800'
                      : person.checkSize === 'Large'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-orange-100 text-orange-800',
                    'inline-flex rounded-full px-[9px] py-[2px] text-xs font-semibold leading-5'
                  )}
                >
                  {person.checksize_label}
                </span>
              </td>
              <td className="col-span-3 md:max-w-xs px-3 md:px-2 md:py-3 text-sm text-gray-500">
                <Highlighter
                  searchWords={search.split(' ')}
                  autoEscape={true}
                  textToHighlight={person.details}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedAngels.length === 0 && (
        <div className="text-center my-10">No results found</div>
      )}
    </div>
  );
}