import React from "react";
import Flags from "country-flag-icons/react/3x2";
import { countries } from "country-flag-icons";
import { useCountriesToday } from "../../queries/queries";
import { numberWithCommas } from "../../utils";
import Link from "next/link";
import Image from "next/image";
import SimpleSkeleton from "../skeletons/SimpleSkeleton";

function AllDataTable() {
  const query = useCountriesToday();
  const loadingRows = () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <div className="table_row" key={i}>
          <div className="table_cell">
            <span className="ml-2">
              <SimpleSkeleton className="w-5 h-5 dark:bg-[#1f2128]" />
            </span>
          </div>
          <div className="table_cell">
            <SimpleSkeleton className="w-5 h-5 dark:bg-[#1f2128]" />
          </div>
          <div className="table_cell">
            <SimpleSkeleton className="w-20 h-5 dark:bg-[#1f2128]" />
          </div>
          <div className="table_cell">
            <SimpleSkeleton className="w-20 h-5 dark:bg-[#1f2128]" />
          </div>
          <div className="table_cell text-blue-500">
            <SimpleSkeleton className="w-20 h-5 dark:bg-[#1f2128]" />
          </div>
          <div className="table_cell">
            <SimpleSkeleton className="w-20 h-5 dark:bg-[#1f2128]" />
          </div>
          <div className="table_cell text-red-500">
            <SimpleSkeleton className="w-20 h-5 dark:bg-[#1f2128]" />
          </div>
        </div>
      );
    }
    return arr;
  };
  return (
    <div className="mt-8 m-4">
      <div className="rounded-xl shadow-[0_8px_25px_rgba(0,0,0,7%)] overflow-scroll max-h-[90vh]">
        <div className="table_container">
          {query.data?.length !== 0 && (
            <div className="table_header table_row">
              <div className="table_cell"></div>
              <div className="table_cell"></div>
              <div className="table_cell">Country</div>
              <div className="table_cell">Total Cases</div>
              <div className="table_cell">New Cases</div>
              <div className="table_cell">Total Deaths</div>
              <div className="table_cell">New Deaths</div>
            </div>
          )}
          {query.isLoading ? (
            loadingRows()
          ) : query.data.length === 0 ? (
            <div className="table_row">
              <p className="p-6 text-lg">
                No data available yet. Try again later.
              </p>
            </div>
          ) : (
            query.data.map((country, i) => {
              let Flag = null;
              if (countries.includes(country.country_code)) {
                Flag = Flags[country.country_code];
              }
              return (
                <Link
                  key={i}
                  href={
                    country.country === "World" ? "/" : `/${country.country}`
                  }
                >
                  <a className="table_row">
                    <div className="table_cell">
                      <span className="ml-2">{i}</span>
                    </div>
                    <div className="table_cell min-w-[48px]">
                      {Flag && (
                        <Flag title={country.country} className="ml-3 w-6" />
                      )}
                      {!Flag && (
                        <span className="ml-3">
                          <Image
                            width="24px"
                            height="24px"
                            layout="fixed"
                            src="/assets/img/earth.svg"
                            alt="earth"
                          />
                        </span>
                      )}
                    </div>
                    <div className="table_cell">{country.country}</div>
                    <div className="table_cell">
                      {numberWithCommas(country.cumulative_cases)}
                    </div>
                    <div className="table_cell text-blue-500">
                      +{numberWithCommas(country.new_cases)}
                    </div>
                    <div className="table_cell">
                      {numberWithCommas(country.cumulative_deaths)}
                    </div>
                    <div className="table_cell text-red-500">
                      +{numberWithCommas(country.new_deaths)}
                    </div>
                  </a>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default AllDataTable;
