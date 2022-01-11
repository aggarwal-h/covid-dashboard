import React from "react";
import Flags from "country-flag-icons/react/3x2";
import { countries } from "country-flag-icons";
import { useCountriesToday } from "../../queries/queries";
import { numberWithCommas } from "../../utils";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import Image from "next/image";

function AllDataTable() {
  const query = useCountriesToday();
  const loadingRows = () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <div className="table_row" key={i}>
          <div className="table_cell">
            <span className="ml-2">
              <Skeleton width={20} />
            </span>
          </div>
          <div className="table_cell">
            <Skeleton width={20} />
          </div>
          <div className="table_cell">
            <Skeleton width={80} />
          </div>
          <div className="table_cell">
            <Skeleton width={80} />
          </div>
          <div className="table_cell text-blue-500">
            <Skeleton width={80} />
          </div>
          <div className="table_cell">
            <Skeleton width={80} />
          </div>
          <div className="table_cell text-red-500">
            <Skeleton width={80} />
          </div>
        </div>
      );
    }
    return arr;
  };
  return (
    <div className="mt-8 m-4">
      <div className="rounded-xl shadow-[0_8px_25px_rgba(0,0,0,7%)] overflow-y-scroll max-h-[90vh]">
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
                    <div className="table_cell">
                      {Flag && (
                        <Flag title={country.country} className="ml-2 w-6" />
                      )}
                      {!Flag && (
                        <span className="ml-2">
                          <Image
                            width="24px"
                            height="24px"
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
