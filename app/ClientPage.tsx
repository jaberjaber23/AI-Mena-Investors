"use client";
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Fuse from 'fuse.js';
import Link from 'next/link';
import InvestorTable from '../components/InvestorTable';
import SearchBar from '../components/SearchBar';
import Stats from '../components/Stats';
import Footer from '../components/Footer';
import { Angel } from '../types'; // Corrected type name
import { classNames, compare, searchOptions } from '../utils/utils';

export default function Dashboard({ data }: { data: Angel[] }) { // Changed angels[] to Angel[]
  const [allAngels, setAllAngels] = useState<Angel[]>(data);
  const [search, setSearch] = useState<string>('');
  const searchParams = useSearchParams();
  const category = searchParams?.get('category');

  // Define filtered & sorted angels array
  const ALL_ANGELS = allAngels
    .filter((angel: Angel) => !angel.hidden)
    .sort(compare)
    .filter((person: Angel) => {
      return !category ? true : person.checksize_id?.toString() === category;
    });

  // Fuzzy search with highlighting
  const fuse = new Fuse(ALL_ANGELS, searchOptions);
  const angels = useMemo(() => {
    if (search.length > 0) {
      return fuse.search(search).map((match) => match.item);
    }
    return ALL_ANGELS;
  }, [search, ALL_ANGELS]);

  // Get stats
  const companies = [...new Set(angels.map((angel: Angel) => angel.company))];
  const allChecksizes = angels
    .filter((angel: Angel) => angel.checksize_id)
    .map((angel: Angel) => angel.checksize_label);
  const averageCheck =
    allChecksizes.length > 0
      ? allChecksizes.reduce((a: number, b: string) => a + Number(b.replace(/[^0-9.-]+/g, "")), 0) / allChecksizes.length
      : 0;

  return (
    <>
      <Stats
        angelsLength={angels.length}
        averageCheck={averageCheck}
        companiesLength={companies.length}
      />
      <div className="sm:flex flex-col md:flex-row justify-between mt-4">
        <span className="isolate mt-5 inline-flex rounded-md shadow-sm w-fit">
          <Link
            href="/"
            className={classNames(
              !category ? 'bg-gray-200' : 'bg-white hover:bg-gray-50',
              'relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-gray-500 -ml-px'
            )}>
            All
          </Link>
        </span>
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle px-6 lg:px-8">
            <div className="overflow-hidden md:shadow md:ring-1 md:ring-black md:ring-opacity-5 rounded-lg">
              <InvestorTable angels={angels} search={search} />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}